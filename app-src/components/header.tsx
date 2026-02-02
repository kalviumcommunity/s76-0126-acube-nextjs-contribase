'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../contexts/theme-context';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();

  const [open, setOpen] = useState(false);
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // close dropdown on outside click
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node;
      const root = document.querySelector('.header-root');
      if (open && root && !root.contains(target)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header-root fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? theme === 'dark' ? 'bg-black/80 backdrop-blur-md border-b border-gray-800' : 'bg-white/80 backdrop-blur-md border-b border-gray-200'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
            theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
          }`}>
            C
          </div>
          <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Contribase
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#features" className={`transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            Features
          </Link>
          <Link href="#how-it-works" className={`transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            How it works
          </Link>
          <Link href="#impact" className={`transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            Impact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
              theme === 'dark' ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>

          {status === 'authenticated' && session?.user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className={`hidden md:inline text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Dashboard
              </Link>
              <Link href="/project" className={`hidden md:inline text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Explore
              </Link>

              <span className={`hidden md:inline text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {session.user.name}
              </span>

              <div className="relative inline-block">
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    setOpen((v) => !v);
                    // fetch repos when opening
                    if (!open && session.user.github?.login && repos.length === 0) {
                      setLoading(true);
                      try {
                        const res = await fetch(`https://api.github.com/users/${session.user.github.login}/repos?per_page=6&sort=updated`);
                        if (res.ok) {
                          const data = await res.json();
                          setRepos(data || []);
                        } else {
                          setError('Failed to fetch repos');
                        }
                      } catch (err) {
                        setError('Error fetching repos');
                      } finally {
                        setLoading(false);
                      }
                    }
                  }}
                  aria-expanded={open}
                  title="Open GitHub menu"
                  className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/10 focus:outline-none"
                >
                  <img src={session.user.image ?? '/favicon.ico'} alt="avatar" className="w-full h-full object-cover" />
                </button>

                {/* Dropdown */}
                {open && (
                  <div className={`absolute right-0 mt-2 w-64 bg-white/5 backdrop-blur rounded shadow-lg z-50 p-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium">{session.user.name}</div>
                        <a href={session.user.github?.url ?? '#'} target="_blank" rel="noreferrer" className="text-xs text-gray-400 hover:underline">View GitHub profile</a>
                      </div>
                      <button onClick={() => { signOut({ callbackUrl: '/signin' }) }} className="text-sm text-rose-500 hover:underline">Logout</button>
                    </div>

                    <div className="text-xs text-gray-400 mb-2">Top repositories</div>

                    {loading ? (
                      <div className="text-sm text-gray-400">Loading…</div>
                    ) : error ? (
                      <div className="text-sm text-rose-400">{error}</div>
                    ) : repos.length === 0 ? (
                      <div className="text-sm text-gray-400">No public repositories found.</div>
                    ) : (
                      <ul className="space-y-2">
                        {repos.slice(0,5).map((r: any) => (
                          <li key={r.id}>
                            <a href={r.html_url} target="_blank" rel="noreferrer" className="block p-2 rounded hover:bg-white/3">
                              <div className="font-medium text-sm">{r.name}</div>
                              <div className="text-xs text-gray-400">{r.description ?? ''}</div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link 
                href="/signin"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Sign in
              </Link>
              <Link 
                href="/signin"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
