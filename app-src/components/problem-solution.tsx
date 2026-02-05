"use client";

import { useTheme } from '../contexts/theme-context';
import ScrollReveal from './scroll-reveal';

export default function ProblemSolution() {
  const { theme } = useTheme();

  return (
    <section id="how-it-works" className="py-32 bg-transparent relative">
      <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* The Problem Card */}
          <ScrollReveal delay={100}>
            <div className={`h-full rounded-[2rem] p-8 lg:p-10 border transition-all duration-700 hover:scale-[1.01] ${theme === 'dark' ? 'border-zinc-800 bg-black text-white' : 'bg-white border-gray-200 shadow-lg'
              }`}>
              <div className="flex items-center mb-8">
                <div className="p-3.5 rounded-xl bg-red-500/10 text-red-500 mr-5 animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className={`text-2xl lg:text-3xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  The Problem
                </h3>
              </div>

              <p className={`mb-10 text-xl leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
                NGOs and non-profits struggle to find technical talent and build digital solutions that can be reused across organizations.
              </p>

              <ul className="space-y-6">
                {[
                  "Limited technical resources and expertise",
                  "Duplicate efforts across organizations",
                  "High costs for custom development",
                  "Difficulty maintaining and updating solutions"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                    <span className={`text-lg font-medium transition-colors group-hover:text-red-400 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* The Solution Card */}
          <ScrollReveal delay={300}>
            <div className={`h-full rounded-[2rem] p-8 lg:p-10 border transition-all duration-700 hover:scale-[1.01] ${theme === 'dark' ? 'border-zinc-800 bg-black text-white' : 'bg-white border-gray-200 shadow-lg'
              }`}>
              <div className="flex items-center mb-8">
                <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-500 mr-5 animate-pulse" style={{ animationDelay: '0.4s' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className={`text-2xl lg:text-3xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  The Solution
                </h3>
              </div>

              <p className={`mb-10 text-xl leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
                Contribase connects NGOs with vetted open-source contributors to build reusable digital solutions that multiply impact.
              </p>

              <ul className="space-y-6">
                {[
                  "Access to skilled technical volunteers",
                  "Reusable components and templates",
                  "Cost-effective development solutions",
                  "Continuous maintenance and support"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                    <span className={`text-lg font-medium transition-colors group-hover:text-emerald-400 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
