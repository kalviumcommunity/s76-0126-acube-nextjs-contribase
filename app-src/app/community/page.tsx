import type { Metadata } from 'next'
import Header from '../../components/header'
import Footer from '../../components/footer'
import CommunityProjectsClient from './CommunityProjectsClient'

export const metadata: Metadata = {
  title: 'Contribase Community - Projects',
  description: 'Discover and contribute to community projects on Contribase',
}

export default function CommunityPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <CommunityProjectsClient />
        </div>
      </div>
      <Footer />
    </main>
  )
}
