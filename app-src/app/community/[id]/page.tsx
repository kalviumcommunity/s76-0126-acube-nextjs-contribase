'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTheme } from '../../../contexts/theme-context';
import Header from '../../../components/header';
import Footer from '../../../components/footer';

type Project = {
    _id: string;
    title: string;
    description: string;
    currentStage: 'ONGOING' | 'COMPLETED' | 'LOOKING_FOR_CONTRIBUTORS';
    category: string;
    stage: string;
    techStack: string[];
    githubRepoLink: string;
    liveLink: string;
    requirements: string[];
    organization: string;
    country: string;
    createdAt: string;
};

export default function ProjectDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const { theme } = useTheme();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params?.id) {
            fetchProject();
        }
    }, [params?.id]);

    async function fetchProject() {
        if (!params?.id) return;

        try {
            const res = await fetch('/api/projects');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            const foundProject = data.projects.find((p: Project) => p._id === params.id);
            setProject(foundProject || null);
        } catch (err) {
            console.error('Error fetching project:', err);
        } finally {
            setLoading(false);
        }
    }

    const getStageColor = (stage: string) => {
        switch (stage) {
            case 'ONGOING':
                return theme === 'dark' ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-300';
            case 'COMPLETED':
                return theme === 'dark' ? 'bg-green-600/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-700 border-green-300';
            case 'LOOKING_FOR_CONTRIBUTORS':
                return theme === 'dark' ? 'bg-purple-600/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-300';
            default:
                return theme === 'dark' ? 'bg-slate-600/20 text-slate-400 border-slate-500/30' : 'bg-slate-100 text-slate-700 border-slate-300';
        }
    };

    const getStageLabel = (stage: string) => {
        switch (stage) {
            case 'ONGOING': return 'Ongoing';
            case 'COMPLETED': return 'Completed';
            case 'LOOKING_FOR_CONTRIBUTORS': return 'Looking for Contributors';
            default: return stage;
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen">
                <Header />
                <div className="pt-20">
                    <div className={`mx-auto max-w-4xl px-6 py-20 text-center ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        <div className="animate-pulse">Loading project details...</div>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    if (!project) {
        return (
            <main className="min-h-screen">
                <Header />
                <div className="pt-20">
                    <div className={`mx-auto max-w-4xl px-6 py-20 text-center ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        <h1 className={`text-3xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Project Not Found
                        </h1>
                        <p className="mb-6">The project you're looking for doesn't exist.</p>
                        <button
                            onClick={() => router.push('/community')}
                            className={`px-6 py-3 rounded-xl font-bold transition-all ${theme === 'dark'
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                                }`}
                        >
                            Back to Community
                        </button>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen">
            <Header />
            <div className="pt-20">
                <div className="mx-auto max-w-4xl px-6 py-12">
                    {/* Back Button */}
                    <button
                        onClick={() => router.push('/community')}
                        className={`mb-6 flex items-center gap-2 text-sm font-bold transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Community
                    </button>

                    {/* Project Details Card */}
                    <div className={`rounded-2xl p-8 border transition-colors ${theme === 'dark'
                        ? 'bg-zinc-900/50 border-zinc-800 backdrop-blur-sm'
                        : 'bg-white border-slate-200 shadow-lg'
                        }`}>
                        {/* Header */}
                        <div className="mb-6">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <h1 className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    {project.title}
                                </h1>
                                <span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold border whitespace-nowrap ${getStageColor(project.currentStage)}`}>
                                    {getStageLabel(project.currentStage)}
                                </span>
                            </div>

                            {/* Meta Information */}
                            <div className={`flex flex-wrap gap-4 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                {project.organization && (
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        {project.organization}
                                    </div>
                                )}
                                {project.country && (
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {project.country}
                                    </div>
                                )}
                                {project.category && (
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        {project.category}
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className={`text-xl font-black mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                Description
                            </h2>
                            <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                                {project.description}
                            </p>
                        </div>

                        {/* Development Stage */}
                        {project.stage && (
                            <div className="mb-8">
                                <h2 className={`text-xl font-black mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    Development Stage
                                </h2>
                                <span className={`inline-block px-4 py-2 rounded-lg text-sm font-bold ${theme === 'dark' ? 'bg-zinc-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                                    }`}>
                                    {project.stage}
                                </span>
                            </div>
                        )}

                        {/* Tech Stack */}
                        {project.techStack && project.techStack.length > 0 && (
                            <div className="mb-8">
                                <h2 className={`text-xl font-black mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    Tech Stack
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium ${theme === 'dark'
                                                ? 'bg-zinc-800 text-slate-300 border border-zinc-700'
                                                : 'bg-slate-100 text-slate-700 border border-slate-300'
                                                }`}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Requirements */}
                        {project.requirements && project.requirements.length > 0 && (
                            <div className="mb-8">
                                <h2 className={`text-xl font-black mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    Looking For
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {project.requirements.map((req, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-lg ${theme === 'dark'
                                                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                                                : 'bg-purple-100 text-purple-700 border border-purple-300'
                                                }`}
                                        >
                                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="font-medium">{req}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Links */}
                        <div className="flex flex-wrap gap-4">
                            {project.githubRepoLink && (
                                <a
                                    href={project.githubRepoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${theme === 'dark'
                                        ? 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                                        : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300'
                                        }`}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    View on GitHub
                                </a>
                            )}
                            {project.liveLink && (
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${theme === 'dark'
                                        ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                                        : 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
                                        }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    View Live Project
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
