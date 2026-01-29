import Header from '../components/header';
import Hero from '../components/hero';
import ProblemSolution from '../components/problem-solution';
import Features from '../components/features';
import Impact from '../components/impact';
import Footer from '../components/footer';

export default function Home() {
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
