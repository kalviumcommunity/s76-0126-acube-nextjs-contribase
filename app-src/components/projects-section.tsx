'use client';

import React from 'react';

export default function ProjectsSection() {
  const projects = [
    { name: 'React Components', stars: 1234, language: 'TypeScript', color: 'from-blue-500 to-cyan-500' },
    { name: 'Data Visualizer', stars: 892, language: 'Python', color: 'from-purple-500 to-pink-500' },
    { name: 'Mobile Framework', stars: 567, language: 'JavaScript', color: 'from-green-500 to-teal-500' },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1)_0%,transparent_70%)] animate-pulse" />
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-white text-center mb-12 animate-fadeInUp">
          Featured <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 group animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-lg bg-linear-to-r ${project.color} flex items-center justify-center mb-4 group-hover:animate-pulse`}>
                <span className="text-white font-bold text-lg">{project.name[0]}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {project.name}
              </h3>
              <div className="flex justify-between items-center text-gray-400">
                <span className="text-sm">{project.language}</span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 animate-pulse">⭐</span>
                  <span className="font-semibold">{project.stars}</span>
                </div>
              </div>
              <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-linear-to-r ${project.color} animate-shimmer`}
                  style={{ width: `${(project.stars / 1234) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
