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

  const isAuthenticated = status === 'authenticated' && !!session;


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

        {/* Navigation - Only show for authenticated users */}
        {isAuthenticated && (
          <nav className="hidden lg:flex items-center gap-10">
            {[
              { name: 'Projects', href: '/public/project' },
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
        )}


        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
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

          {/* Auth-based Actions */}
          {status === 'authenticated' && session?.user ? (
            // Authenticated User View
            <div className="flex items-center gap-6">
              {/* Only show avatar/dropdown on projects page */}
              {pathname === '/public/project' && (
                <div className="relative inline-block header-root">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen((v) => !v);
                    }}
                    className="w-9 h-9 rounded-xl overflow-hidden ring-2 ring-white/10 focus:outline-none transition-transform hover:scale-110 active:scale-95"
                    title={session.user.name || 'User'}
                  >
                    <img src={session.user.image ?? '/favicon.ico'} alt="avatar" className="w-full h-full object-cover" />
                  </button>

                  {/* Dropdown Menu */}
                  {open && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 ${theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'}`}>
                      <div className={`px-4 py-3 border-b ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          {session.user.name}
                        </p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                          {session.user.email}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          signOut({ callbackUrl: '/' });
                          setOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${theme === 'dark'
                          ? 'text-slate-300 hover:bg-slate-700/50'
                          : 'text-slate-700 hover:bg-slate-100'
                          }`}
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : status !== 'loading' ? (
            // Unauthenticated User View - Only show on landing/signin pages
            (pathname === '/' || pathname === '/signin') && (
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
            )
          ) : null}
        </div>
      </div>
    </header>
  );
}

