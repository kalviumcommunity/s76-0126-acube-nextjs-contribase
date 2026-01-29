'use client';

import React from 'react';

export default function ContributorsSection() {
  const contributors = [
    { name: 'Alex Chen', contributions: 234, avatar: '👨‍💻' },
    { name: 'Sarah Johnson', contributions: 189, avatar: '👩‍💻' },
    { name: 'Mike Wilson', contributions: 156, avatar: '👨‍💻' },
    { name: 'Emma Davis', contributions: 142, avatar: '👩‍💻' },
  ];

  return (
    <section id="contributors" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Top Contributors</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contributors.map((contributor, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{contributor.avatar}</div>
              <h3 className="text-lg font-semibold text-white">{contributor.name}</h3>
              <p className="text-gray-400">{contributor.contributions} contributions</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
