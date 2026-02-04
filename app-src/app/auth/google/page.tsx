"use client"

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function GoogleAuthPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      // Once the session is established, redirect to the actual projects page
      // which is currently mounted at `/public/project`
      router.push('/public/project')
    }
  }, [status, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
      <div className="p-6 bg-slate-800 rounded-md shadow">
        <h2 className="text-lg font-medium">Authenticating with Google...</h2>
        <p className="text-sm text-slate-300 mt-2">Status: {status}</p>
        {status === 'unauthenticated' && <p className="mt-3 text-sm">If you were redirected here unexpectedly, try signing in again.</p>}
      </div>
    </div>
  )
}
