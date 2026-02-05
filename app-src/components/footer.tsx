'use client';

import React from 'react';
import { useTheme } from '../contexts/theme-context';
import ScrollReveal from './scroll-reveal';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`border-t py-20 transition-all duration-1000 bg-transparent relative ${theme === 'dark' ? 'border-zinc-800/50' : 'border-slate-200'
      }`}>
      <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className={`text-2xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                Contribase
              </h3>
              <p className={`text-lg font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                Connecting NGOs with vetted developers to build open-source solutions that multiply impact across humanitarian borders.
              </p>
            </div>

            <div>
              <h4 className={`text-sm font-black tracking-[0.2em] uppercase mb-8 ${theme === 'dark' ? 'text-indigo-400/60' : 'text-slate-900'
                }`}>
                Platform
              </h4>
              <ul className={`space-y-4 font-bold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                }`}>
                <li><a href="/#features" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'
                  }`}>Features</a></li>
                <li><a href="/#how-it-works" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'
                  }`}>How it Works</a></li>
                <li><a href="/#impact" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'
                  }`}>Global Impact</a></li>
              </ul>
            </div>

            <div>
              <h4 className={`text-sm font-black tracking-[0.2em] uppercase mb-8 ${theme === 'dark' ? 'text-indigo-400/60' : 'text-slate-900'
                }`}>
                Resources
              </h4>
              <ul className={`space-y-4 font-bold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                }`}>
                <li><a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'
                  }`}>Documentation</a></li>
                <li><a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'
                  }`}>Open Source Guide</a></li>
                <li><a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'
                  }`}>NGO Toolkit</a></li>
              </ul>
            </div>

            <div>
              <h4 className={`text-sm font-black tracking-[0.2em] uppercase mb-8 ${theme === 'dark' ? 'text-indigo-400/60' : 'text-slate-900'
                }`}>
                Legal
              </h4>
              <ul className={`space-y-4 font-bold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                }`}>
                <li><a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'
                  }`}>Privacy Policy</a></li>
                <li><a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'
                  }`}>Terms of Service</a></li>
                <li><a href="#" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'
                  }`}>Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </footer>
  );
}
