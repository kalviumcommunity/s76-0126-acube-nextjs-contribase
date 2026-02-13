'use client';

import Hero from './hero';
import ProblemSolution from './problem-solution';
import Features from './features';
import Impact from './impact';
import Footer from './footer';
import Header from './header';

export default function LandingPageContent() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ProblemSolution />
      <Features />
      <Impact />
      <Footer />
    </main>
  );
}

