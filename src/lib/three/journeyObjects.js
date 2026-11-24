import * as THREE from 'three';
import { createKing } from './kingModel';

const clamp = value => Math.max(0, Math.min(1, value));
const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
const cleanPhase = value => Math.max(0, Math.min(3, Number.isFinite(value) ? value : 0));

/** Match the travel window in journeyPose; never leave the traveller empty. */
export function journeyStageWeights(value) {
  const phase = cleanPhase(value);
  const index = Math.min(2, Math.floor(phase));
  const blend = smooth((phase - index - .2) / .55);
  return [0, 1, 2, 3].map(stage => stage === index ? 1 - blend : stage === index + 1 ? blend : 0);
}

function roundedRect(width, height, radius) {
  const path = new THREE.Shape(), x = -width / 2, y = -height / 2;
  path.moveTo(x + radius, y);
  path.lineTo(x + width - radius, y);
  path.quadraticCurveTo(x + width, y, x + width, y + radius);
  path.lineTo(x + width, y + height - radius);
  path.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  path.lineTo(x + radius, y + height);
  path.quadraticCurveTo(x, y + height, x, y + height - radius);
  path.lineTo(x, y + radius);
  path.quadraticCurveTo(x, y, x + radius, y);
  return path;
}

function polygon(points) {
  const shape = new THREE.Shape();
  points.forEach(([x, y], i) => i ? shape.lineTo(x, y) : shape.moveTo(x, y));
  shape.closePath();
  return shape;
}

function relief(shape, depth = .12) {
  return new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSize: .025, bevelThickness: .025, bevelSegments: 2, steps: 1, curveSegments: 8 });
}

function mesh(parent, name, geometry, material, position = [0, 0, 0]) {
  const object = new THREE.Mesh(geometry, material);
  object.name = name; object.position.set(...position); parent.add(object);
  return object;
}

function tube(parent, name, points, radius, material, closed = false) {
  const curve = new THREE.CatmullRomCurve3(points, closed);
  return mesh(parent, name, new THREE.TubeGeometry(curve, 48, radius, 6, closed), material);
}

function socialCluster(materials) {
  const root = new THREE.Group();
  const tileGeometry = relief(roundedRect(1, 1, .2), .16);
  const definitions = [
    ['instagram', -.42, .46, .12, -.14, materials.copper],
    ['play', .55, .06, -.06, .18, materials.coral],
    ['facebook', -.32, -.62, .05, -.09, materials.ink],
  ];
  definitions.forEach(([name, x, y, z, turn, material]) => {
    const tile = new THREE.Group(); tile.name = `${name}-tile`;
    tile.position.set(x, y, z); tile.rotation.z = turn; root.add(tile);
    mesh(tile, 'rounded-tile', tileGeometry, material);
    const face = new THREE.Group(); face.position.z = .22; tile.add(face);
    if (name === 'instagram') {
      const points = roundedRect(.57, .57, .16).getPoints(8).slice(0, -1).map(p => new THREE.Vector3(p.x, p.y, 0));
      tube(face, 'instagram-outline', points, .032, materials.cream, true);
      mesh(face, 'instagram-lens', new THREE.TorusGeometry(.14, .032, 6, 28), materials.cream);
      mesh(face, 'instagram-flash', new THREE.SphereGeometry(.043, 10, 8), materials.cream, [.18, .18, 0]);
    } else if (name === 'play') {
      mesh(face, 'play-glyph', relief(polygon([[-.15, -.24], [.25, 0], [-.15, .24]]), .035), materials.cream);
    } else {
      mesh(face, 'facebook-glyph', relief(polygon([
        [-.03, -.32], [.11, -.32], [.11, -.04], [.25, -.04], [.28, .1], [.11, .1],
        [.11, .22], [.16, .26], [.28, .26], [.28, .39], [.12, .39], [-.03, .32],
        [-.05, .2], [-.05, .1], [-.17, .1], [-.17, -.04], [-.03, -.04],
      ]), .035), materials.cream);
    }
  });
  return root;
}

function designNib(materials) {
  const root = new THREE.Group(), nib = new THREE.Group();
  nib.name = 'pen-nib'; nib.rotation.z = -.3; nib.position.set(-.08, .25, .1); root.add(nib);
  const shape = polygon([[0, 1.1], [-.57, .12], [-.32, -.75], [.32, -.75], [.57, .12]]);
  const hole = new THREE.Path(); hole.absellipse(0, .12, .105, .105, 0, Math.PI * 2, true); shape.holes.push(hole);
  mesh(nib, 'nib-body', relief(shape), materials.copper);
  mesh(nib, 'nib-slit', new THREE.BoxGeometry(.028, .87, .025), materials.ink, [0, .65, .15]);
  mesh(nib, 'nib-collar', relief(roundedRect(.73, .25, .06)), materials.ink, [0, -.84, 0]);

  const controls = [new THREE.Vector3(-1.05, -.75, 0), new THREE.Vector3(-.65, -1.35, 0), new THREE.Vector3(.75, .15, 0), new THREE.Vector3(1.05, -.6, 0)];
  const curve = new THREE.CubicBezierCurve3(...controls);
  mesh(root, 'bezier-curve', new THREE.TubeGeometry(curve, 48, .027, 6, false), materials.coral);
  const handles = new THREE.Group(); handles.name = 'bezier-handles'; root.add(handles);
  const dot = new THREE.SphereGeometry(.065, 10, 8), anchor = new THREE.BoxGeometry(.13, .13, .1);
  for (const [a, b] of [[0, 1], [3, 2]]) {
    tube(handles, 'control-arm', [controls[a], controls[b]], .012, materials.cream);
    mesh(handles, 'bezier-anchor', anchor, materials.coral, controls[a].toArray());
    mesh(handles, 'bezier-handle', dot, materials.cream, controls[b].toArray());
  }
  return root;
}

function reactAtom(materials) {
  const root = new THREE.Group();
  const ring = new THREE.TorusGeometry(1.18, .035, 8, 64);
  for (let i = 0; i < 3; i++) {
    const orbit = new THREE.Group(); orbit.name = `react-orbit-${i}`;
    orbit.rotation.set((i - 1) * .12, 0, i * Math.PI / 3); root.add(orbit);
    const ellipse = mesh(orbit, 'ellipse-ring', ring, materials.mint); ellipse.scale.y = .43;
    mesh(orbit, 'electron', new THREE.SphereGeometry(.065, 10, 8), materials.cream, [1.18, 0, 0]);
  }
  mesh(root, 'react-nucleus', new THREE.SphereGeometry(.18, 20, 12), materials.mint);
  return root;
}

/** All four stages share one traveller and a bounded local envelope, including satellites. */
export function createJourneyObjects() {
  const material = color => new THREE.MeshStandardMaterial({ color, metalness: .42, roughness: .28 });
  const materials = { copper: material('#b7552b'), coral: material('#dd684c'), cream: material('#ffe8c8'), ink: material('#302f38'), mint: material('#9de2cf') };
  const king = createKing().root; king.position.y = -1.55;
  king.traverse(object => {
    if (object.isMesh) {
      object.material.color.set('#b7552b'); object.material.transmission = 0;
      object.material.metalness = .55; object.material.roughness = .24; object.material.envMapIntensity = .85;
    }
  });
  const crown = new THREE.Group(); crown.add(king);
  const stages = [socialCluster(materials), designNib(materials), reactAtom(materials), crown];
  const root = new THREE.Group(); root.name = 'journey-evolution';
  const names = ['social', 'design', 'react', 'king'];
  stages.forEach((stage, index) => { stage.name = names[index]; root.add(stage); });
  const satellites = [[-1.28, .54, .18], [1.25, .62, -.1], [1.12, -.9, .1]];
  let disposed = false;

  function update(value, turn = 0) {
    if (disposed) return;
    const phase = cleanPhase(value), weights = journeyStageWeights(phase);
    stages.forEach((stage, index) => {
      const weight = weights[index];
      const departing = phase > index;
      // Old disciplines condense into satellites; the next silhouette unfolds at the centre.
      const satellite = index < 3 && departing ? 1 - weight : 0;
      const size = Math.pow(weight, .7) + .18 * satellite;
      stage.visible = size > .001;
      stage.scale.setScalar(size);
      const home = satellites[index] || [0, 0, 0];
      stage.position.set(home[0] * satellite, home[1] * satellite, home[2] * satellite + (1 - weight) * -.2);
      const unfold = (departing ? 1 : -1) * (1 - weight);
      // Counter the path's yaw for readable relief; retain its motion on the final sculpture.
      stage.rotation.set(unfold * .22, index === 3 ? unfold * .7 : -turn + .15 + unfold * .55, unfold * .5 + satellite * .16);
    });
    return weights;
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    const geometries = new Set(), ownedMaterials = new Set(Object.values(materials));
    root.traverse(object => {
      if (object.geometry) geometries.add(object.geometry);
      if (object.material) for (const value of [object.material].flat()) ownedMaterials.add(value);
    });
    geometries.forEach(value => value.dispose()); ownedMaterials.forEach(value => value.dispose());
    root.clear();
  }

  update(0);
  return { root, stages, update, dispose };
}
