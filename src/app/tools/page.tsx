import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools",
  description: "Free tools for students planning to study in Switzerland — cost calculator, eligibility checker, converters and comparison.",
};

const TOOLS = [
  { href: "/tools/cost-calculator", title: "Cost calculator", body: "Estimate tuition and living costs in CHF and INR.", ready: true },
  { href: "/tools/eligibility", title: "Eligibility checker", body: "See where your marks and test scores fit.", ready: false },
  { href: "/tools/cgpa-converter", title: "CGPA converter", body: "Indian percentage ⇄ ECTS / Swiss scale.", ready: false },
  { href: "/tools/english-score", title: "English score converter", body: "IELTS ⇄ TOEFL ⇄ PTE equivalence.", ready: false },
  { href: "/tools/profile-evaluation", title: "Profile evaluation", body: "Answer a few questions for a tailored shortlist.", ready: false },
  { href: "/tools/compare", title: "Compare universities", body: "Weigh institutions side by side.", ready: false },
];

export default function ToolsPage() {
  return (
    <>
      <section className="border-b border-line bg-cloud">
        <div className="container-x py-14">
          <p className="eyebrow">Free student tools</p>
          <h1 className="mt-3 text-4xl font-bold">Plan your studies in Switzerland</h1>
          <p className="mt-3 max-w-2xl text-ink-muted">
            Practical tools to estimate costs, check eligibility and compare your options.
          </p>
        </div>
      </section>
      <section className="container-x py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href} className="card card-hover group p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold group-hover:text-brand">{t.title}</h3>
                {!t.ready && <span className="text-[11px] font-semibold text-ink-soft">Soon</span>}
              </div>
              <p className="mt-2 text-sm text-ink-muted">{t.body}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand">Open →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
