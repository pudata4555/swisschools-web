"use client";

import { useState } from "react";

function n(v: string): number {
  const x = parseFloat(v.replace(/[^0-9.]/g, ""));
  return isNaN(x) ? 0 : x;
}

export default function CostCalculator() {
  const [tuition, setTuition] = useState("25000");
  const [months, setMonths] = useState("12");
  const [living, setLiving] = useState("2000");
  const [insurance, setInsurance] = useState("150");
  const [rate, setRate] = useState("95");

  const livingTotal = n(months) * n(living);
  const insuranceTotal = n(months) * n(insurance);
  const chf = n(tuition) + livingTotal + insuranceTotal;
  const inr = chf * n(rate);

  const fmt = (x: number) => Math.round(x).toLocaleString();

  const rows: [string, number][] = [
    ["Tuition", n(tuition)],
    [`Living (${n(months)} × CHF ${n(living)})`, livingTotal],
    [`Insurance (${n(months)} × CHF ${n(insurance)})`, insuranceTotal],
  ];

  const field = (label: string, val: string, set: (v: string) => void, suffix?: string) => (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</span>
      <div className="mt-1.5 flex items-center rounded-lg border border-line focus-within:border-brand">
        <input
          value={val}
          onChange={(e) => set(e.target.value)}
          inputMode="numeric"
          className="w-full rounded-lg px-3 py-2.5 text-sm outline-none"
        />
        {suffix && <span className="pr-3 text-sm text-ink-soft">{suffix}</span>}
      </div>
    </label>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card space-y-4 p-6">
        {field("Tuition per year", tuition, setTuition, "CHF")}
        <div className="grid grid-cols-2 gap-4">
          {field("Months", months, setMonths)}
          {field("Living / month", living, setLiving, "CHF")}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {field("Insurance / month", insurance, setInsurance, "CHF")}
          {field("CHF → INR rate", rate, setRate, "₹")}
        </div>
        <p className="text-xs text-ink-soft">
          Swiss visa guidance expects proof of roughly CHF 21,000–25,000 per year. Adjust the figures to match your programme.
        </p>
      </div>

      <div className="card flex flex-col justify-between bg-ink p-6 text-white">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Estimated annual cost</p>
          <p className="mt-2 text-4xl font-bold">CHF {fmt(chf)}</p>
          <p className="mt-1 text-lg text-brand-100">≈ ₹ {fmt(inr)}</p>
          <dl className="mt-6 space-y-2 border-t border-white/10 pt-4 text-sm">
            {rows.map(([l, v]) => (
              <div key={l} className="flex justify-between gap-4 text-white/70">
                <dt>{l}</dt>
                <dd>CHF {fmt(v)}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-6 text-xs text-white/50">
          Estimate only. Actual costs vary by city, university and lifestyle. Not financial advice.
        </p>
      </div>
    </div>
  );
}
