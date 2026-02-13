/**
 * Authentication utilities for managing auth state and route protection
 */

export const AUTH_ROUTES = {
  LANDING: '/',
  SIGNIN: '/signin',
  PROJECTS: '/public/project',
  GOOGLE_AUTH: '/auth/google',
} as const;

/**
 * Check if a route requires authentication
 */
export function isProtectedRoute(pathname: string): boolean {
  const protectedRoutes = [
    '/public/project',
    '/community/create',
    '/shell/dashboard',
  ];
  return protectedRoutes.some(route => pathname.startsWith(route));
}

/**
 * Check if a route is public (should not be shown to authenticated users)
 */
export function isPublicAuthRoute(pathname: string): boolean {
  return pathname === '/' || pathname === '/signin';
}

/**
 * Get redirect path based on auth status
 */
export function getAuthRedirect(pathname: string, isAuthenticated: boolean): string | null {
  // If authenticated and on landing/signin page, redirect to projects
  if (isAuthenticated && isPublicAuthRoute(pathname)) {
    return AUTH_ROUTES.PROJECTS;
  }

  // If not authenticated and on protected route, redirect to landing
  if (!isAuthenticated && isProtectedRoute(pathname)) {
    return AUTH_ROUTES.LANDING;
  }

  return null;
}
