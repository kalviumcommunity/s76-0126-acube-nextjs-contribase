'use client';

import { useLandingPageAuth } from '../lib/use-auth-redirect';
import LandingPageContent from '../components/landing-page-content';

export default function Home() {
  const { showContent, isLoading } = useLandingPageAuth();

  // Show nothing while redirecting authenticated users
  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-slate-100">Loading...</div>
      </main>
    );
  }

  if (!showContent) {
    // Authenticated user is being redirected
    return null;
  }

  return <LandingPageContent />;
}
