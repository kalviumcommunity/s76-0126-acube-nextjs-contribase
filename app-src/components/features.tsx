"use client";

import { useTheme } from '../contexts/theme-context';
import ScrollReveal from './scroll-reveal';

export default function Features() {
  const { theme } = useTheme();

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Collaboration Tools",
      description: "Work together seamlessly with real-time collaboration features and team management.",
      color: "text-indigo-500"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Project Templates",
      description: "Start quickly with pre-built project templates for common NGO use cases.",
      color: "text-emerald-500"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Impact Tracking",
      description: "Measure and showcase your organization's impact with comprehensive analytics.",
      color: "text-purple-500"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Secure Platform",
      description: "Enterprise-grade security ensures your data and projects are always protected.",
      color: "text-sky-500"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Quick Setup",
      description: "Get started in minutes with our intuitive onboarding process.",
      color: "text-amber-500"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "24/7 Support",
      description: "Round-the-clock support from our dedicated team of experts.",
      color: "text-rose-500"
    }
  ];

  return (
    <section id="features" className="py-32 bg-transparent relative">
      <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className={`text-4xl md:text-5xl font-black mb-6 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
              Why Contribase?
            </h2>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
              Everything you need to build, deploy, and scale digital solutions that multiply your impact.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div
                className={`h-full rounded-[2rem] p-8 border transition-all duration-500 hover:scale-[1.02] group ${theme === 'dark' ? 'border-zinc-800/80 bg-black' : 'bg-white border-gray-200 shadow-lg'
                  }`}
              >
                <div className={`mb-8 inline-block p-3.5 rounded-xl transition-all duration-500 group-hover:scale-110 ${theme === 'dark' ? 'bg-slate-900/40' : 'bg-slate-100/80'} ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className={`text-2xl font-black mb-4 transition-colors ${theme === 'dark' ? 'text-white group-hover:text-indigo-400' : 'text-slate-900'
                  }`}>
                  {feature.title}
                </h3>
                <p className={`text-lg leading-relaxed transition-colors ${theme === 'dark' ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-600'
                  }`}>
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
