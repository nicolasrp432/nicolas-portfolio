import { useEffect, useMemo, useState } from 'react';
import { GITHUB_USER } from '../data/site';
import { curatedProjects, toProjectCard } from '../data/projects';

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

/** Only the fields the cards actually read, so the cache entry stays small. */
const slim = (repo) => ({
  name: repo.name,
  language: repo.language,
  pushed_at: repo.pushed_at,
  stargazers_count: repo.stargazers_count,
});

/**
 * The curated work index, enriched with live repo data where it exists.
 *
 * The list never depends on the network: `curatedProjects` renders in full on
 * the first paint and the fetch only adds last-push year, language and stars.
 * A failed request, a rate limit or a repo owned by someone else (the team
 * project is) simply leaves the curated values in place.
 *
 * @returns {{ projects: object[], status: 'idle'|'live'|'fallback' }}
 */
export function useGithubProjects() {
  const [repos, setRepos] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const cached = readCache();
    if (cached?.length) {
      setRepos(cached);
      setStatus('live');
      return undefined;
    }

    const controller = new AbortController();

    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(response.status))))
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) return;
        const slimmed = data.map(slim);
        writeCache(slimmed);
        setRepos(slimmed);
        setStatus('live');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('fallback');
      });

    return () => controller.abort();
  }, []);

  const projects = useMemo(() => {
    const byName = new Map((repos ?? []).map((repo) => [repo.name, repo]));
    return curatedProjects.map((project, index) =>
      toProjectCard(project, index, byName.get(project.slug)),
    );
  }, [repos]);

  return { projects, status };
}
