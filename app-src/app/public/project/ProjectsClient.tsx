"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const projects = [
  {
    title: "Disaster Relief Logistics",
    slug: "disaster-relief-logistics",
    organization: "RedCross Tech",
    status: "Ongoing",
    statusColor: "bg-yellow-500/15 text-yellow-400",
    description:
      "A centralized platform for coordinating supply drops and volunteer assignments during natural disasters.",
    tags: ["Logistics", "NGO", "React"],
  },
  {
    title: "Clean Water IoT Monitor",
    slug: "clean-water-iot-monitor",
    organization: "OpenWater",
    status: "Contributors Needed",
    statusColor: "bg-sky-500/15 text-sky-400",
    description:
      "Low-cost sensors to monitor water quality in rural wells, transmitting data via LoRaWAN.",
    tags: ["IoT", "Hardware", "C++"],
  },
  {
    title: "School Inventory System",
    slug: "school-inventory-system",
    organization: "EdTech4All",
    status: "Completed",
    statusColor: "bg-emerald-500/15 text-emerald-400",
    description:
      "Simple inventory management for under-resourced schools to track books and supplies.",
    tags: ["Education", "Python", "Django"],
  },
  {
    title: "Refugee Aid Map",
    slug: "refugee-aid-map",
    organization: "RefugeeConnect",
    status: "Ongoing",
    statusColor: "bg-yellow-500/15 text-yellow-400",
    description:
      "Interactive map showing safe zones, medical centers, and food distribution points.",
    tags: ["Mapping", "Frontend", "Leaflet"],
  },
  {
    title: "Telehealth Outreach Platform",
    slug: "telehealth-outreach-platform",
    organization: "HealthBridge Alliance",
    status: "Ongoing",
    statusColor: "bg-yellow-500/15 text-yellow-400",
    description:
      "Virtual consultation and triage system helping rural clinics connect with volunteer doctors worldwide.",
    tags: ["Healthcare", "Node.js", "PostgreSQL"],
  },
  {
    title: "Crisis Volunteer Matcher",
    slug: "crisis-volunteer-matcher",
    organization: "ReliefNow",
    status: "Contributors Needed",
    statusColor: "bg-sky-500/15 text-sky-400",
    description:
      "Matching engine that connects local volunteers with NGOs during floods, earthquakes, and other disasters.",
    tags: ["Matching", "Python", "FastAPI"],
  },
  {
    title: "Open Aid Analytics",
    slug: "open-aid-analytics",
    organization: "ImpactLab",
    status: "Completed",
    statusColor: "bg-emerald-500/15 text-emerald-400",
    description:
      "Dashboard that aggregates impact metrics from multiple humanitarian projects into a single open dataset.",
    tags: ["Data", "Analytics", "TypeScript"],
  },
];

export default function ProjectsClient() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Ongoing" | "Needs Help" | "Completed"
  >("All");

  // Search state
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [localResults, setLocalResults] = useState<any[]>([]);
  const [githubResults, setGithubResults] = useState<any[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Add project form
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    currentStage: 'ONGOING',
    category: '',
    techStack: '',
    githubRepoLink: '',
    liveLink: '',
    requirements: '',
    organization: '',
  });

  // simple debounce
  useEffect(() => {
    const id = setTimeout(() => {
      if (!query) {
        setLocalResults([]);
        setGithubResults([]);
        setSearching(false);
        setSearchError(null);
        return;
      }

      (async () => {
        setSearching(true);
        setSearchError(null);
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          if (!res.ok) throw new Error('Search failed');
          const data = await res.json();
          setLocalResults(data.localProjects ?? []);
          setGithubResults(data.githubProjects ?? []);
        } catch (err: any) {
          console.error(err);
          setSearchError(err?.message ?? 'Search error');
        } finally {
          setSearching(false);
        }
      })();
    }, 400);
    return () => clearTimeout(id);
  }, [query]);

  // Sync filter with URL (?filter=ongoing|needs-help|completed|all)
  useEffect(() => {
    const value = searchParams.get("filter");
    if (!value) return;

    switch (value.toLowerCase()) {
      case "ongoing":
        setActiveFilter("Ongoing");
        break;
      case "needs-help":
        setActiveFilter("Needs Help");
        break;
      case "completed":
        setActiveFilter("Completed");
        break;
      case "all":
      default:
        setActiveFilter("All");
        break;
    }
  }, [searchParams]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    if (activeFilter === "Ongoing") {
      return projects.filter((p) => p.status === "Ongoing");
    }
    if (activeFilter === "Needs Help") {
      // Match the label to the underlying status "Contributors Needed"
      return projects.filter((p) => p.status === "Contributors Needed");
    }
    // Completed
    return projects.filter((p) => p.status === "Completed");
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-6 md:px-10">
        {/* Page Heading */}
        <section className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
            Projects
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Discover, track, and contribute to ongoing initiatives.
          </p>
        </section>

        {/* Search, Filters, CTA */}
        <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xl">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or GitHub repos..."
              className="w-full rounded-xl border border-zinc-800 bg-[#070713] py-3 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-xl bg-[#080814] p-1 text-xs text-slate-300">
              {["All", "Ongoing", "Needs Help", "Completed"].map((filter) => {
                const typedFilter =
                  filter === "Needs Help"
                    ? "Needs Help"
                    : (filter as "All" | "Ongoing" | "Completed");

                const isActive = activeFilter === typedFilter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => {
                      setActiveFilter(
                        filter as "All" | "Ongoing" | "Needs Help" | "Completed"
                      );
                      const slug =
                        filter === "All"
                          ? "all"
                          : filter === "Ongoing"
                          ? "ongoing"
                          : filter === "Needs Help"
                          ? "needs-help"
                          : "completed";
                      // Update URL query without full reload for sharable filters
                      const url = new URL(window.location.href);
                      url.searchParams.set("filter", slug);
                      window.history.replaceState(null, "", url.toString());
                    }}
                    className={`rounded-lg px-3 py-1 transition-colors ${
                      isActive
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-300 hover:bg-slate-800/80"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            <button onClick={() => setShowForm((s) => !s)} className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-xs font-medium text-white shadow-[0_0_0_1px_rgba(129,140,248,0.4)] shadow-indigo-500/40 hover:bg-indigo-400">
              <Plus size={16} />
              Add Project
            </button>
          </div>
        </section>

        {/* Add Project Form */}
        {showForm && (
          <section className="mb-6 rounded-xl border border-zinc-800 bg-[#06060a] p-4">
            <h3 className="mb-2 text-sm font-medium text-slate-50">Create Project</h3>
            <div className="grid gap-2 md:grid-cols-2">
              <input value={form.title} onChange={(e) => setForm(f => ({...f, title: e.target.value}))} placeholder="Title" className="rounded-md bg-[#070713] p-2 text-sm" />
              <input value={form.organization} onChange={(e) => setForm(f => ({...f, organization: e.target.value}))} placeholder="Organization" className="rounded-md bg-[#070713] p-2 text-sm" />
              <select value={form.currentStage} onChange={(e) => setForm(f => ({...f, currentStage: e.target.value}))} className="rounded-md bg-[#070713] p-2 text-sm">
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
                <option value="LOOKING_FOR_CONTRIBUTORS">Looking for contributors</option>
              </select>
              <input value={form.category} onChange={(e) => setForm(f => ({...f, category: e.target.value}))} placeholder="Category" className="rounded-md bg-[#070713] p-2 text-sm" />
            </div>
            <textarea value={form.description} onChange={(e) => setForm(f => ({...f, description: e.target.value}))} placeholder="Description" className="mt-2 w-full rounded-md bg-[#070713] p-2 text-sm" rows={4} />
            <div className="mt-2 flex gap-2">
              <input value={form.techStack} onChange={(e) => setForm(f => ({...f, techStack: e.target.value}))} placeholder="Tech stack (comma separated)" className="flex-1 rounded-md bg-[#070713] p-2 text-sm" />
              <input value={form.githubRepoLink} onChange={(e) => setForm(f => ({...f, githubRepoLink: e.target.value}))} placeholder="GitHub repo URL" className="flex-1 rounded-md bg-[#070713] p-2 text-sm" />
            </div>
            <div className="mt-2 flex gap-2">
              <input value={form.liveLink} onChange={(e) => setForm(f => ({...f, liveLink: e.target.value}))} placeholder="Live link" className="flex-1 rounded-md bg-[#070713] p-2 text-sm" />
              <input value={form.requirements} onChange={(e) => setForm(f => ({...f, requirements: e.target.value}))} placeholder="Requirements (comma separated)" className="flex-1 rounded-md bg-[#070713] p-2 text-sm" />
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={async () => {
                try {
                  const payload = {
                    title: form.title,
                    description: form.description,
                    currentStage: form.currentStage,
                    category: form.category,
                    techStack: form.techStack.split(',').map(s=>s.trim()).filter(Boolean),
                    githubRepoLink: form.githubRepoLink,
                    liveLink: form.liveLink,
                    requirements: form.requirements.split(',').map(s=>s.trim()).filter(Boolean),
                    organization: form.organization,
                  };
                  const res = await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                  if (!res.ok) throw new Error('Failed to save project');
                  setShowForm(false);
                  // refresh page to show created project (simple approach)
                  window.location.reload();
                } catch (err) {
                  console.error(err);
                  alert('Failed to create project');
                }
              }} className="rounded-md bg-indigo-600 px-3 py-2 text-sm">Create</button>
              <button onClick={() => setShowForm(false)} className="rounded-md bg-zinc-800 px-3 py-2 text-sm">Cancel</button>
            </div>
          </section>
        )}

        {/* Projects Grid */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(query ? localResults : filteredProjects).map((project: any) => {
            // Preserve which filter the user was on when navigating to details
            const filterSlug =
              activeFilter === "All"
                ? "all"
                : activeFilter === "Ongoing"
                ? "ongoing"
                : activeFilter === "Needs Help"
                ? "needs-help"
                : "completed";
            const title = project.title ?? project.name ?? project.full_name;
            const org = project.organization ?? project.organization ?? project.owner ?? project.by ?? '';
            const status = project.status ?? project.currentStage ?? 'Ongoing';
            const description = project.description ?? project.description ?? '';
            const tags = project.tags ?? project.techStack ?? [];

            // For local DB items that may not have a slug, link to a simple details path when available
            const href = project.slug ? `/public/project/${project.slug}?from=${filterSlug}` : undefined;

            return (
              href ? (
                <Link
                  key={title + org}
                  href={href}
                  className="group rounded-2xl border border-zinc-900 bg-[#080814] p-5 shadow-[0_0_0_1px_rgba(15,23,42,0.8)] hover:border-zinc-700 hover:bg-[#0c0c1a] transition-colors"
                >
                  <article>
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-50 group-hover:text-slate-100">
                          {title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">by {org}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-[10px] font-medium ${project.statusColor ?? 'bg-yellow-500/15 text-yellow-400'}`}>{status}</span>
                    </div>

                    <p className="mb-5 text-xs leading-relaxed text-slate-300">{description}</p>

                    <div className="flex flex-wrap gap-2">{(tags || []).map((tag: any) => <span key={tag} className="rounded-full bg-[#10101f] px-3 py-1 text-[10px] text-slate-300">{tag}</span>)}</div>
                  </article>
                </Link>
              ) : (
                <div key={title + org} className="rounded-2xl border border-zinc-900 bg-[#080814] p-5">
                  <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
                  <p className="mt-1 text-xs text-slate-400">by {org}</p>
                  <p className="mt-3 text-xs text-slate-300">{description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">{(tags || []).map((tag: any) => <span key={tag} className="rounded-full bg-[#10101f] px-3 py-1 text-[10px] text-slate-300">{tag}</span>)}</div>
                </div>
              )
            );
          })}

          {/* GitHub results (when searching) */}
          {query && githubResults.map((repo: any) => (
            <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="rounded-2xl border border-zinc-900 bg-[#081026] p-5 hover:border-zinc-700 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-50">{repo.full_name}</h3>
                  <p className="mt-1 text-xs text-slate-400">{repo.description}</p>
                </div>
                <div className="text-right text-xs text-slate-400">
                  <div>⭐ {repo.stargazers_count ?? 0}</div>
                  <div className="mt-1">{repo.language ?? '—'}</div>
                </div>
              </div>
            </a>
          ))}
        </section>
      </main>
    </div>
  );
}
