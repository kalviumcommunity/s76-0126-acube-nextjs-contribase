"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";


export default function ProjectsClient() {
  const { data: session } = useSession();

  const [query, setQuery] = useState('');
  const [repos, setRepos] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 100;
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [similarProject, setSimilarProject] = useState<any | null>(null);

  // Fetch initial popular repos on mount
  useEffect(() => {
    (async () => {
      setLoading(true);
      setSearchError(null);
      try {
        const res = await fetch(`/api/search?page=1&per_page=${perPage}`);
        if (res.status === 429) {
          const data = await res.json();
          setSearchError('GitHub API rate limited. Try again later.');
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error('Failed to load repositories');
        const data = await res.json();
        setRepos(data.githubProjects ?? []);
        setTotalCount(data.total_count ?? null);
      } catch (err: any) {
        console.error(err);
        setSearchError(err?.message ?? 'Failed to load repositories');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // search debounce for GitHub and Contribase suggestion
  useEffect(() => {
    const id = setTimeout(() => {
      (async () => {
        if (!query) {
          // restore initial list
          setPage(1);
          setSimilarProject(null);
          try {
            const res = await fetch(`/api/search?page=1&per_page=${perPage}`);
            if (!res.ok) return;
            const data = await res.json();
            setRepos(data.githubProjects ?? []);
            setTotalCount(data.total_count ?? null);
          } catch (err) {
            console.error(err);
          }
          return;
        }

        setLoading(true);
        setSearchError(null);
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&page=1&per_page=${perPage}`);
          if (res.status === 429) {
            setSearchError('GitHub API rate limited. Try again later.');
            setLoading(false);
            return;
          }
          if (!res.ok) throw new Error('Search failed');
          const data = await res.json();
          setRepos(data.githubProjects ?? []);
          setTotalCount(data.total_count ?? null);
          setSimilarProject(data.similarProject ?? null);
          setPage(1);
        } catch (err: any) {
          console.error(err);
          setSearchError(err?.message ?? 'Search error');
        } finally {
          setLoading(false);
        }
      })();
    }, 400);

    return () => clearTimeout(id);
  }, [query]);

  async function loadMore() {
    const next = page + 1;
    setLoadingMore(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&page=${next}&per_page=${perPage}`);
      if (res.status === 429) {
        setSearchError('GitHub API rate limited. Try again later.');
        setLoadingMore(false);
        return;
      }
      if (!res.ok) throw new Error('Failed to load more');
      const data = await res.json();
      const more = data.githubProjects ?? [];
      setRepos((s) => [...s, ...more]);
      setPage(next);
    } catch (err: any) {
      console.error(err);
      setSearchError(err?.message ?? 'Load more error');
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-6 md:px-10">
        {/* Page Heading */}
        <section className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50">Projects</h1>
          <p className="mt-1 text-sm text-slate-400">Browse GitHub public repositories.</p>
        </section>

        {/* Search, CTA */}
        <section className="mb-6">
          <div className="relative max-w-xl">
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search GitHub repositories..." className="w-full rounded-xl border border-zinc-800 bg-[#070713] py-3 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
            {(loading || loadingMore) && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">Loading...</span>}
          </div>
        </section>

        {searchError && (
          <section className="mb-4 rounded-xl border border-red-900/30 bg-red-900/10 p-3">
            <p className="text-xs text-red-400">{searchError}</p>
          </section>
        )}

        {similarProject && (
          <section className="mb-4 rounded-xl border border-zinc-800 bg-[#071117] p-4">
            <p className="text-sm text-slate-200">Similar project already exists in Contribase:</p>
            <div className="mt-2">
              <Link href={similarProject.slug ? `/public/project/${similarProject.slug}` : '#'} className="text-sm font-medium text-indigo-300">{similarProject.title || similarProject.name}</Link>
              <p className="text-xs text-slate-400 mt-1">{(similarProject.description || '').slice(0, 200)}</p>
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo: any) => (
            <div key={repo.id} className="rounded-2xl border border-zinc-900 bg-[#081026] p-5 hover:border-zinc-700 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-50">{repo.full_name}</h3>
                  <p className="mt-1 text-xs text-slate-400">{repo.description || 'No description'}</p>
                  <div className="mt-3 flex gap-2">
                    <span className="text-[10px] text-slate-400">⭐ {repo.stargazers_count ?? 0}</span>
                    {repo.language && <span className="text-[10px] text-slate-400">{repo.language}</span>}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <a href={repo.html_url} target="_blank" rel="noreferrer" className="inline-flex text-xs font-medium text-indigo-400 hover:text-indigo-300">📦 Repository →</a>
                {repo.homepage && <a href={repo.homepage} target="_blank" rel="noreferrer" className="inline-flex text-xs font-medium text-emerald-400 hover:text-emerald-300">🔗 Live Link →</a>}
              </div>
            </div>
          ))}
        </section>

        <div className="mt-6 flex justify-center">
          {totalCount && repos.length < totalCount && (
            <button onClick={loadMore} disabled={loadingMore} className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-slate-200">{loadingMore ? 'Loading...' : 'Load more'}</button>
          )}
        </div>
      </main>
    </div>
  );
}
