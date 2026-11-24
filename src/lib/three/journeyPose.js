const stops = [
  { x: .75, y: .63, size: .85, turn: -.45 },
  { x: .23, y: .59, size: .95, turn: 1.1 },
  { x: .86, y: .72, size: .85, turn: 2.5 },
  { x: .28, y: .82, size: .8, turn: 3.8 },
];

/** One continuous path, reversible with native scroll; coordinates avoid the copy. */
export function journeyPose(progress, mobile = false) {
  const phase = Math.max(0, Math.min(3, Number.isFinite(progress) ? progress : 0));
  const index = Math.min(2, Math.floor(phase));
  const t = phase - index;
  // Finish travelling before the next chapter's headline reaches the stage.
  const travel = Math.max(0, Math.min(1, (t - .2) / .55));
  const ease = travel * travel * (3 - 2 * travel);
  const a = stops[index], b = stops[index + 1];
  const mix = key => a[key] + (b[key] - a[key]) * ease;
  return {
    x: mobile ? .77 - .2 * Math.sin(phase * Math.PI / 3) : mix('x'),
    y: mobile ? .8 : Math.min(.84, mix('y') + Math.sin(travel * Math.PI) * .18),
    size: mobile ? .4 : mix('size'),
    turn: mix('turn'),
    wire: Math.max(0, 1 - Math.max(0, Math.abs(phase - 2) - .25) * 3),
  };
}
