'use client';

import Link from 'next/link';
import { useTheme } from '../contexts/theme-context';
import ScrollReveal from './scroll-reveal';

export default function Hero() {
  const { theme } = useTheme();

  return (
    <section className="pt-48 pb-20 flex items-center justify-center bg-transparent relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 text-center relative z-10">
        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black mb-12 leading-[1.05] tracking-tighter transition-all duration-700 transform ${theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
          <span className={`inline-block animate-fadeInUp hover:scale-[1.02] transition-transform duration-500 bg-clip-text text-transparent bg-gradient-to-r ${theme === 'dark'
            ? 'from-white via-indigo-200 to-indigo-400'
            : 'from-indigo-600 via-indigo-500 to-indigo-900'
            }`}>
            Build once.
          </span>
          <br />
          <span className="inline-block animate-fadeInUp hover:scale-[1.02] transition-transform duration-500" style={{ animationDelay: '0.2s' }}>
            Reuse everywhere.
          </span>
        </h1>

        <p className={`text-xl md:text-2xl mb-14 max-w-3xl mx-auto leading-relaxed font-medium transition-all duration-700 animate-fadeInUp ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
          }`} style={{ animationDelay: '0.4s' }}>
          Contribase connects NGOs with vetted developers to build open-source solutions that multiply impact across communities.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-24 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <Link
            href="/signin"
            className="group relative px-8 py-3.5 rounded-xl font-black text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] inline-flex items-center justify-center gap-3 bg-indigo-600 text-white overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10">Get started</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 inline-block">→</span>
          </Link>
          <Link
            href="/#how-it-works"
            className={`group px-8 py-3.5 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 border-2 ${theme === 'dark'
              ? 'bg-transparent text-white border-white/10 hover:border-white/30 hover:bg-white/5'
              : 'bg-transparent text-gray-900 border-gray-200 hover:bg-gray-50'
              }`}
          >
            Learn more
          </Link>
        </div>

        {/* Refined Wide & Compact Metrics Grid */}
        <div className={`max-w-6xl mx-auto rounded-[2rem] p-1 border transition-all duration-1000 animate-fadeInUp animate-drift shadow-2xl ${theme === 'dark'
          ? 'border-indigo-500/10 shadow-indigo-500/5'
          : 'bg-white border-gray-200'
          }`} style={{ animationDelay: '0.8s' }}>
          <div className={`rounded-[1.9rem] overflow-hidden backdrop-blur-3xl p-8 lg:p-12 ${theme === 'dark' ? 'bg-black/40' : 'bg-slate-50/60 border border-slate-100'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-center">
              <ScrollReveal delay={900} className="text-center group cursor-pointer">
                <div>
                  <div className={`text-3xl lg:text-5xl font-black mb-2 transition-all duration-700 group-hover:text-indigo-400 group-hover:scale-110 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                    2,847
                  </div>
                  <div className={`text-[10px] font-black tracking-[0.2em] uppercase transition-colors group-hover:text-indigo-300/60 ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'
                    }`}>
                    Active Projects
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={1100} className="text-center group cursor-pointer">
                <div>
                  <div className={`text-3xl lg:text-5xl font-black mb-2 transition-all duration-700 group-hover:text-emerald-400 group-hover:scale-110 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                    12,439
                  </div>
                  <div className={`text-[10px] font-black tracking-[0.2em] uppercase transition-colors group-hover:text-emerald-300/60 ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'
                    }`}>
                    Contributors
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={1300} className="text-center group cursor-pointer">
                <div>
                  <div className={`text-3xl lg:text-5xl font-black mb-2 transition-all duration-700 group-hover:text-purple-400 group-hover:scale-110 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                    847
                  </div>
                  <div className={`text-[10px] font-black tracking-[0.2em] uppercase transition-colors group-hover:text-purple-300/60 ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'
                    }`}>
                    NGOs Supported
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
