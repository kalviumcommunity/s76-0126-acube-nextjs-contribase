"use client";

import { X, ArrowLeft, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (project: any) => void;
}

export default function AddProjectModal({ open, onClose, onCreate }: Props) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    stage: "",
    status: "Ongoing",
    github: "",
    tags: "",
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    onCreate({
      title: form.title,
      slug:
        form.title.toLowerCase().replace(/\s+/g, "-") +
        "-" +
        Date.now(), // ✅ unique key fix
      organization: "Community",
      status:
        form.status === "Needs Help"
          ? "Contributors Needed"
          : form.status,
      statusColor:
        form.status === "Completed"
          ? "bg-emerald-500/15 text-emerald-400"
          : form.status === "Needs Help"
          ? "bg-sky-500/15 text-sky-400"
          : "bg-yellow-500/15 text-yellow-400",
      description: form.description,
      category: form.category,
      stage: form.stage,
      github: form.github,
      tags: form.tags.split(",").map((t) => t.trim()),
    });

    onClose();
  };

  const inputBase =
    "w-full rounded-lg bg-neutral-900 px-4 py-3 text-sm text-white ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500 outline-none";

  const selectBase =
    "w-full rounded-lg bg-neutral-900 px-4 py-3 pr-10 text-sm text-white ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-linear-to-b from-neutral-900 to-neutral-950 p-8 text-white shadow-2xl"
          >
            {/* Back */}
            <button
              onClick={onClose}
              className="mb-6 flex items-center gap-2 text-sm text-slate-400 hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Projects
            </button>

            <h1 className="text-2xl font-semibold">Add New Project</h1>
            <p className="mt-1 text-sm text-slate-400">
              Share your initiative to find contributors.
            </p>

            <form onSubmit={submitHandler} className="mt-8 space-y-5">
              <input
                placeholder="Project Title"
                required
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className={inputBase}
              />

              <textarea
                rows={3}
                placeholder="What problem are you solving?"
                required
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className={`${inputBase} resize-none`}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <select
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className={selectBase}
                  >
                    <option value="">Select category</option>
                    <option>Health</option>
                    <option>Education</option>
                    <option>Environment</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>

                <div className="relative">
                  <select
                    onChange={(e) =>
                      setForm({ ...form, stage: e.target.value })
                    }
                    className={selectBase}
                  >
                    <option value="">Select stage</option>
                    <option>Idea</option>
                    <option>Prototype</option>
                    <option>Production</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </div>

              <input
                placeholder="https://github.com/user/repo"
                onChange={(e) =>
                  setForm({ ...form, github: e.target.value })
                }
                className={inputBase}
              />

              <input
                placeholder="React, NGO, Environment"
                onChange={(e) =>
                  setForm({ ...form, tags: e.target.value })
                }
                className={inputBase}
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-medium hover:bg-indigo-700 transition"
              >
                Create Project
              </button>
            </form>

            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </motion.div>
        </motion.div>
      )}

      <style jsx global>{`
        option {
          background-color: #0f172a;
          color: #e5e7eb;
        }
      `}</style>
    </AnimatePresence>
  );
}
