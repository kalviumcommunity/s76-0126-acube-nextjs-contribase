export async function fetchGitHubRepos(query: string, page = 1, per_page = 30) {
  const q = (query || '').trim();
  if (!q) return { items: [], total_count: 0 };

  const token = process.env.GITHUB_TOKEN;
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&per_page=${per_page}&page=${page}`;

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(url, { headers });

    // Rate limit handling
    if (res.status === 403) {
      const reset = res.headers.get('x-ratelimit-reset');
      const remaining = res.headers.get('x-ratelimit-remaining');
      const text = await res.text();
      console.warn('GitHub rate limit or access error', res.status, remaining, text);
      return { error: 'rate_limited', reset, items: [], total_count: 0 };
    }

    if (!res.ok) {
      const text = await res.text();
      console.warn('GitHub search failed', res.status, text);
      return { items: [], total_count: 0 };
    }

    const data = await res.json();
    if (!data.items) return { items: [], total_count: data.total_count ?? 0 };

    const items = data.items.map((it: any) => ({
      id: it.id,
      name: it.name,
      full_name: it.full_name,
      description: it.description,
      html_url: it.html_url,
      homepage: it.homepage,
      stargazers_count: it.stargazers_count,
      language: it.language,
      owner: it.owner?.login,
    }));

    return { items, total_count: data.total_count ?? items.length };
  } catch (err) {
    console.error('Error fetching GitHub repos', err);
    return { items: [], total_count: 0 };
  }
}
