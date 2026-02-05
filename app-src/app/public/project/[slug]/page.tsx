"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { GitFork, MessageCircle, ArrowLeft } from "lucide-react";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import { useTheme } from "../../../../contexts/theme-context";

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

import ScrollReveal from "../../../../components/scroll-reveal";

export default function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const { theme } = useTheme();

  const slug = params?.slug ? (Array.isArray(params.slug) ? params.slug[0] : params.slug) : "";
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-transparent' : 'bg-slate-50'
        }`}>
        <Header />
        <div className={`pt-32 mx-auto max-w-4xl px-6 pb-16 md:px-10 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
          Project not found.{" "}
          <Link
            href="/public/project"
            className="text-indigo-400 hover:text-indigo-300 font-bold"
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

  const from = searchParams?.get("from");
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
    <main className={`min-h-screen transition-colors duration-300 bg-transparent`}>
      <Header />
      <div className="mx-auto max-w-screen-2xl px-6 pb-32 pt-32 md:px-10 relative z-10">
        <ScrollReveal>
          <div className="mb-10 flex items-center justify-between">
            <Link
              href={backHref}
              className={`text-sm font-bold flex items-center gap-2 group transition-all ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
            >
              <div className="p-2 rounded-lg bg-slate-800/10 transition-colors group-hover:bg-indigo-500/20">
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              </div>
              Back to Dashboard
            </Link>

            <span
              className={`rounded-xl px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border backdrop-blur-md ${theme === 'dark'
                ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                : 'bg-indigo-50 text-indigo-600 border-indigo-100 shadow-sm'
                }`}
            >
              {project.status}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <section className="mb-10">
            <h1 className={`text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
              {project.title}
            </h1>
            <div className={`mt-3 flex flex-wrap items-center gap-3 text-xs font-bold tracking-tight transition-colors ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
              }`}>
              <span className="flex items-center gap-2 uppercase tracking-wide">
                <span className={theme === 'dark' ? 'text-indigo-400 opacity-60' : 'text-indigo-500'}>By</span>
                <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-900'}>{project.organization}</span>
              </span>
              <span className={theme === 'dark' ? 'text-slate-800' : 'text-slate-300'}>|</span>
              <span className="flex items-center gap-1 text-indigo-400/80">
                {project.stack.join(" • ")}
              </span>
            </div>
            <p className={`mt-6 max-w-3xl text-base md:text-lg font-medium leading-relaxed transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
              {project.description}
            </p>
          </section>
        </ScrollReveal>

        {project.status === "Completed" ? (
          <ScrollReveal delay={200}>
            <div className="space-y-6">
              {/* Completed project banner */}
              <section className={`flex flex-col items-start justify-between gap-6 rounded-2xl border p-8 lg:p-10 md:flex-row md:items-center transition-all ${theme === 'dark' ? 'border-emerald-500/20 bg-black' : 'border-emerald-100 bg-emerald-50/40 shadow-emerald-500/10'
                }`}>
                <div>
                  <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.2em] uppercase mb-2">
                    Project Completed
                  </h2>
                  <p className={`text-lg font-medium leading-normal ${theme === 'dark' ? 'text-slate-300' : 'text-emerald-800/80'
                    }`}>
                    This professional solution is live and ready for reuse across the ecosystem.
                  </p>
                </div>
                {project.liveDemoUrl && (
                  <Link
                    href={project.liveDemoUrl}
                    target="_blank"
                    className="group relative inline-flex items-center justify-center rounded-xl bg-emerald-600 px-8 py-3.5 text-sm font-black text-white hover:bg-emerald-500 transition-all duration-300 hover:scale-[1.05] overflow-hidden"
                  >
                    <span className="relative z-10">View Live Demo</span>
                  </Link>
                )}
              </section>

              {/* Reuse block with plain repository URL */}
              {project.repoUrl && (
                <section className={`rounded-2xl border p-8 lg:p-10 transition-all ${theme === 'dark' ? 'border-zinc-800/50 bg-black' : 'shadow-slate-200/50'
                  }`}>
                  <h3 className={`mb-4 text-[10px] font-black tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-slate-500' : 'text-slate-900'
                    }`}>
                    Project Repository
                  </h3>
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className={`flex-1 overflow-hidden rounded-xl px-5 py-4 text-xs font-mono tracking-tight ${theme === 'dark' ? 'bg-black text-indigo-400 border border-zinc-800/50' : 'bg-slate-50 text-indigo-600 border border-slate-200 shadow-inner'
                      }`}>
                      <span className="break-all">{project.repoUrl}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(project.repoUrl ?? "")}
                      className={`rounded-xl px-8 py-4 text-sm font-black transition-all duration-300 ${theme === 'dark' ? 'bg-white text-black hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'
                        } hover:scale-[1.05] active:scale-[0.98] shadow-xl shadow-white/5`}
                    >
                      Copy URL
                    </button>
                  </div>
                </section>
              )}
            </div>
          </ScrollReveal>
        ) : project.status === "Contributors Needed" ? (
          <ScrollReveal delay={200}>
            <div className="space-y-6">
              {/* Contributors Needed card */}
              <section className={`rounded-2xl border p-8 lg:p-10 transition-all ${theme === 'dark' ? 'border-indigo-500/20 bg-black' : 'border-indigo-100 bg-indigo-50/30'
                }`}>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white text-base font-black shadow-2xl shadow-indigo-600/30">
                      HI
                    </div>
                    <div>
                      <div className={`text-xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        Hiring Contributors
                      </div>
                      <p className={`mt-0.5 text-base font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                        This initiative is actively recruiting for the following specialized roles:
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {(project.neededRoles ?? []).map((role) => (
                      <span
                        key={role}
                        className={`rounded-xl px-5 py-2.5 text-xs font-black tracking-tight border transition-all duration-300 ${theme === 'dark'
                          ? 'bg-zinc-900/40 text-indigo-400 border-indigo-500/20 hover:border-indigo-500/50'
                          : 'bg-white text-indigo-600 border-indigo-200'
                          }`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* Primary contribute CTA */}
              <section>
                <button className="group relative w-full rounded-2xl bg-indigo-600 py-5 text-lg font-black text-white hover:bg-indigo-500 shadow-2xl shadow-indigo-600/30 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10">Apply to Contribute</span>
                </button>
              </section>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal delay={200}>
            <div className="space-y-6">
              {/* For ongoing projects, show status pipeline + GitHub repo */}
              <section className={`rounded-2xl border p-8 lg:p-10 transition-all ${theme === 'dark' ? 'border-zinc-800/50 bg-black' : 'border-slate-200 bg-white shadow-sm'
                }`}>
                <h2 className={`mb-8 text-[10px] font-black tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-slate-500' : 'text-slate-900'
                  }`}>
                  Development Pipeline
                </h2>
                <div className="flex items-center justify-between gap-8 overflow-x-auto pb-4 scrollbar-none">
                  {PIPELINE_STEPS.map((step, index) => {
                    const isActive = index <= activeIndex;
                    return (
                      <div
                        key={step}
                        className="flex flex-1 min-w-[100px] flex-col items-center gap-3 text-xs"
                      >
                        <div
                          className={`h-2 w-full rounded-full ${index === 0 ? "bg-transparent" : (theme === 'dark' ? "bg-zinc-900" : "bg-slate-100")
                            }`}
                        >
                          {index > 0 && (
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ease-out ${index <= activeIndex
                                ? "bg-emerald-500 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                                : "bg-transparent"
                                }`}
                            />
                          )}
                        </div>
                        <div
                          className={`h-4 w-4 rounded-full border-[2.5px] transition-all duration-700 ${isActive
                            ? "border-emerald-500 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                            : (theme === 'dark' ? "border-zinc-800 bg-transparent" : "border-slate-300 bg-transparent")
                            }`}
                        />
                        <span
                          className={`mt-1 font-black tracking-tight transition-colors duration-300 ${isActive ? (theme === 'dark' ? "text-white" : "text-emerald-600") : "text-slate-500"
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
                <section className={`rounded-2xl border p-8 lg:p-10 transition-all ${theme === 'dark' ? 'border-zinc-800/50 bg-black' : 'shadow-slate-200/50'
                  }`}>
                  <h3 className={`mb-4 text-[10px] font-black tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-slate-500' : 'text-slate-900'
                    }`}>
                    Project Repository
                  </h3>
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className={`flex-1 overflow-hidden rounded-xl px-5 py-4 text-xs font-mono tracking-tight ${theme === 'dark' ? 'bg-black text-indigo-400 border border-zinc-800/50' : 'bg-slate-50 text-indigo-600 border border-slate-200 shadow-inner'
                      }`}>
                      <span className="break-all">{project.repoUrl}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(project.repoUrl ?? "")}
                      className={`rounded-xl px-8 py-4 text-sm font-black transition-all duration-300 md:mt-0 ${theme === 'dark' ? 'bg-white text-black hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md'
                        } hover:scale-[1.05] active:scale-[0.98] shadow-xl shadow-white/5`}
                    >
                      Copy URL
                    </button>
                  </div>
                </section>
              )}
            </div>
          </ScrollReveal>
        )}
      </div>
      <Footer />
    </main>
  );
}

