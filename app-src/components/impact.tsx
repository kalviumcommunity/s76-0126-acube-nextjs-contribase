'use client';

import { useTheme } from '../contexts/theme-context';
import { signIn } from 'next-auth/react';

export default function Impact() {
  const { theme } = useTheme();

  const impactStats = [
    {
      value: "2.8M+",
      label: "Lives Impacted",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "text-blue-500"
    },
    {
      value: "150+",
      label: "Countries Reached",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "text-green-500"
    },
    {
      value: "500+",
      label: "Active Projects",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: "text-purple-500"
    },
    {
      value: "10K+",
      label: "Volunteers",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: "text-orange-500"
    }
  ];

  return (
    <section id="impact" className="py-24 bg-transparent transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-black mb-4 tracking-tighter transition-colors animate-fadeInUp ${theme === 'dark' ? 'text-slate-50' : 'text-slate-900'
            }`}>
            Our Global Impact
          </h2>
          <p className={`text-lg max-w-2xl mx-auto font-medium transition-colors animate-fadeInUp ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`} style={{ animationDelay: '0.2s' }}>
            Together, we're creating lasting change across communities worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {impactStats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-2xl border transition-all duration-500 hover:scale-[1.03] animate-fadeInUp ${theme === 'dark' ? 'border-zinc-800/80 bg-black' : 'bg-white border-gray-200 shadow-lg'
                }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`${stat.color} mb-5 flex justify-center animate-pulse`}>
                {stat.icon}
              </div>
              <div className={`text-2xl md:text-3xl font-black mb-1 transition-colors tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                {stat.value}
              </div>
              <div className={`text-[10px] font-black tracking-widest uppercase transition-colors ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Login Section */}
        <div className={`text-center p-10 rounded-3xl border transition-all duration-500 animate-fadeInUp ${theme === 'dark' ? 'border-zinc-800/80 bg-black shadow-2xl' : 'bg-white border-gray-300 shadow-lg'
          }`} style={{ animationDelay: '0.8s' }}>
          <h3 className={`text-3xl font-bold mb-4 transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
            Ready to Make an Impact?
          </h3>
          <p className={`text-lg mb-8 max-w-2xl mx-auto transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
            Join thousands of contributors and organizations making a difference worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => signIn('google', { callbackUrl: '/project' })}
              className="flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gray-200 text-gray-900 border border-gray-400 hover:bg-gray-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
