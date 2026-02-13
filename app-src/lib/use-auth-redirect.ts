'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAuthRedirect, isProtectedRoute, isPublicAuthRoute } from './auth-utils';

/**
 * Hook to handle authentication-based redirects
 * Returns loading state while auth is being resolved
 */
export function useAuthRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname() || '/';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for session to be resolved
    if (status === 'loading') {
      return;
    }

    setIsLoading(false);

    const isAuthenticated = status === 'authenticated' && !!session;
    const redirectPath = getAuthRedirect(pathname, isAuthenticated);

    if (redirectPath) {
      router.push(redirectPath);
    }
  }, [status, session, pathname, router]);

  return {
    isAuthenticated: status === 'authenticated' && !!session,
    isLoading,
    status,
    session,
  };
}

/**
 * Hook to check if user can access a protected route
 */
export function useProtectedRoute() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname() || '/';
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    const isAuthenticated = status === 'authenticated' && !!session;

    if (isProtectedRoute(pathname) && !isAuthenticated) {
      router.push('/');
      return;
    }

    setIsAuthorized(true);
    setIsLoading(false);
  }, [status, session, pathname, router]);

  return {
    isAuthorized,
    isLoading,
    isAuthenticated: status === 'authenticated' && !!session,
  };
}

/**
 * Hook to check if user should see the landing page
 * Authenticated users are redirected away
 */
export function useLandingPageAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    const isAuthenticated = status === 'authenticated' && !!session;

    if (isAuthenticated) {
      router.push('/public/project');
      return;
    }

    setShowContent(true);
  }, [status, session, router]);

  return {
    showContent,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated' && !!session,
  };
}
