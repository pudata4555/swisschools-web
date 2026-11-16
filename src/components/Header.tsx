"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/universities", label: "Universities" },
  { href: "/courses", label: "Courses" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/tools", label: "Tools" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="hidden border-b border-line bg-ink text-white sm:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <span>Study in Switzerland — guidance for international students</span>
          <div className="flex items-center gap-4">
            <a href="tel:+41783336264" className="hover:text-brand-100">+41 78 333 62 64</a>
            <a href="mailto:contact@swisschools.com" className="hover:text-brand-100">contact@swisschools.com</a>
          </div>
        </div>
      </div>

      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="SwisSchools — Study in Switzerland" className="h-9 w-auto sm:h-10" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active ? "text-brand" : "text-ink-muted hover:text-ink"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/login" className="btn-ghost text-sm">Log in</Link>
          <Link href="/contact" className="btn-primary text-sm">Free counselling</Link>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-line lg:hidden"
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <div className="container-x flex flex-col py-3">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-cloud"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 px-1">
              <Link href="/login" onClick={() => setOpen(false)} className="btn-outline flex-1 text-sm">Log in</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary flex-1 text-sm">Counselling</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
