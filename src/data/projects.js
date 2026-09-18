import { GITHUB_USER } from './site';

/**
 * Curated editorial layer on top of the live GitHub API.
 *
 * The API gives us freshness (stars, language, last push) but repo
 * descriptions rarely read well on a portfolio. Any repo whose name matches a
 * key here inherits this copy; everything else falls back to the API values.
 */
export const projectOverrides = {
  'nicolas-portfolio': {
    title: 'Portfolio editorial',
    summary:
      'Identidad, proyectos y proceso en una experiencia editorial construida con React y GSAP. Sistema de tokens propio, animación con opt-out accesible y assets optimizados.',
    tags: ['React', 'GSAP', 'Design system'],
    year: '2025',
  },
};

/** Shown before (or instead of) a successful GitHub response. */
export const fallbackProjects = [
  {
    id: 'nicolas-portfolio',
    name: 'nicolas-portfolio',
    description: projectOverrides['nicolas-portfolio'].summary,
    html_url: `https://github.com/${GITHUB_USER}/nicolas-portfolio`,
    homepage: '',
    language: 'JavaScript',
    topics: ['react', 'gsap', 'portfolio'],
    stargazers_count: 0,
  },
];

const prettify = (name) => name.replace(/[-_]/g, ' ').trim();

/** Normalises a GitHub repo (or fallback entry) into what the UI renders. */
export function toProjectCard(repo, index) {
  const override = projectOverrides[repo.name] ?? {};
  const tags = override.tags ?? [repo.language, ...(repo.topics ?? [])].filter(Boolean).slice(0, 3);

  return {
    id: repo.id ?? repo.name,
    index: String(index + 1).padStart(2, '0'),
    name: repo.name,
    title: override.title ?? prettify(repo.name),
    summary:
      override.summary ??
      repo.description ??
      'Una solución digital enfocada en una experiencia clara, una interfaz cuidada y una base técnica preparada para seguir creciendo.',
    tags,
    year: override.year ?? (repo.pushed_at ? repo.pushed_at.slice(0, 4) : ''),
    repoUrl: repo.html_url,
    liveUrl: repo.homepage || '',
    stars: repo.stargazers_count ?? 0,
    language: repo.language ?? 'Producto digital',
  };
}
