"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTheme } from "../../../contexts/theme-context";

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

import ScrollReveal from "../../../components/scroll-reveal";

export default function ProjectsClient() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Ongoing" | "Needs Help" | "Completed"
  >("All");

  // Sync filter with URL (?filter=ongoing|needs-help|completed|all)
  useEffect(() => {
    const value = searchParams?.get("filter");
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
    <div className={`min-h-screen bg-transparent transition-colors duration-300`}>
      <main className="mx-auto max-w-screen-2xl px-6 pb-24 pt-10 md:px-10">
        {/* Page Heading */}
        <ScrollReveal>
          <section className="mb-10">
            <h1 className={`text-3xl md:text-4xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
              Projects
            </h1>
            <p className={`mt-2 text-base font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
              Discover, track, and contribute to ongoing social impact initiatives.
            </p>
          </section>
        </ScrollReveal>

        {/* Search, Filters, CTA */}
        <ScrollReveal delay={100}>
          <section className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-xl group">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 transition-transform group-focus-within:scale-110"
              />
              <input
                placeholder="Search projects by title or tag..."
                className={`w-full rounded-xl border py-3 pl-11 pr-5 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-4 ${theme === 'dark'
                  ? 'border-zinc-800/50 bg-black text-slate-100 placeholder:text-slate-500 focus:border-indigo-500/50 focus:ring-indigo-500/10'
                  : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20 shadow-sm'
                  }`}
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className={`inline-flex rounded-xl p-1 text-xs border transition-all duration-300 ${theme === 'dark'
                ? 'bg-black text-slate-300 border-zinc-800/50'
                : 'bg-white text-slate-600 border-slate-200 shadow-sm'
                }`}>
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
                        // ... existing logic ...
                      }}
                      className={`rounded-lg px-4 py-1.5 font-bold tracking-tight transition-all duration-300 ${isActive
                        ? (theme === 'dark' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-indigo-600 text-white shadow-md")
                        : (theme === 'dark' ? "text-slate-500 hover:bg-white/5 hover:text-slate-200" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900")
                        }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>

              <button className="group relative inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-black text-white shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 hover:scale-105 transition-all duration-300">
                <Plus size={18} className="relative z-10" />
                <span className="relative z-10">Add</span>
              </button>
            </div>
          </section>
        </ScrollReveal>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => {
            // Preserve which filter the user was on when navigating to details
            const filterSlug =
              activeFilter === "All"
                ? "all"
                : activeFilter === "Ongoing"
                  ? "ongoing"
                  : activeFilter === "Needs Help"
                    ? "needs-help"
                    : "completed";

            return (
              <ScrollReveal key={project.title} delay={200 + index * 50}>
                <Link
                  href={`/public/project/${project.slug}?from=${filterSlug}`}
                  className={`group relative h-full flex flex-col rounded-2xl border p-6 transition-all duration-700 ${theme === 'dark'
                    ? 'border-zinc-800/40 bg-black hover:border-indigo-500/30 hover:bg-indigo-500/[0.02]'
                    : 'border-slate-200 bg-white shadow-sm hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5'
                    } hover:-translate-y-1.5 hover:scale-[1.01] overflow-hidden`}
                >
                  <article className="relative z-10 flex flex-col h-full">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div>
                        <h3 className={`text-lg font-black tracking-tight leading-tight transition-colors duration-300 ${theme === 'dark' ? 'text-white group-hover:text-indigo-400' : 'text-slate-900 group-hover:text-indigo-600'
                          }`}>
                          {project.title}
                        </h3>
                        <p className={`mt-1 text-[10px] font-black tracking-widest uppercase transition-colors ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                          }`}>
                          {project.organization}
                        </p>
                      </div>
                      <span
                        className={`rounded-lg px-3 py-1 text-[9px] font-black uppercase tracking-widest border ${project.status === "Ongoing"
                          ? (theme === 'dark' ? 'bg-amber-500/5 text-amber-500 border-amber-500/20' : 'bg-amber-50 text-amber-600 border-amber-100 shadow-sm')
                          : project.status === "Contributors Needed"
                            ? (theme === 'dark' ? 'bg-rose-500/5 text-rose-500 border-rose-500/20' : 'bg-rose-50 text-rose-600 border-rose-100 shadow-sm')
                            : (theme === 'dark' ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm')
                          }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className={`mb-8 text-sm leading-relaxed line-clamp-3 font-medium ${theme === 'dark' ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-600'
                      }`}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-lg px-3 py-1 text-[10px] font-bold tracking-tight transition-all duration-300 border ${theme === 'dark'
                            ? 'bg-zinc-900/40 text-slate-500 border-zinc-800'
                            : 'bg-slate-50 text-slate-500 border-slate-100'
                            }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            );
          })}
        </section>
      </main>
    </div>
  );
}
