"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTheme } from "../../../contexts/theme-context";
import ScrollReveal from "../../../components/scroll-reveal";

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
];

export default function ProjectsClient() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const { theme } = useTheme();

  const [activeFilter, setActiveFilter] = useState<
    "All" | "Ongoing" | "Needs Help" | "Completed"
  >("All");

  const [query, setQuery] = useState("");
  const [localResults, setLocalResults] = useState<any[]>([]);
  const [githubResults, setGithubResults] = useState<any[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    currentStage: "ONGOING",
    category: "",
    techStack: "",
    githubRepoLink: "",
    liveLink: "",
    requirements: "",
    organization: "",
  });

  // search debounce
  useEffect(() => {
    const id = setTimeout(() => {
      if (!query) {
        setLocalResults([]);
        setGithubResults([]);
        setSearchError(null);
        return;
      }

      (async () => {
        try {
          const res = await fetch(
            `/api/search?q=${encodeURIComponent(query)}`
          );
          if (!res.ok) throw new Error("Search failed");
          const data = await res.json();
          setLocalResults(data.localProjects ?? []);
          setGithubResults(data.githubProjects ?? []);
        } catch (err: any) {
          setSearchError(err?.message ?? "Search error");
        }
      })();
    }, 400);

    return () => clearTimeout(id);
  }, [query]);

  // URL filter sync
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
      default:
        setActiveFilter("All");
    }
  }, [searchParams]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    if (activeFilter === "Ongoing")
      return projects.filter((p) => p.status === "Ongoing");
    if (activeFilter === "Needs Help")
      return projects.filter((p) => p.status === "Contributors Needed");
    return projects.filter((p) => p.status === "Completed");
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-transparent">
      <main className="mx-auto max-w-screen-2xl px-6 pb-24 pt-10 md:px-10">
        {/* Heading */}
        <ScrollReveal>
          <section className="mb-10">
            <h1
              className={`text-3xl md:text-4xl font-black ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Projects
            </h1>
            <p
              className={`mt-2 text-base ${
                theme === "dark" ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Discover and contribute to social impact projects.
            </p>
          </section>
        </ScrollReveal>

        {/* Search + Filters */}
        <ScrollReveal delay={100}>
          <section className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-xl">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full rounded-xl border py-3 pl-11 pr-5 text-sm"
              />
            </div>

            <div className="flex items-center gap-4">
              {["All", "Ongoing", "Needs Help", "Completed"].map((filter) => (
                <button
                  key={filter}
                  onClick={() =>
                    setActiveFilter(
                      filter as
                        | "All"
                        | "Ongoing"
                        | "Needs Help"
                        | "Completed"
                    )
                  }
                  className={`px-4 py-2 rounded-lg text-sm ${
                    activeFilter === filter
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-200"
                  }`}
                >
                  {filter}
                </button>
              ))}

              <button
                onClick={() => setShowForm((s) => !s)}
                className="flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-white"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          </section>
        </ScrollReveal>

        {/* Projects Grid */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(query ? localResults : filteredProjects).map((project: any) => (
            <div
              key={project.title}
              className="rounded-xl border p-5 bg-white"
            >
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-slate-500">
                {project.organization}
              </p>
              <p className="mt-2 text-sm">{project.description}</p>
            </div>
          ))}

          {/* GitHub results */}
          {query &&
            githubResults.map((repo: any) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border p-5 bg-slate-50"
              >
                <h3 className="font-semibold">{repo.full_name}</h3>
                <p className="text-sm text-slate-500">
                  {repo.description}
                </p>
              </a>
            ))}
        </section>
      </main>
    </div>
  );
}
