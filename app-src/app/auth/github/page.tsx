"use client"

import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function GithubAuthPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/blank')
    }
  }, [status, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
      <div className="p-6 bg-slate-800 rounded-md shadow">
        <h2 className="text-lg font-medium">Authenticating with GitHub...</h2>
        <p className="text-sm text-slate-300 mt-2">Status: {status}</p>
        {status === 'unauthenticated' && <p className="mt-3 text-sm">If you were redirected here unexpectedly, try signing in again.</p>}
      </div>
    </div>
  )
}
