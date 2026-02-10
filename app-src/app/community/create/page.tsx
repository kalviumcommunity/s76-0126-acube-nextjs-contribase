import type { Metadata } from 'next'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import CommunityClient from '../CommunityClient'

export const metadata: Metadata = {
    title: 'Create Project - Contribase Community',
    description: 'Add your project to the Contribase community',
}

export default function CreateProjectPage() {
    return (
        <main className="min-h-screen">
            <Header />
            <div className="pt-20">
                <div className="mx-auto max-w-6xl px-6 py-12">
                    <CommunityClient />
                </div>
            </div>
            <Footer />
        </main>
    )
}
