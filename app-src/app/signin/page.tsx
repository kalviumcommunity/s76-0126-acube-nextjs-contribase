"use client"

import React from 'react'
import { signIn } from 'next-auth/react'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
      <div className="w-full max-w-md p-8 bg-slate-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">Join Contribase</h1>
        <p className="text-sm text-slate-300 mb-6 text-center">Connect to start contributing and stop duplicating.</p>
        <div className="space-y-4">
          <button
            className="w-full py-3 rounded-md bg-slate-700 hover:bg-slate-600 flex items-center justify-center gap-3"
            onClick={() => signIn('github', { callbackUrl: '/project' })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.98 5.25.98 11.52c0 4.67 3.03 8.62 7.24 10.02.53.1.72-.23.72-.51 0-.25-.01-1.09-.02-1.98-2.95.64-3.57-1.34-3.57-1.34-.48-1.23-1.17-1.56-1.17-1.56-.96-.66.07-.65.07-.65 1.06.08 1.62 1.09 1.62 1.09.94 1.6 2.47 1.14 3.07.87.09-.68.37-1.14.67-1.4-2.36-.27-4.84-1.18-4.84-5.25 0-1.16.41-2.11 1.09-2.85-.11-.27-.48-1.36.1-2.84 0 0 .88-.28 2.88 1.09a9.96 9.96 0 0 1 2.62-.35c.89.01 1.79.12 2.62.35 2-.37 2.88-1.09 2.88-1.09.58 1.48.21 2.57.1 2.84.68.74 1.09 1.69 1.09 2.85 0 4.08-2.49 4.98-4.86 5.24.38.33.72.98.72 1.98 0 1.43-.01 2.59-.01 2.95 0 .28.19.62.73.51 4.21-1.41 7.24-5.36 7.24-10.03C23.02 5.25 18.27.5 12 .5z"/></svg>
            <span>Continue with GitHub</span>
          </button>

          <button
            className="w-full py-3 rounded-md bg-white text-slate-900 hover:opacity-90 flex items-center justify-center gap-3"
            onClick={() => signIn('google', { callbackUrl: '/project' })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><path fill="#fbc02d" d="M43.6 20.5H42V20H24v8h11.3C34.1 32.9 29.4 36 24 36c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.3 0 6.3 1.2 8.6 3.1l6-6C33.7 2.9 29.1 1 24 1 12.4 1 3 10.4 3 22s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.7-.4-4z"/></svg>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  )
}
