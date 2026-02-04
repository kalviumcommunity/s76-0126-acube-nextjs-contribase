"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { GitFork, MessageCircle } from "lucide-react";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";

type ProjectStatus = "Ongoing" | "Contributors Needed" | "Completed";

type ProjectDetail = {
  slug: string;
  title: string;
  organization: string;
  status: ProjectStatus;
  statusColor: string;
  description: string;
  tags: string[];
  stack: string[];
  currentStage: "Idea" | "Design" | "Development" | "Testing" | "Deployment";
  liveDemoUrl?: string;
  repoUrl?: string;
  neededRoles?: string[];
};

const projects: ProjectDetail[] = [
  {
    slug: "disaster-relief-logistics",
    title: "Disaster Relief Logistics",
    organization: "RedCross Tech",
    status: "Ongoing",
    statusColor: "bg-yellow-500/15 text-yellow-400",
    description:
      "A centralized platform for coordinating supply drops and volunteer assignments during natural disasters.",
    tags: ["Logistics", "NGO", "React"],
    stack: ["Logistics", "NGO", "React"],
    currentStage: "Development",
    repoUrl: "https://github.com/example/disaster-relief-logistics.git",
  },
  {
    slug: "clean-water-iot-monitor",
    title: "Clean Water IoT Monitor",
    organization: "OpenWater",
    status: "Contributors Needed",
    statusColor: "bg-sky-500/15 text-sky-400",
    description:
      "Low-cost sensors to monitor water quality in rural wells, transmitting data via LoRaWAN.",
    tags: ["IoT", "Hardware", "C++"],
    stack: ["IoT", "Hardware", "C++"],
    currentStage: "Design",
    neededRoles: ["Embedded Engineer", "Backend Dev"],
  },
  {
    slug: "school-inventory-system",
    title: "School Inventory System",
    organization: "EdTech4All",
    status: "Completed",
    statusColor: "bg-emerald-500/15 text-emerald-400",
    description:
      "Simple inventory management for under-resourced schools to track books and supplies.",
    tags: ["Education", "Python", "Django"],
    stack: ["Education", "Python", "Django"],
    currentStage: "Deployment",
    liveDemoUrl: "https://example.com/school-inventory",
    repoUrl: "https://github.com/example/school-inventory.git",
  },
  {
    slug: "refugee-aid-map",
    title: "Refugee Aid Map",
    organization: "RefugeeConnect",
    status: "Ongoing",
    statusColor: "bg-yellow-500/15 text-yellow-400",
    description:
      "Interactive map showing safe zones, medical centers, and food distribution points.",
    tags: ["Mapping", "Frontend", "Leaflet"],
    stack: ["Mapping", "Frontend", "Leaflet"],
    currentStage: "Testing",
    repoUrl: "https://github.com/example/refugee-aid-map.git",
  },
  {
    slug: "telehealth-outreach-platform",
    title: "Telehealth Outreach Platform",
    organization: "HealthBridge Alliance",
    status: "Ongoing",
    statusColor: "bg-yellow-500/15 text-yellow-400",
    description:
      "Virtual consultation and triage system helping rural clinics connect with volunteer doctors worldwide.",
    tags: ["Healthcare", "Node.js", "PostgreSQL"],
    stack: ["Healthcare", "Node.js", "PostgreSQL"],
    currentStage: "Development",
    repoUrl: "https://github.com/example/telehealth-outreach-platform.git",
  },
  {
    slug: "crisis-volunteer-matcher",
    title: "Crisis Volunteer Matcher",
    organization: "ReliefNow",
    status: "Contributors Needed",
    statusColor: "bg-sky-500/15 text-sky-400",
    description:
      "Matching engine that connects local volunteers with NGOs during floods, earthquakes, and other disasters.",
    tags: ["Matching", "Python", "FastAPI"],
    stack: ["Matching", "Python", "FastAPI"],
    currentStage: "Design",
    neededRoles: ["Full‑stack Engineer", "Data Engineer"],
  },
  {
    slug: "open-aid-analytics",
    title: "Open Aid Analytics",
    organization: "ImpactLab",
    status: "Completed",
    statusColor: "bg-emerald-500/15 text-emerald-400",
    description:
      "Dashboard that aggregates impact metrics from multiple humanitarian projects into a single open dataset.",
    tags: ["Data", "Analytics", "TypeScript"],
    stack: ["Data", "Analytics", "TypeScript"],
    currentStage: "Deployment",
    liveDemoUrl: "https://example.com/open-aid-analytics",
    repoUrl: "https://github.com/example/open-aid-analytics.git",
  },
];

const PIPELINE_STEPS: ProjectDetail["currentStage"][] = [
  "Idea",
  "Design",
  "Development",
  "Testing",
  "Deployment",
];

export default function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-20 mx-auto max-w-4xl px-6 pb-16 md:px-10 text-sm text-slate-400">
          Project not found.{" "}
          <Link
            href="/public/project"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Back to projects
          </Link>
          .
        </div>
        <Footer />
      </main>
    );
  }

  const activeIndex = PIPELINE_STEPS.indexOf(project.currentStage);

  const from = searchParams.get("from");
  const backFilter =
    !from || from === "all"
      ? "all"
      : from === "ongoing"
      ? "ongoing"
      : from === "needs-help"
      ? "needs-help"
      : from === "completed"
      ? "completed"
      : "all";

  const backHref =
    backFilter === "all"
      ? "/public/project"
      : `/public/project?filter=${backFilter}`;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-24 md:px-10">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href={backHref}
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            &larr; Back to Dashboard
          </Link>

          <span
            className={`rounded-full px-3 py-1 text-[10px] font-medium ${project.statusColor}`}
          >
            {project.status}
          </span>
        </div>

        <section className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
            {project.title}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <span className="text-slate-500">by</span>
              <span>{project.organization}</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1">
              {project.stack.join(", ")}
            </span>
          </div>
          <p className="mt-4 max-w-3xl text-sm text-slate-300">
            {project.description}
          </p>
        </section>

        {project.status === "Completed" ? (
          <>
            {/* Completed project banner */}
            <section className="mb-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-zinc-900 bg-[#080814] px-6 py-5 md:flex-row md:items-center">
              <div>
                <h2 className="text-sm font-semibold text-emerald-400">
                  Project Completed
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  This solution is live and ready for reuse.
                </p>
              </div>
              {project.liveDemoUrl && (
                <Link
                  href={project.liveDemoUrl}
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-xs font-medium text-white hover:bg-emerald-400"
                >
                  View Live Demo
                </Link>
              )}
            </section>

            {/* Reuse block with plain repository URL */}
            {project.repoUrl && (
              <section className="rounded-2xl border border-zinc-900 bg-[#080814] px-6 py-5">
                <h3 className="mb-3 text-xs font-medium text-slate-200">
                  Project repository
                </h3>
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <div className="flex-1 overflow-hidden rounded-lg bg-black/60 px-4 py-3 text-[11px] text-slate-200">
                    <span className="break-all">{project.repoUrl}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(project.repoUrl ?? "")}
                    className="mt-2 rounded-lg bg-zinc-800 px-4 py-2 text-xs font-medium text-slate-100 hover:bg-zinc-700 md:mt-0"
                  >
                    Copy
                  </button>
                </div>
              </section>
            )}
          </>
        ) : project.status === "Contributors Needed" ? (
          <>
            {/* Contributors Needed card */}
            <section className="mb-8 rounded-2xl border border-zinc-900 bg-[#080814] px-6 py-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white text-xs font-semibold">
                    Co
                  </div>
                  <div>
                    <div>Contributors Needed</div>
                    <p className="mt-0.5 text-xs text-slate-400">
                      This project is actively looking for help in the following areas:
                    </p>
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-3">
                  {(project.neededRoles ?? []).map((role) => (
                    <span
                      key={role}
                      className="rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-slate-100 border border-slate-700"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Primary contribute CTA */}
            <section className="mt-4">
              <button className="w-full rounded-2xl bg-indigo-500 py-3.5 text-sm font-medium text-white hover:bg-indigo-400">
                I Want to Contribute
              </button>
            </section>
          </>
        ) : (
          <>
            {/* For ongoing projects, show status pipeline + GitHub repo */}
            <section className="mb-8 rounded-2xl border border-zinc-900 bg-[#080814] px-6 py-5">
              <h2 className="mb-5 text-sm font-medium text-slate-100">
                Development Pipeline
              </h2>
              <div className="flex items-center justify-between gap-6">
                {PIPELINE_STEPS.map((step, index) => {
                  const isActive = index <= activeIndex;
                  return (
                    <div
                      key={step}
                      className="flex flex-1 flex-col items-center gap-2 text-xs"
                    >
                      <div
                        className={`h-2 w-full rounded-full ${
                          index === 0 ? "bg-transparent" : "bg-zinc-800"
                        }`}
                      >
                        {index > 0 && (
                          <div
                            className={`h-full rounded-full transition-colors ${
                              index <= activeIndex
                                ? "bg-emerald-400"
                                : "bg-transparent"
                            }`}
                          />
                        )}
                      </div>
                      <div
                        className={`h-3 w-3 rounded-full border ${
                          isActive
                            ? "border-emerald-400 bg-emerald-400"
                            : "border-zinc-700 bg-transparent"
                        }`}
                      />
                      <span
                        className={`mt-1 text-[11px] ${
                          isActive ? "text-slate-100" : "text-slate-500"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {project.repoUrl && (
              <section className="rounded-2xl border border-zinc-900 bg-[#080814] px-6 py-5">
                <h3 className="mb-3 text-xs font-medium text-slate-200">
                  Project repository
                </h3>
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <div className="flex-1 overflow-hidden rounded-lg bg-black/60 px-4 py-3 text-[11px] text-slate-200">
                    <span className="break-all">{project.repoUrl}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(project.repoUrl ?? "")}
                    className="mt-2 rounded-lg bg-zinc-800 px-4 py-2 text-xs font-medium text-slate-100 hover:bg-zinc-700 md:mt-0"
                  >
                    Copy
                  </button>
                </div>
              </section>
            )}
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}

