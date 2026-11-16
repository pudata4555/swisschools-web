import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse } from "@/lib/api";
import { clean, normalizeLevel, tuitionLabel } from "@/lib/format";
import type { Course } from "@/lib/types";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const c = await getCourse(params.id);
  if (!c) return { title: "Programme" };
  return {
    title: `${clean(c.programName)} — ${clean(c.universityName)}`,
    description: clean(c.about?.replace(/<[^>]+>/g, " ")).slice(0, 160) ||
      `${clean(c.programName)} at ${clean(c.universityName)} in Switzerland.`,
  };
}

function List({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section className={title ? "border-t border-line pt-8" : ""}>
      {title && <h2 className="text-xl font-bold">{title}</h2>}
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-sm text-ink-muted">
            <span className="text-brand">•</span>
            <span>{clean(it)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function fact(label: string, value?: string) {
  const v = clean(value);
  if (!v) return null;
  return (
    <div className="flex justify-between gap-4 border-b border-line py-2.5 last:border-0">
      <dt className="text-sm text-ink-soft">{label}</dt>
      <dd className="text-right text-sm font-medium text-ink">{v}</dd>
    </div>
  );
}

export default async function ProgramDetail({ params }: { params: { id: string } }) {
  const c: Course | null = await getCourse(params.id);
  if (!c) notFound();

  const campuses = c.campuses?.join(" · ");
  const intakes = c.intakes?.join(", ");
  const eng = c.admissionRequirements?.english;

  return (
    <>
      {/* HERO */}
      <section className="bg-ink text-white">
        <div className="container-x py-16">
          <nav className="text-sm text-white/60">
            <Link href="/courses" className="hover:text-white">Courses</Link> / {clean(c.programName)}
          </nav>
          <span className="chip mt-5">{normalizeLevel(c.levelOfStudy)}</span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold">{clean(c.programName)}</h1>
          <p className="mt-3 text-lg text-white/80">
            {c.universityId ? (
              <Link href={`/universities/${c.universityId}`} className="hover:text-brand-100">{clean(c.universityName)}</Link>
            ) : (
              clean(c.universityName)
            )}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">Apply now</Link>
            <Link href="/contact" className="btn bg-white text-ink hover:bg-white/90">Book counselling</Link>
          </div>
        </div>
      </section>

      <div className="container-x grid gap-10 py-14 lg:grid-cols-[1.6fr_1fr]">
        {/* MAIN */}
        <div className="space-y-8">
          {/* Quick facts */}
          <section>
            <h2 className="text-xl font-bold">Quick facts</h2>
            <dl className="mt-4 rounded-2xl border border-line bg-white p-5">
              {fact("Programme", c.programName)}
              {fact("Degree awarded", c.degreeAwarded)}
              {fact("Level", normalizeLevel(c.levelOfStudy))}
              {fact("Field of study", c.fieldOfStudy)}
              {fact("Duration", c.duration)}
              {fact("Study mode", c.studyMode)}
              {fact("Location", c.location || campuses)}
              {fact("Intakes", intakes || c.applicationDeadline)}
              {fact("Application deadline", typeof c.deadlines === "string" ? c.deadlines : c.applicationDeadline)}
              {fact("Language", c.language)}
              {fact("Industry focus", c.industryFocus)}
              {fact("Target audience", c.targetAudience)}
            </dl>
          </section>

          {/* About */}
          {c.about && (
            <section className="border-t border-line pt-8">
              <h2 className="text-xl font-bold">About the programme</h2>
              <div className="prose-rich mt-4 text-ink-muted" dangerouslySetInnerHTML={{ __html: c.about }} />
            </section>
          )}

          <List title="Specialisations" items={c.specialisations} />
          <List title="Programme highlights" items={c.highlights} />

          {/* Careers */}
          {(c.careers?.roles?.length || c.careers?.employers?.length) ? (
            <section className="border-t border-line pt-8">
              <h2 className="text-xl font-bold">Career opportunities</h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {c.careers?.roles?.length ? (
                  <div>
                    <h3 className="text-sm font-semibold text-ink">Roles</h3>
                    <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
                      {c.careers.roles.map((r, i) => <li key={i}>• {clean(r)}</li>)}
                    </ul>
                  </div>
                ) : null}
                {c.careers?.employers?.length ? (
                  <div>
                    <h3 className="text-sm font-semibold text-ink">Employers & industries</h3>
                    <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
                      {c.careers.employers.map((r, i) => <li key={i}>• {clean(r)}</li>)}
                    </ul>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          <List title="Learning outcomes" items={c.learningOutcomes} />

          {/* Admission */}
          {(c.admissionRequirements?.academic?.length || eng || c.admissionRequirements?.documents?.length) ? (
            <section className="border-t border-line pt-8">
              <h2 className="text-xl font-bold">Admission requirements</h2>
              <List title="" items={c.admissionRequirements?.academic} />
              {eng && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-ink">English proficiency</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {Object.entries(eng).map(([k, v]) => (
                      <span key={k} className="rounded-lg bg-cloud px-3 py-1.5 text-xs font-medium text-ink-muted">
                        {k.toUpperCase()}: {String(v)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {c.admissionRequirements?.documents?.length ? (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-ink">Documents</h3>
                  <ul className="mt-2 grid gap-1.5 text-sm text-ink-muted sm:grid-cols-2">
                    {c.admissionRequirements.documents.map((d, i) => <li key={i}>• {clean(d)}</li>)}
                  </ul>
                </div>
              ) : null}
            </section>
          ) : null}
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
          <div className="card p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Tuition</p>
            <p className="mt-1 text-2xl font-bold text-ink">{tuitionLabel(c)}</p>
            <Link href="/contact" className="btn-primary mt-5 w-full">Apply now</Link>
            <Link href="/contact" className="btn-outline mt-2 w-full">Request fee details</Link>
          </div>
          <div className="card p-6">
            <h3 className="text-sm font-semibold">Need help deciding?</h3>
            <p className="mt-2 text-sm text-ink-muted">
              Our admissions team helps with applications, scholarships and the Swiss student visa.
            </p>
            <Link href="/contact" className="btn-ghost mt-4 w-full border border-line">Contact us</Link>
          </div>
        </aside>
      </div>
    </>
  );
}
