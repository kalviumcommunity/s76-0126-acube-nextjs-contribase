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
            className="w-full py-3 rounded-md bg-white text-slate-900 hover:opacity-90 flex items-center justify-center gap-3"
            // After successful Google sign-in, send the user to the actual projects route
            // which lives at `app/public/project/page.tsx` → `/public/project`
            onClick={() => signIn('google', { callbackUrl: '/public/project' })}
          >

            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><path fill="#fbc02d" d="M43.6 20.5H42V20H24v8h11.3C34.1 32.9 29.4 36 24 36c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.3 0 6.3 1.2 8.6 3.1l6-6C33.7 2.9 29.1 1 24 1 12.4 1 3 10.4 3 22s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.7-.4-4z" /></svg>

            <span>Continue with Google</span>

          </button>

        </div>

      </div>

    </div>

  )

}

