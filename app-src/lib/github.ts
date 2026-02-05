export async function fetchGitHubRepos(query: string) {
  if (!query || !query.trim()) return [];

  const token = process.env.GITHUB_TOKEN;
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=12`;

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      const text = await res.text();
      console.warn('GitHub search failed', res.status, text);
      return [];
    }
    const data = await res.json();
    if (!data.items) return [];

    return data.items.map((it: any) => ({
      id: it.id,
      name: it.name,
      full_name: it.full_name,
      description: it.description,
      html_url: it.html_url,
      stargazers_count: it.stargazers_count,
      language: it.language,
      owner: it.owner?.login,
    }));
  } catch (err) {
    console.error('Error fetching GitHub repos', err);
    return [];
  }
}
