import { describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { createJourneyObjects, journeyStageWeights } from '../lib/three/journeyObjects';
import { journeyPose } from '../lib/three/journeyPose';

describe('atlas shape evolution', () => {
  it('settles on each discipline, overlaps adjacent stages and clamps invalid input', () => {
    for (let stage = 0; stage < 4; stage++) {
      expect(journeyStageWeights(stage)).toEqual([0, 1, 2, 3].map(i => Number(i === stage)));
    }
    for (let stage = 0; stage < 3; stage++) {
      const weights = journeyStageWeights(stage + .475);
      expect(weights[stage]).toBeCloseTo(.5);
      expect(weights[stage + 1]).toBeCloseTo(.5);
    }
    expect(journeyStageWeights(-10)).toEqual(journeyStageWeights(0));
    expect(journeyStageWeights(NaN)).toEqual(journeyStageWeights(0));
    expect(journeyStageWeights(Infinity)).toEqual(journeyStageWeights(0));
    expect(journeyStageWeights(10)).toEqual(journeyStageWeights(3));
    for (let phase = 0; phase <= 3; phase += .01) {
      const weights = journeyStageWeights(phase);
      expect(weights.reduce((sum, weight) => sum + weight, 0)).toBeCloseTo(1);
      expect(weights.every(weight => weight >= 0 && weight <= 1)).toBe(true);
      expect(weights.filter(weight => weight > 0).length).toBeLessThanOrEqual(2);
    }
  });

  it('has continuous, reversible transforms including the handoff to satellites', () => {
    const objects = createJourneyObjects();
    const snapshot = phase => {
      objects.update(phase, journeyPose(phase).turn);
      return objects.stages.flatMap(stage => [...stage.position.toArray(), ...stage.scale.toArray(), ...stage.rotation.toArray().slice(0, 3)]);
    };
    const forward = Array.from({ length: 301 }, (_, i) => snapshot(i / 100));
    for (let i = 300; i >= 0; i--) expect(snapshot(i / 100)).toEqual(forward[i]);
    for (const boundary of [.2, .75, 1, 1.2, 1.75, 2, 2.2, 2.75]) {
      const before = snapshot(boundary - .00001), after = snapshot(boundary + .00001);
      expect(Math.max(...before.map((value, i) => Math.abs(value - after[i])))).toBeLessThan(.001);
    }
    objects.update(0); expect(objects.stages.map(stage => stage.visible)).toEqual([true, false, false, false]);
    objects.update(2); expect(objects.stages[3].visible).toBe(false);
    objects.update(3);
    expect(objects.stages.map(stage => stage.visible)).toEqual([true, true, true, true]);
    expect(objects.stages.map(stage => stage.scale.x)).toEqual([.18, .18, .18, 1]);
    objects.dispose();
  });

  it('builds recognizable finite volumetric geometry within a small mesh budget', () => {
    const objects = createJourneyObjects();
    for (const name of ['instagram-outline', 'instagram-lens', 'play-glyph', 'facebook-glyph', 'nib-body', 'bezier-curve', 'bezier-handles', 'react-nucleus', 'Corona']) {
      expect(objects.root.getObjectByName(name), name).toBeDefined();
    }
    const rings = [];
    let triangles = 0;
    objects.root.traverse(object => {
      if (!object.isMesh) return;
      if (object.name === 'ellipse-ring') rings.push(object);
      const geometry = object.geometry;
      expect([...geometry.attributes.position.array].every(Number.isFinite)).toBe(true);
      geometry.computeBoundingBox();
      expect(geometry.boundingBox.max.z - geometry.boundingBox.min.z).toBeGreaterThan(0);
      triangles += (geometry.index?.count ?? geometry.attributes.position.count) / 3;
    });
    expect(rings).toHaveLength(3);
    expect(new Set(rings.map(ring => ring.parent.rotation.z)).size).toBe(3);
    expect(triangles).toBeLessThan(30000);
    // Include satellites and all intermediate transformations, not only the four stops.
    for (let phase = 0; phase <= 3; phase += .025) {
      objects.update(phase, journeyPose(phase).turn); objects.root.updateMatrixWorld(true);
      const box = new THREE.Box3();
      objects.root.traverseVisible(object => {
        if (object.isMesh) box.union(object.geometry.boundingBox.clone().applyMatrix4(object.matrixWorld));
      });
      expect(Math.max(...box.min.toArray().map(Math.abs), ...box.max.toArray().map(Math.abs))).toBeLessThan(1.9);
    }
    objects.dispose();
  });

  it('releases shared geometry, hidden king wires and materials exactly once', () => {
    const objects = createJourneyObjects(), resources = new Set();
    objects.root.traverse(object => {
      if (object.geometry) resources.add(object.geometry);
      if (object.material) [object.material].flat().forEach(material => resources.add(material));
    });
    const spies = [...resources].map(resource => vi.spyOn(resource, 'dispose'));
    objects.dispose(); objects.dispose(); objects.update(2);
    spies.forEach(spy => expect(spy).toHaveBeenCalledOnce());
    expect(objects.root.children).toHaveLength(0);
  });
});
