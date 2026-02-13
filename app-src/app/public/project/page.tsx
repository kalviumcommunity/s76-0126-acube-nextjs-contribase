'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { Metadata, Viewport } from "next";
import ProjectsClient from "./ProjectsClient";
import Header from "../../../components/header";
import Footer from "../../../components/footer";

export default function ProjectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Protect this route - redirect unauthenticated users to landing page
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-slate-100">Loading...</div>
      </main>
    );
  }

  // Hide content if not authenticated (will redirect anyway)
  if (status !== 'authenticated') {
    return null;
  }

  return (
    <main className="min-h-screen">
      <Header />
      {/* offset for fixed header */}
      <div className="pt-20">
        <ProjectsClient />
      </div>
      <Footer />
    </main>
  );
}
