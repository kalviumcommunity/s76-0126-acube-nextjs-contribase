"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../contexts/theme-context';

const REQUIREMENT_OPTIONS = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'UI/UX Designer',
  'Mobile App Developer',
  'DevOps Engineer',
  'Data Scientist',
  'ML Engineer',
  'AI Engineer',
  'Blockchain Developer',
  'Cybersecurity Engineer',
  'QA / Tester',
  'Product Manager',
  'Technical Writer',
  'Community Manager',
  'Open Source Maintainer',
];

const STAGE_OPTIONS = ['Idea', 'Prototype', 'MVP', 'Deployment'];

export default function CommunityClient() {
  const router = useRouter();
  const { theme } = useTheme();
  const [form, setForm] = useState({
    title: '',
    description: '',
    currentStage: 'ONGOING' as 'ONGOING' | 'COMPLETED' | 'LOOKING_FOR_CONTRIBUTORS',
    category: '',
    stage: '',
    techStack: '',
    githubRepoLink: '',
    liveLink: '',
    organization: '',
    country: '',
  });

  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleRequirement = (req: string) => {
    setSelectedRequirements(prev =>
      prev.includes(req) ? prev.filter(r => r !== req) : [...prev, req]
    );
  };

  const validateForm = () => {
    if (!form.title.trim()) {
      setError('Project title is required');
      return false;
    }
    if (!form.description.trim()) {
      setError('Project description is required');
      return false;
    }
    if (form.currentStage === 'COMPLETED' && !form.liveLink.trim()) {
      setError('Live link is required for completed projects');
      return false;
    }
    if (form.currentStage === 'LOOKING_FOR_CONTRIBUTORS' && selectedRequirements.length === 0) {
      setError('Please select at least one requirement');
      return false;
    }
    setError(null);
    return true;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    setSaving(true);
    setError(null);

    try {
      const payload = {
        ...form,
        techStack: form.techStack.split(',').map((s) => s.trim()).filter(Boolean),
        requirements: selectedRequirements,
      };

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }

      // Show success and redirect
      alert('Project created successfully!');
      router.push('/community');
      router.refresh();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setSaving(false);
    }
  }

  const showStageField = form.currentStage === 'ONGOING' || form.currentStage === 'LOOKING_FOR_CONTRIBUTORS';
  const showLiveLink = form.currentStage === 'COMPLETED';
  const showRequirements = form.currentStage === 'LOOKING_FOR_CONTRIBUTORS';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className={`text-4xl font-black mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          Create Project
        </h1>
        <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          Add your project to the Contribase community
        </p>
      </div>

      <form onSubmit={handleSubmit} className={`rounded-2xl p-8 border transition-colors ${theme === 'dark'
        ? 'bg-zinc-900/50 border-zinc-800 backdrop-blur-sm'
        : 'bg-white border-slate-200 shadow-lg'
        }`}>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
            {error}
          </div>
        )}

        {/* Basic Information */}
        <div className="space-y-6">
          <div>
            <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
              Project Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Enter project title"
              className={`w-full p-3 rounded-lg border transition-colors ${theme === 'dark'
                ? 'bg-zinc-800 border-zinc-700 text-white placeholder-slate-500 focus:border-indigo-500'
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
              Description *
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Describe your project..."
              className={`w-full p-3 rounded-lg border transition-colors ${theme === 'dark'
                ? 'bg-zinc-800 border-zinc-700 text-white placeholder-slate-500 focus:border-indigo-500'
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                Current Stage *
              </label>
              <select
                value={form.currentStage}
                onChange={(e) => setForm(f => ({ ...f, currentStage: e.target.value as any }))}
                className={`w-full p-3 rounded-lg border transition-colors ${theme === 'dark'
                  ? 'bg-zinc-800 border-zinc-700 text-white focus:border-indigo-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
              >
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
                <option value="LOOKING_FOR_CONTRIBUTORS">Looking for Contributors</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                Category
              </label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
                placeholder="e.g., Web Development, AI/ML"
                className={`w-full p-3 rounded-lg border transition-colors ${theme === 'dark'
                  ? 'bg-zinc-800 border-zinc-700 text-white placeholder-slate-500 focus:border-indigo-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
              />
            </div>
          </div>

          {/* Conditional: Stage dropdown for ONGOING and LOOKING_FOR_CONTRIBUTORS */}
          {showStageField && (
            <div>
              <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                Development Stage
              </label>
              <select
                value={form.stage}
                onChange={(e) => setForm(f => ({ ...f, stage: e.target.value }))}
                className={`w-full p-3 rounded-lg border transition-colors ${theme === 'dark'
                  ? 'bg-zinc-800 border-zinc-700 text-white focus:border-indigo-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
              >
                <option value="">Select stage...</option>
                {STAGE_OPTIONS.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
              Tech Stack
            </label>
            <input
              type="text"
              value={form.techStack}
              onChange={(e) => setForm(f => ({ ...f, techStack: e.target.value }))}
              placeholder="React, Node.js, MongoDB (comma separated)"
              className={`w-full p-3 rounded-lg border transition-colors ${theme === 'dark'
                ? 'bg-zinc-800 border-zinc-700 text-white placeholder-slate-500 focus:border-indigo-500'
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
            />
          </div>

          <div>
            <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
              GitHub Repository Link
            </label>
            <input
              type="url"
              value={form.githubRepoLink}
              onChange={(e) => setForm(f => ({ ...f, githubRepoLink: e.target.value }))}
              placeholder="https://github.com/username/repo"
              className={`w-full p-3 rounded-lg border transition-colors ${theme === 'dark'
                ? 'bg-zinc-800 border-zinc-700 text-white placeholder-slate-500 focus:border-indigo-500'
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
            />
          </div>

          {/* Conditional: Live Link for COMPLETED */}
          {showLiveLink && (
            <div>
              <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                Live Link *
              </label>
              <input
                type="url"
                value={form.liveLink}
                onChange={(e) => setForm(f => ({ ...f, liveLink: e.target.value }))}
                placeholder="https://your-project.com"
                className={`w-full p-3 rounded-lg border transition-colors ${theme === 'dark'
                  ? 'bg-zinc-800 border-zinc-700 text-white placeholder-slate-500 focus:border-indigo-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                required={showLiveLink}
              />
            </div>
          )}

          {/* Conditional: Requirements for LOOKING_FOR_CONTRIBUTORS */}
          {showRequirements && (
            <div>
              <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                Looking For *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {REQUIREMENT_OPTIONS.map(req => (
                  <button
                    key={req}
                    type="button"
                    onClick={() => toggleRequirement(req)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${selectedRequirements.includes(req)
                      ? theme === 'dark'
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-indigo-500 border-indigo-600 text-white'
                      : theme === 'dark'
                        ? 'bg-zinc-800 border-zinc-700 text-slate-300 hover:border-indigo-500'
                        : 'bg-slate-50 border-slate-300 text-slate-700 hover:border-indigo-400'
                      }`}
                  >
                    {req}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
              Organization
            </label>
            <input
              type="text"
              value={form.organization}
              onChange={(e) => setForm(f => ({ ...f, organization: e.target.value }))}
              placeholder="Your organization or team name"
              className={`w-full p-3 rounded-lg border transition-colors ${theme === 'dark'
                ? 'bg-zinc-800 border-zinc-700 text-white placeholder-slate-500 focus:border-indigo-500'
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
            />
          </div>

          <div>
            <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
              Country
            </label>
            <input
              type="text"
              value={form.country}
              onChange={(e) => setForm(f => ({ ...f, country: e.target.value }))}
              placeholder="e.g., India, USA, UK"
              className={`w-full p-3 rounded-lg border transition-colors ${theme === 'dark'
                ? 'bg-zinc-800 border-zinc-700 text-white placeholder-slate-500 focus:border-indigo-500'
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500'
                } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
            />
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all ${saving
              ? 'bg-slate-600 cursor-not-allowed'
              : theme === 'dark'
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/20'
                : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg hover:shadow-xl'
              }`}
          >
            {saving ? 'Creating...' : 'Create Project'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${theme === 'dark'
              ? 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300'
              }`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
