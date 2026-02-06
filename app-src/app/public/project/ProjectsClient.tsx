"use client";

import React, { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import AddProjectModal from "./AddProjectModal";

const MOCK_PROJECTS = [
  {
    title: "Community Water Map",
    slug: "community-water-map",
    organization: "NGO Alliance",
    status: "Ongoing",
    statusColor: "bg-yellow-500/15 text-yellow-400",
    description:
      "An open-source map to track clean water availability across rural regions.",
  },
  {
    title: "Green Schools Initiative",
    slug: "green-schools-initiative",
    organization: "Eco Foundation",
    status: "Contributors Needed",
    statusColor: "bg-sky-500/15 text-sky-400",
    description:
      "Helping schools transition to sustainable energy and waste systems.",
  },
  {
    title: "Open Health Records",
    slug: "open-health-records",
    organization: "HealthTech Collective",
    status: "Ongoing",
    statusColor: "bg-yellow-500/15 text-yellow-400",
    description:
      "A privacy-first platform for managing and sharing medical records.",
  },
  {
    title: "Disaster Relief Tracker",
    slug: "disaster-relief-tracker",
    organization: "Civic Labs",
    status: "Completed",
    statusColor: "bg-emerald-500/15 text-emerald-400",
    description:
      "Tracks relief resources and volunteers during natural disasters.",
  },
  {
    title: "Public Transport Optimizer",
    slug: "public-transport-optimizer",
    organization: "Urban Stack",
    status: "Contributors Needed",
    statusColor: "bg-sky-500/15 text-sky-400",
    description:
      "Data-driven insights to improve public transport routes and timing.",
  },
];

export default function ProjectsClient() {
  const [projects, setProjects] = useState<any[]>(MOCK_PROJECTS);
  const [openModal, setOpenModal] = useState(false);
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(
    () =>
      projects.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      ),
    [query, projects]
  );

  return (
    <div className="min-h-screen bg-black px-10 pt-10">
      <h1 className="text-4xl font-bold text-white">Projects</h1>

      <div className="mt-8 flex items-center justify-between">
        <div className="relative w-96">
          <Search
            className="absolute left-4 top-3 text-indigo-400"
            size={18}
          />
          <input
            placeholder="Search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl bg-white/5 py-3 pl-11 text-white outline-none"
          />
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-white transition hover:bg-indigo-600"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-6">
        {filteredProjects.map((p) => (
          <div
            key={p.slug}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-white">
                {p.title}
              </h3>
              <span
                className={`rounded-full px-3 py-1 text-xs ${p.statusColor}`}
              >
                {p.status}
              </span>
            </div>

            <p className="mt-3 text-sm text-slate-400">
              {p.description}
            </p>
          </div>
        ))}
      </div>

      <AddProjectModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={(project) =>
          setProjects((prev) => [project, ...prev])
        }
      />
    </div>
  );
}
