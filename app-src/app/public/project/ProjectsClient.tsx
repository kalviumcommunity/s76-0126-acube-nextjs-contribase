"use client";

import React from "react";
import { Search, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
];

export default function ProjectsClient() {
  const { data: session } = useSession();

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
              placeholder="Search projects by title or tag..."
              className="w-full rounded-xl border border-zinc-800 bg-[#070713] py-3 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-xl bg-[#080814] p-1 text-xs text-slate-300">
              {["All", "Ongoing", "Needs Help", "Completed"].map((filter, i) => (
                <button
                  key={filter}
                  className={`rounded-lg px-3 py-1 transition-colors ${
                    i === 0
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-300 hover:bg-slate-800/80"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-xs font-medium text-white shadow-[0_0_0_1px_rgba(129,140,248,0.4)] shadow-indigo-500/40 hover:bg-indigo-400">
              <Plus size={16} />
              Add Project
            </button>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={`/public/project/${project.slug}`}
              className="group rounded-2xl border border-zinc-900 bg-[#080814] p-5 shadow-[0_0_0_1px_rgba(15,23,42,0.8)] hover:border-zinc-700 hover:bg-[#0c0c1a] transition-colors"
            >
              <article>
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-50 group-hover:text-slate-100">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      by {project.organization}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-medium ${project.statusColor}`}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="mb-5 text-xs leading-relaxed text-slate-300">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#10101f] px-3 py-1 text-[10px] text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
