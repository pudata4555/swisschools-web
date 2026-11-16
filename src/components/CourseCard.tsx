import Link from "next/link";
import type { Course } from "@/lib/types";
import { clean, normalizeLevel, tuitionLabel } from "@/lib/format";

export default function CourseCard({ c }: { c: Course }) {
  return (
    <Link href={`/courses/${c._id}`} className="card card-hover group flex flex-col p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="chip">{normalizeLevel(c.levelOfStudy)}</span>
        {c.language && <span className="text-xs text-ink-soft">{clean(c.language)}</span>}
      </div>
      <h3 className="mt-3 line-clamp-2 text-base font-semibold text-ink group-hover:text-brand">
        {clean(c.programName)}
      </h3>
      <p className="mt-1 line-clamp-1 text-sm text-ink-muted">{clean(c.universityName)}</p>

      <dl className="mt-4 space-y-1.5 text-sm text-ink-muted">
        {c.location && (
          <div className="flex gap-2">
            <dt className="text-ink-soft">📍</dt>
            <dd className="line-clamp-1">{clean(c.location)}</dd>
          </div>
        )}
        {c.duration && (
          <div className="flex gap-2">
            <dt className="text-ink-soft">⏱</dt>
            <dd className="line-clamp-1">{clean(c.duration)}</dd>
          </div>
        )}
      </dl>

      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <span className="text-sm font-semibold text-ink">{tuitionLabel(c)}</span>
        <span className="text-sm font-semibold text-brand">Details →</span>
      </div>
    </Link>
  );
}
