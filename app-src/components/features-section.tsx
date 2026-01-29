'use client';

import React from 'react';

export default function FeaturesSection() {
  const features = [
    { title: 'Smart Matching', description: 'AI-powered project recommendations based on your skills' },
    { title: 'Real-time Collaboration', description: 'Connect with contributors instantly' },
    { title: 'Progress Tracking', description: 'Monitor your contributions and impact' },
  ];

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Platform Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
