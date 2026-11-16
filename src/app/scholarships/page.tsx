import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Scholarships",
  description: "Scholarships for international students in Switzerland — government, university and merit-based funding.",
};

const TYPES = [
  { t: "Swiss Government Excellence Scholarships", b: "Federal scholarships for international postgraduate researchers and artists across Swiss public universities." },
  { t: "University merit scholarships", b: "Many universities and private schools offer partial tuition waivers based on academic merit." },
  { t: "Hospitality school awards", b: "Swiss hospitality schools offer scholarships and industry-sponsored placements." },
  { t: "Need & diversity grants", b: "Selected institutions provide need-based and regional diversity support." },
];

export default function ScholarshipsPage() {
  return (
    <>
      <section className="border-b border-line bg-cloud">
        <div className="container-x py-14">
          <p className="eyebrow">Funding</p>
          <h1 className="mt-3 text-4xl font-bold">Scholarships in Switzerland</h1>
          <p className="mt-3 max-w-2xl text-ink-muted">
            Switzerland offers a range of government, university and merit-based scholarships
            for international students. Our team helps you find and apply for the ones you qualify for.
          </p>
        </div>
      </section>
      <section className="container-x py-12">
        <div className="grid gap-5 sm:grid-cols-2">
          {TYPES.map((s) => (
            <div key={s.t} className="card p-6">
              <h3 className="text-base font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-ink-muted">{s.b}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl bg-ink p-8 text-white">
          <h2 className="text-2xl font-bold text-white">Find scholarships you qualify for</h2>
          <p className="mt-2 max-w-xl text-white/80">
            Share your profile and we&apos;ll shortlist scholarships and guide your applications — free of charge.
          </p>
          <Link href="/contact" className="btn bg-white text-ink hover:bg-white/90 mt-5">Get scholarship help</Link>
        </div>
      </section>
    </>
  );
}
