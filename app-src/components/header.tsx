'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../contexts/theme-context';
import { useSession, signOut } from 'next-auth/react';
import Handshake from './handshake';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

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
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
      ? `${theme === 'dark' ? 'bg-black/80 backdrop-blur-2xl border-b border-zinc-800/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-lg'}`
      : 'bg-transparent'
      }`}>
      <div className="max-w-screen-2xl mx-auto w-full px-8 py-5 flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${theme === 'dark' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-slate-900 text-white shadow-lg'
              }`}>
              <Handshake className="w-5 h-5" />
            </div>
            <span className={`text-xl font-black tracking-tighter transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Contribase
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {[
            { name: 'Features', href: '/#features' },
            { name: 'How it works', href: '/#how-it-works' },
            { name: 'Impact', href: '/#impact' },
            { name: 'Community', href: '/community' }
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-bold tracking-tight transition-all duration-300 hover:-translate-y-0.5 ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Create Project Button */}
          <Link
            href="/community/create"
            className={`hidden md:flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all duration-300 rounded-xl ${theme === 'dark'
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/20'
                : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg hover:shadow-xl'
              }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Project
          </Link>

          <button
            onClick={toggleTheme}
            className={`relative w-12 h-6 rounded-full transition-all duration-500 focus:outline-none overflow-hidden ${theme === 'dark'
              ? 'bg-zinc-800'
              : 'bg-slate-200'
              }`}
            aria-label="Toggle theme"
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-all duration-500 ease-in-out transform ${theme === 'dark' ? 'translate-x-6 bg-white shadow-[0_0_12px_rgba(255,255,255,1)]' : 'translate-x-0 bg-slate-600'
                }`}
            />
          </button>

          {status === 'authenticated' && session?.user ? (
            <div className="flex items-center gap-6">
              <Link href="/public/project" className={`text-sm font-bold tracking-tight transition-colors ${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'}`}>
                Explore
              </Link>

              {pathname === '/public/project' && (
                <div className="relative inline-block header-root">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen((v) => !v);
                    }}
                    className="w-9 h-9 rounded-xl overflow-hidden ring-2 ring-white/10 focus:outline-none transition-transform hover:scale-110 active:scale-95"
                  >
                    <img src={session.user.image ?? '/favicon.ico'} alt="avatar" className="w-full h-full object-cover" />
                  </button>

                  {/* Dropdown would go here if needed */}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/signin"
                className={`px-5 py-2.5 text-sm font-bold transition-all duration-300 rounded-xl ${theme === 'dark'
                  ? 'text-slate-300 hover:text-white hover:bg-white/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
              >
                Sign in
              </Link>
              <Link
                href="/signin"
                className={`px-6 py-2.5 text-sm font-black transition-all duration-500 hover:scale-105 active:scale-95 rounded-xl shadow-xl ${theme === 'dark'
                  ? 'bg-white text-black hover:shadow-white/10'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
