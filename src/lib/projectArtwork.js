/** Shared artwork for the list, carousel and its static fallback. */
export const PROJECT_PALETTES = [
  { paper: '#e7ff57', shape: '#ff5a36', ink: '#171614' },
  { paper: '#ff5a36', shape: '#f1eee7', ink: '#f1eee7' },
  { paper: '#d7c9ff', shape: '#171614', ink: '#171614' },
  { paper: '#f1eee7', shape: '#e7ff57', ink: '#171614' },
];

export function projectTone(project) {
  return Math.max(0, (Number(project.index) || 1) - 1) % PROJECT_PALETTES.length;
}

export function projectArtwork(project) {
  const tone = projectTone(project);
  const palette = PROJECT_PALETTES[tone];
  const shapes = [
    '<circle cx="740" cy="65" r="220"/>',
    '<rect x="555" y="-150" width="340" height="340" rx="8" transform="rotate(18 720 20)"/>',
    '<path d="M520 35Q520-150 740-150H960V65Q960 255 740 255T520 35Z"/>',
    '<rect x="560" y="-145" width="340" height="340" rx="12" transform="rotate(45 730 25)"/>',
  ];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="${palette.paper}"/><g fill="${palette.shape}" stroke="#171614" stroke-width="1">${shapes[tone]}</g></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
