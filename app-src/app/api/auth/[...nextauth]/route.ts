import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"

// Debug: Log environment variables (remove in production)
console.log('Environment variables check:')
console.log('GITHUB_ID:', process.env.GITHUB_ID ? '✓ Present' : '✗ Missing')
console.log('GITHUB_SECRET:', process.env.GITHUB_SECRET ? '✓ Present' : '✗ Missing')
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✓ Present' : '✗ Missing')
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? '✓ Present' : '✗ Missing')
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '✓ Present' : '✗ Missing')

const providers = []

// Only add GitHub provider if credentials are available
if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  )
}

// Only add Google provider if credentials are available
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  )
}

export const authOptions: NextAuthOptions = {
  providers,
  secret: process.env.NEXTAUTH_SECRET || 'development-secret-key-change-in-production',
  pages: {
    signIn: '/signin',
  },
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
