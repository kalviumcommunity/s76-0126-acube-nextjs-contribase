'use client';

import { useTheme } from '../contexts/theme-context';

export default function ProblemSolution() {
  const { theme } = useTheme();

  return (
    <section id="how-it-works" className={`py-20 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* The Problem Card */}
          <div className={`rounded-xl p-8 border transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeInLeft ${
            theme === 'dark' ? 'bg-black border-gray-800' : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-red-500 bg-opacity-20 text-red-500 mr-4 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                The Problem
              </h3>
            </div>
            
            <p className={`mb-6 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              NGOs and non-profits struggle to find technical talent and build digital solutions that can be reused across organizations.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                <span className={`transition-colors group-hover:text-red-500 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Limited technical resources and expertise
                </span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <span className={`transition-colors group-hover:text-red-500 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Duplicate efforts across organizations
                </span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <span className={`transition-colors group-hover:text-red-500 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  High costs for custom development
                </span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                <span className={`transition-colors group-hover:text-red-500 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Difficulty maintaining and updating solutions
                </span>
              </li>
            </ul>
          </div>

          {/* The Solution Card */}
          <div className={`rounded-xl p-8 border transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeInRight ${
            theme === 'dark' ? 'bg-black border-gray-800' : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-full bg-green-500 bg-opacity-20 text-green-500 mr-4 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                The Solution
              </h3>
            </div>
            
            <p className={`mb-6 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Contribase connects NGOs with vetted open-source contributors to build reusable digital solutions that multiply impact.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                <span className={`transition-colors group-hover:text-green-500 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Access to skilled technical volunteers
                </span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <span className={`transition-colors group-hover:text-green-500 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Reusable components and templates
                </span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <span className={`transition-colors group-hover:text-green-500 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Cost-effective development solutions
                </span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                <span className={`transition-colors group-hover:text-green-500 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Continuous maintenance and support
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
