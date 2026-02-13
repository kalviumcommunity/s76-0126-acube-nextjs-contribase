'use client'

import React, { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTheme } from '../../contexts/theme-context'

export default function SignInPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { theme } = useTheme()

  // Redirect to projects if already authenticated
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/public/project')
    }
  }, [status, session, router])

  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/public/project' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-black text-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black mb-2">Welcome to Contribase</h1>
            <p className="text-sm text-slate-400">Connect to start contributing and stop duplicating.</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full py-3 px-4 rounded-lg bg-white text-slate-900 hover:opacity-90 active:opacity-75 flex items-center justify-center gap-3 font-bold transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                <path fill="#fbc02d" d="M43.6 20.5H42V20H24v8h11.3C34.1 32.9 29.4 36 24 36c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.3 0 6.3 1.2 8.6 3.1l6-6C33.7 2.9 29.1 1 24 1 12.4 1 3 10.4 3 22s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.7-.4-4z" />
              </svg>
              <span>Sign in with Google</span>
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <p className="text-xs text-slate-500 text-center">
              By signing in, you agree to our terms and privacy policy. We use Google OAuth for secure authentication.
            </p>
          </div>
        </div>

        {/* Loading state while redirecting */}
        {status === 'loading' && (
          <div className="mt-4 text-center text-slate-400">
            <p className="text-sm">Checking authentication status...</p>
          </div>
        )}

        {status === 'authenticated' && (
          <div className="mt-4 text-center text-slate-400">
            <p className="text-sm">Redirecting to projects...</p>
          </div>
        )}
      </div>
    </div>
  )
}


