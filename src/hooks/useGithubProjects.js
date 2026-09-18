import { useEffect, useState } from 'react';
import { GITHUB_USER } from '../data/site';
import { fallbackProjects, toProjectCard } from '../data/projects';

const CACHE_KEY = `gh:${GITHUB_USER}:repos`;
const CACHE_TTL = 1000 * 60 * 30; // 30 min

/** Unauthenticated GitHub allows 60 requests/hour per IP — cache aggressively. */
function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, repos } = JSON.parse(raw);
    return Date.now() - at < CACHE_TTL ? repos : null;
  } catch {
    return null;
  }
}

function writeCache(repos) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos }));
  } catch {
    /* Private mode or a full quota — the network path still works. */
  }
}

const selectShowcase = (repos) =>
  repos
    .filter((repo) => !repo.fork && !repo.archived && repo.name !== GITHUB_USER)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || (a.pushed_at < b.pushed_at ? 1 : -1))
    .slice(0, 6);

/**
 * Live project list, degraded gracefully: a curated fallback renders
 * immediately, then real repos replace it if the API answers.
 *
 * @returns {{ projects: object[], status: 'idle'|'live'|'fallback' }}
 */
export function useGithubProjects() {
  const [repos, setRepos] = useState(fallbackProjects);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const cached = readCache();
    if (cached?.length) {
      setRepos(cached);
      setStatus('live');
      return undefined;
    }

    const controller = new AbortController();

    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=30`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(response.status))))
      .then((data) => {
        const showcase = selectShowcase(data);
        if (!showcase.length) return;
        writeCache(showcase);
        setRepos(showcase);
        setStatus('live');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('fallback');
      });

    return () => controller.abort();
  }, []);

  return { projects: repos.map(toProjectCard), status };
}
