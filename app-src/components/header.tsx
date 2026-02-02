'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../contexts/theme-context';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
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

              <a href={session.user.github?.url ?? '#'} target="_blank" rel="noreferrer" title="View on GitHub" className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-white/10">
                <img src={session.user.image ?? '/favicon.ico'} alt="avatar" className="w-full h-full object-cover" />
              </a>

              <button onClick={() => signOut({ callbackUrl: '/signin' })} className="text-sm text-rose-500 hover:underline">
                Logout
              </button>
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
