"use client";

import React from "react";
import { Search, Plus } from "lucide-react";

const projects = [
  {
    title: "Disaster Relief Logistics",
    by: "RedCross Tech",
    status: "Ongoing",
    statusColor: "bg-yellow-500/15 text-yellow-400",
    description:
      "A centralized platform for coordinating supply drops and volunteer assignments during natural disasters.",
    tags: ["Logistics", "NGO", "React"],
  },
  {
    title: "Clean Water IoT Monitor",
    by: "OpenWater",
    status: "Contributors Needed",
    statusColor: "bg-indigo-500/15 text-indigo-400",
    description:
      "Low-cost sensors to monitor water quality in rural wells, transmitting data via LoRaWAN.",
    tags: ["IoT", "Hardware", "C++"],
  },
  {
    title: "School Inventory System",
    by: "EdTech4All",
    status: "Completed",
    statusColor: "bg-green-500/15 text-green-400",
    description:
      "Simple inventory management for under-resourced schools to track books and supplies.",
    tags: ["Education", "Python", "Django"],
  },
  {
    title: "Refugee Aid Map",
    by: "RefugeeConnect",
    status: "Ongoing",
    statusColor: "bg-yellow-500/15 text-yellow-400",
    description:
      "Interactive map showing safe zones, medical centers, and food distribution points.",
    tags: ["Mapping", "Frontend", "Leaflet"],
  },
];

export default function ProjectsClient() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-950 text-white px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-white/50">
            Discover, track, and contribute to ongoing initiatives.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500 transition">
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex items-center justify-between mb-8 gap-6">
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            placeholder="Search projects by title or tag..."
            className="w-full rounded-md bg-white/5 border border-white/10 pl-9 pr-4 py-2 text-sm placeholder:text-white/40 focus:outline-none focus:border-white/20 transition"
          />
        </div>

        <div className="flex gap-2">
          {["All", "Ongoing", "Needs Help", "Completed"].map((f) => (
            <button
              key={f}
              className="rounded-md bg-white/5 px-3 py-1 text-sm text-white/70 hover:bg-white/10 transition"
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {projects.map((project) => (
          <div
            key={project.title}
            className="rounded-xl bg-white/[0.04] border border-white/5 p-5
                       hover:border-white/10 hover:-translate-y-1
                       transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">{project.title}</h3>
              <span className={`text-xs px-2 py-1 rounded ${project.statusColor}`}>
                {project.status}
              </span>
            </div>

            <p className="text-xs text-white/40 mb-2">by {project.by}</p>

            <p className="text-sm text-white/60 mb-4 leading-relaxed">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded bg-white/5 px-2 py-1 text-xs text-white/60">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
