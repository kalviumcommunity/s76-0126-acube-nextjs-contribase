import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectPage() {
  const session = await getServerSession(authOptions as any);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-950 text-white px-8 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Projects</h1>

        {session ? (
          <>
            <div className="mb-6 p-4 bg-white/5 rounded-md flex items-center gap-4">
              <img src={(session as any).user?.image ?? '/favicon.ico'} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="font-medium">{(session as any).user?.name}</div>
                <div className="text-xs text-white/60">{(session as any).user?.email}</div>
                {(session as any).user?.github?.url && (
                  <a href={(session as any).user.github.url} target="_blank" rel="noreferrer" className="text-xs text-white/50 hover:underline">View GitHub profile</a>
                )}
              </div>
            </div>

            <ProjectsClient />
          </>
        ) : (
          <div className="p-6 bg-white/3 rounded-md text-sm text-white/70">
            You are not signed in — please <a href="/signin" className="underline">sign in</a> to view projects.
          </div>
        )}
      </div>
    </main>
  );
}
