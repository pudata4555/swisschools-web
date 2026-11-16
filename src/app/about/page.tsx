import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: "SwisSchools helps international students explore higher education in Switzerland with personalised, transparent guidance.",
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-cloud">
        <div className="container-x py-14">
          <p className="eyebrow">About us</p>
          <h1 className="mt-3 text-4xl font-bold">Your trusted guide to studying in Switzerland</h1>
        </div>
      </section>
      <section className="container-x grid gap-10 py-14 lg:grid-cols-2">
        <div className="space-y-4 text-ink-muted">
          <p>
            Switzerland offers an exceptional combination of academic excellence, international
            exposure, innovation and career-focused education. At SwisSchools, we help aspiring
            students explore higher education opportunities that align with their qualifications,
            interests and professional ambitions.
          </p>
          <p>
            Our team provides personalised guidance throughout the study-abroad journey — from
            identifying suitable universities and programmes to preparing applications,
            understanding admission requirements, organising visa documentation and planning
            your departure. We simplify each step.
          </p>
          <p>
            We focus exclusively on Switzerland, so our guidance is specialised, current and
            genuinely useful for international students, particularly from India and South Asia.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 h-fit">
          {[
            ["Switzerland-only", "Deep, specialised expertise rather than generic study-abroad advice."],
            ["Transparent", "Clear costs, requirements and timelines — no surprises."],
            ["End-to-end", "From shortlist to visa, we support the whole journey."],
            ["Student-first", "Free counselling and honest recommendations."],
          ].map(([t, b]) => (
            <div key={t} className="card p-5">
              <h3 className="text-sm font-semibold">{t}</h3>
              <p className="mt-2 text-xs text-ink-muted">{b}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container-x pb-16">
        <div className="rounded-2xl bg-brand p-8 text-center text-white">
          <h2 className="text-2xl font-bold text-white">Let&apos;s plan your Swiss education</h2>
          <Link href="/contact" className="btn bg-white text-brand hover:bg-white/90 mt-5">Book free counselling</Link>
        </div>
      </section>
    </>
  );
}
