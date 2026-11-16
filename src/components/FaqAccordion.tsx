"use client";

import { useState } from "react";

export interface Faq {
  q: string;
  a: string;
}

export default function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-medium text-ink">{it.q}</span>
              <span className={`text-brand transition-transform ${isOpen ? "rotate-45" : ""}`}>＋</span>
            </button>
            {isOpen && <p className="px-5 pb-5 text-sm leading-relaxed text-ink-muted">{it.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
