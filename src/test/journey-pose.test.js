import { describe, it, expect } from 'vitest';
import { journeyPose } from '../lib/three/journeyPose';

describe('travelling king choreography', () => {
  it('keeps the whole piece within a safe viewport in both orientations', () => {
    for (const mobile of [false, true]) for (let p = 0; p <= 3; p += .01) {
      const pose = journeyPose(p, mobile);
      expect(pose.x).toBeGreaterThan(.1); expect(pose.x).toBeLessThan(.9);
      expect(pose.y).toBeGreaterThan(.3); expect(pose.y).toBeLessThan(.95);
      expect(pose.wire).toBeGreaterThanOrEqual(0); expect(pose.wire).toBeLessThanOrEqual(1);
    }
  });
  it('is continuous in both scroll directions and settles as a wireframe in 42', () => {
    for (const step of [1, 2]) {
      const before = journeyPose(step - .0001), after = journeyPose(step + .0001);
      expect(Math.abs(before.x - after.x)).toBeLessThan(.001);
      expect(Math.abs(before.y - after.y)).toBeLessThan(.001);
      expect(Math.abs(before.turn - after.turn)).toBeLessThan(.001);
    }
    expect(journeyPose(1.8).wire).toBe(1);
    expect(journeyPose(2).wire).toBe(1);
    expect(journeyPose(3).wire).toBe(0);
    expect(journeyPose(-1)).toEqual(journeyPose(0));
    expect(journeyPose(Infinity)).toEqual(journeyPose(0));
    expect(journeyPose(10)).toEqual(journeyPose(3));
  });
});
