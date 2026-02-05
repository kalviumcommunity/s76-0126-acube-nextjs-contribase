import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectPage() {
  const session = await getServerSession(authOptions as any);

  // Temporary debug view: show session data and render ProjectsClient when available.
  // This avoids an automatic redirect so we can diagnose blank page issues.
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-950 text-white px-8 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Projects (Debug)</h1>
        <div className="mb-6 p-4 bg-white/5 rounded-md">
          <h2 className="text-sm font-medium mb-2">Session (server)</h2>
          <pre className="text-xs text-white/60 whitespace-pre-wrap">
            {JSON.stringify(session ?? { authenticated: false }, null, 2)}
          </pre>
        </div>

        {session ? (
          <ProjectsClient />
        ) : (
          <div className="p-6 bg-white/3 rounded-md text-sm text-white/70">
            You are not signed in — please <a href="/signin" className="underline">sign in</a> to view projects.
          </div>
        )}
      </div>
    </main>
  );
}
