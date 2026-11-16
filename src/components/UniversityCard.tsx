import Link from "next/link";
import type { University } from "@/lib/types";
import { clean } from "@/lib/format";

function stripHtml(html?: string): string {
  if (!html) return "";
  return clean(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));
}

export default function UniversityCard({ u }: { u: University }) {
  const blurb = stripHtml(u.description).slice(0, 120);
  return (
    <Link href={`/universities/${u._id}`} className="card card-hover group overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-cloud">
        {u.universityImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={u.universityImage}
            alt={clean(u.universityName)}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center font-display text-3xl text-ink-soft">
            {clean(u.universityName).charAt(0)}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="line-clamp-2 text-base font-semibold text-ink group-hover:text-brand">
          {clean(u.universityName)}
        </h3>
        {blurb && <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{blurb}…</p>}
        <span className="mt-4 inline-block text-sm font-semibold text-brand">View programmes →</span>
      </div>
    </Link>
  );
}
