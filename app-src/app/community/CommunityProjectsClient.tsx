"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../contexts/theme-context';
import Handshake from '../../components/handshake';

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

type FilterTab = 'ALL' | 'ONGOING' | 'COMPLETED' | 'LOOKING_FOR_CONTRIBUTORS';

export default function CommunityProjectsClient() {
    const router = useRouter();
    const { theme } = useTheme();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<FilterTab>('ALL');
    const [showCreateForm, setShowCreateForm] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    async function fetchProjects() {
        try {
            const res = await fetch('/api/projects');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setProjects(data.projects || []);
        } catch (err) {
            console.error('Error fetching projects:', err);
        } finally {
            setLoading(false);
        }
    }

    const filteredProjects = projects.filter(p => {
        if (activeFilter === 'ALL') return true;
        return p.currentStage === activeFilter;
    });

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

    if (showCreateForm) {
        router.push('/community/create');
        return null;
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className={`text-5xl font-black mb-3 flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        <Handshake className={`w-12 h-12 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                        Community Projects
                    </h1>
                    <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        Discover and contribute to amazing projects from the Contribase community
                    </p>
                </div>
                <button
                    onClick={() => router.push('/community/create')}
                    className={`px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${theme === 'dark'
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-500/20'
                        : 'bg-indigo-500 hover:bg-indigo-600 text-white hover:shadow-xl'
                        }`}
                >
                    + Create Project
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
                {[
                    { key: 'ALL', label: 'All Projects' },
                    { key: 'ONGOING', label: 'Ongoing' },
                    { key: 'COMPLETED', label: 'Completed' },
                    { key: 'LOOKING_FOR_CONTRIBUTORS', label: 'Looking for Contributors' },
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveFilter(tab.key as FilterTab)}
                        className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${activeFilter === tab.key
                            ? theme === 'dark'
                                ? 'bg-indigo-600 text-white shadow-lg'
                                : 'bg-indigo-500 text-white shadow-lg'
                            : theme === 'dark'
                                ? 'bg-zinc-800 text-slate-300 hover:bg-zinc-700 border border-zinc-700'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            {loading ? (
                <div className={`text-center py-20 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    <div className="animate-pulse">Loading projects...</div>
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className={`text-center py-20 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    <Handshake className={`w-16 h-16 mx-auto mb-4 opacity-50 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`} />
                    <p className="text-xl font-bold mb-2">No projects found</p>
                    <p>Be the first to add a project to this category!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map(project => (
                        <div
                            key={project._id}
                            onClick={() => router.push(`/community/${project._id}`)}
                            className={`rounded-2xl p-6 border transition-all hover:scale-[1.02] cursor-pointer ${theme === 'dark'
                                ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 backdrop-blur-sm'
                                : 'bg-white border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl'
                                }`}
                        >
                            {/* Stage Badge */}
                            <div className="mb-4">
                                <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold border ${getStageColor(project.currentStage)}`}>
                                    {getStageLabel(project.currentStage)}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className={`text-xl font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                {project.title}
                            </h3>

                            {/* Description */}
                            <p className={`text-sm mb-4 line-clamp-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            {project.techStack && project.techStack.length > 0 && (
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {project.techStack.slice(0, 3).map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className={`px-2 py-1 rounded text-xs font-medium ${theme === 'dark'
                                                ? 'bg-zinc-800 text-slate-300'
                                                : 'bg-slate-100 text-slate-700'
                                                }`}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.techStack.length > 3 && (
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                                            +{project.techStack.length - 3} more
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Organization */}
                            {project.organization && (
                                <p className={`text-xs mb-4 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                                    by {project.organization}
                                </p>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                {project.currentStage === 'LOOKING_FOR_CONTRIBUTORS' ? (
                                    <button
                                        onClick={() => project.githubRepoLink && window.open(project.githubRepoLink, '_blank')}
                                        className={`flex-1 px-4 py-2 rounded-lg font-bold transition-all ${theme === 'dark'
                                            ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                            : 'bg-purple-500 hover:bg-purple-600 text-white'
                                            }`}
                                    >
                                        Contribute
                                    </button>
                                ) : project.currentStage === 'COMPLETED' && project.liveLink ? (
                                    <button
                                        onClick={() => window.open(project.liveLink, '_blank')}
                                        className={`flex-1 px-4 py-2 rounded-lg font-bold transition-all ${theme === 'dark'
                                            ? 'bg-green-600 hover:bg-green-700 text-white'
                                            : 'bg-green-500 hover:bg-green-600 text-white'
                                            }`}
                                    >
                                        View Live
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => router.push(`/community/${project._id}`)}
                                        className={`flex-1 px-4 py-2 rounded-lg font-bold transition-all ${theme === 'dark'
                                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                            : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                                            }`}
                                    >
                                        View Details
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
