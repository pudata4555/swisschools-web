import Link from "next/link";

const COLS = [
  {
    title: "Explore",
    links: [
      { href: "/universities", label: "Universities" },
      { href: "/courses", label: "Courses" },
      { href: "/scholarships", label: "Scholarships" },
      { href: "/guides", label: "Guides & blog" },
    ],
  },
  {
    title: "Tools",
    links: [
      { href: "/tools/cost-calculator", label: "Cost calculator" },
      { href: "/tools/eligibility", label: "Eligibility checker" },
      { href: "/tools/compare", label: "Compare universities" },
      { href: "/tools", label: "All tools" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/contact", label: "Contact & support" },
      { href: "/login", label: "Student login" },
      { href: "/register", label: "Create account" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-cloud">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-white.png" alt="SwisSchools" className="h-9 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-ink-muted">
            Guidance for international students who want to study in Switzerland —
            curated programmes, transparent costs and step-by-step application support.
          </p>
          <div className="mt-4 text-sm text-ink-muted">
            <a href="mailto:contact@swisschools.com" className="block hover:text-brand">contact@swisschools.com</a>
            <a href="tel:+41783336264" className="block hover:text-brand">+41 78 333 62 64</a>
          </div>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-ink">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-ink-muted hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-soft sm:flex-row">
          <span>© {new Date().getFullYear()} SwisSchools. All rights reserved.</span>
          <span>Study in Switzerland · For international students</span>
        </div>
      </div>
    </footer>
  );
}
