'use client';

import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">About Contribase</h2>
          <p className="text-xl text-gray-300 mb-8">
            Contribase is the premier platform for discovering open source projects and connecting with fellow contributors. 
            We make it easy to find projects that match your skills and interests, helping you make meaningful contributions 
            to the open source community.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">10K+</div>
              <div className="text-gray-400">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">50K+</div>
              <div className="text-gray-400">Contributors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">1M+</div>
              <div className="text-gray-400">Contributions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
