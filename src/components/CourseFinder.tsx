"use client";

import { useMemo, useState } from "react";
import type { Course } from "@/lib/types";
import CourseCard from "./CourseCard";
import { clean, normalizeLevel } from "@/lib/format";

const PAGE_SIZE = 12;

export default function CourseFinder({ courses }: { courses: Course[] }) {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState("All");
  const [page, setPage] = useState(1);

  const levels = useMemo(() => {
    const set = new Set<string>();
    courses.forEach((c) => set.add(normalizeLevel(c.levelOfStudy)));
    return ["All", ...Array.from(set).sort()];
  }, [courses]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return courses.filter((c) => {
      if (level !== "All" && normalizeLevel(c.levelOfStudy) !== level) return false;
      if (!needle) return true;
      return (
        clean(c.programName).toLowerCase().includes(needle) ||
        clean(c.universityName).toLowerCase().includes(needle) ||
        clean(c.location).toLowerCase().includes(needle)
      );
    });
  }, [courses, q, level]);

  const shown = filtered.slice(0, page * PAGE_SIZE);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Filters */}
      <aside className="h-fit lg:sticky lg:top-24">
        <div className="card p-5">
          <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Search</label>
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
            placeholder="Programme, university, city…"
            className="mt-2 w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:border-brand"
          />

          <label className="mt-5 block text-xs font-semibold uppercase tracking-wide text-ink-soft">Level</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => { setLevel(l); setPage(1); }}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  level === l ? "bg-brand text-white" : "bg-cloud text-ink-muted hover:bg-line"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Results */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-ink-muted">
            <strong className="text-ink">{filtered.length}</strong> programmes found
          </p>
        </div>
        {shown.length === 0 ? (
          <div className="card p-10 text-center text-ink-muted">No programmes match your filters.</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {shown.map((c) => (
              <CourseCard key={c._id} c={c} />
            ))}
          </div>
        )}
        {shown.length < filtered.length && (
          <div className="mt-8 text-center">
            <button onClick={() => setPage((p) => p + 1)} className="btn-outline">
              Load more programmes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
