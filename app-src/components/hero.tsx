'use client';

import Link from 'next/link';
import { useTheme } from '../contexts/theme-context';

export default function Hero() {
  const { theme } = useTheme();

  return (
    <section className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black' : 'bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight transition-all duration-700 transform ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          <span className="inline-block animate-fadeInUp hover:scale-105 transition-transform">Build once. Reuse everywhere.</span>
          <br />
          <span className={`inline-block animate-fadeInUp hover:scale-105 transition-transform ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} style={{ animationDelay: '0.2s' }}>
            Maximize impact.
          </span>
        </h1>

        <p className={`text-xl mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-700 animate-fadeInUp hover:scale-102 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`} style={{ animationDelay: '0.4s' }}>
          Contribase connects NGOs with vetted, open-source contributors to build digital solutions that multiply impact across communities.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <Link 
            href="/signin"
            className={`group px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-110 hover:shadow-2xl inline-flex items-center justify-center gap-2 animate-bounce ${
              theme === 'dark'
                ? 'bg-white text-black hover:bg-gray-100 shadow-lg' 
                : 'bg-white text-black hover:bg-gray-100 shadow-lg'
            }`}
          >
            Get started
            <span className="transition-transform duration-300 group-hover:translate-x-2 inline-block">→</span>
          </Link>
          <Link 
            href="#how-it-works"
            className={`group px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-110 hover:shadow-2xl ${
              theme === 'dark'
                ? 'bg-transparent text-white border border-gray-600 hover:border-gray-400 hover:bg-gray-800' 
                : 'bg-transparent text-gray-900 border border-gray-400 hover:border-gray-600 hover:bg-gray-100'
            }`}
          >
            Learn more
          </Link>
        </div>

        {/* Dashboard Preview */}
        <div className={`rounded-xl p-6 border transition-all duration-700 animate-fadeInUp hover:scale-105 hover:shadow-2xl ${
          theme === 'dark'
            ? 'bg-black border-gray-800' 
            : 'bg-white border-gray-200 shadow-lg'
        }`} style={{ animationDelay: '0.8s' }}>
          <div className={`text-sm font-medium mb-4 transition-colors ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            contribase.app/dashboard
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center transform transition-all duration-300 hover:scale-110 hover:rotate-1 group cursor-pointer">
              <div className={`text-3xl font-bold mb-2 transition-colors group-hover:text-blue-500 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                2,847
              </div>
              <div className={`text-sm transition-colors group-hover:text-blue-400 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Active Projects
              </div>
            </div>
            
            <div className="text-center transform transition-all duration-300 hover:scale-110 hover:rotate-1 group cursor-pointer">
              <div className={`text-3xl font-bold mb-2 transition-colors group-hover:text-green-500 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                12,439
              </div>
              <div className={`text-sm transition-colors group-hover:text-green-400 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Contributors
              </div>
            </div>
            
            <div className="text-center transform transition-all duration-300 hover:scale-110 hover:rotate-1 group cursor-pointer">
              <div className={`text-3xl font-bold mb-2 transition-colors group-hover:text-purple-500 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                847
              </div>
              <div className={`text-sm transition-colors group-hover:text-purple-400 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                NGOs Supported
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
