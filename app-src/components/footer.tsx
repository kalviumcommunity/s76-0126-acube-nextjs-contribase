'use client';

import React from 'react';
import { useTheme } from '../contexts/theme-context';

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`border-t py-16 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black border-gray-800' : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className={`text-xl font-bold mb-4 transition-colors ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Contribase
            </h3>
            <p className={`transition-colors ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Connecting NGOs with vetted contributors to build digital solutions that multiply impact.
            </p>
          </div>
          
          <div>
            <h4 className={`font-semibold mb-4 transition-colors ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Product
            </h4>
            <ul className={`space-y-2 transition-colors ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <li><a href="#features" className={`hover:transition-colors ${
                theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'
              }`}>Features</a></li>
              <li><a href="#how-it-works" className={`hover:transition-colors ${
                theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'
              }`}>How it Works</a></li>
              <li><a href="#impact" className={`hover:transition-colors ${
                theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'
              }`}>Impact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className={`font-semibold mb-4 transition-colors ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Community
            </h4>
            <ul className={`space-y-2 transition-colors ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <li><a href="#" className={`hover:transition-colors ${
                theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'
              }`}>Blog</a></li>
              <li><a href="#" className={`hover:transition-colors ${
                theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'
              }`}>Forum</a></li>
              <li><a href="#" className={`hover:transition-colors ${
                theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'
              }`}>Events</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className={`font-semibold mb-4 transition-colors ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Connect
            </h4>
            <ul className={`space-y-2 transition-colors ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <li><a href="#" className={`hover:transition-colors ${
                theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'
              }`}>Twitter</a></li>
              <li><a href="#" className={`hover:transition-colors ${
                theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'
              }`}>GitHub</a></li>
              <li><a href="#" className={`hover:transition-colors ${
                theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'
              }`}>Discord</a></li>
            </ul>
          </div>
        </div>
        
        <div className={`border-t pt-8 text-center transition-colors ${
          theme === 'dark' ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
        }`}>
          <p>&copy; 2024 Contribase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
