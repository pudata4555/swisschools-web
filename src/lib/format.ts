// Fix mojibake from the legacy data (UTF-8 read as Latin-1) and tidy values.
const FIXES: [RegExp, string][] = [
  [/�/g, "é"], // best-effort for the common replacement-char case (Neuch�tel)
];

export function clean(input?: string | null): string {
  if (!input) return "";
  let s = input;
  for (const [re, rep] of FIXES) s = s.replace(re, rep);
  return s.trim();
}

// Normalise the messy free-text level values into canonical buckets.
export function normalizeLevel(level?: string): string {
  const l = (level || "").toLowerCase();
  if (l.includes("phd") || l.includes("doctor")) return "Doctorate";
  if (l.includes("mba")) return "MBA";
  if (l.includes("master")) return "Master";
  if (l.includes("bachelor")) return "Bachelor";
  if (l.includes("diploma")) return "Diploma";
  if (l.includes("certificate")) return "Certificate";
  if (l.includes("foundation")) return "Foundation";
  if (l.includes("minor")) return "Minor";
  return level ? clean(level) : "Programme";
}

export function tuitionLabel(c: {
  tuition?: { amount?: number | null; currency?: string; period?: string; onRequest?: boolean };
  tuitionFeePerSemester?: number | string;
  currency?: string;
}): string {
  const t = c.tuition;
  if (t && typeof t.amount === "number" && t.amount > 0) {
    return `${t.currency || "CHF"} ${t.amount.toLocaleString()}${t.period ? " / " + t.period : ""}`;
  }
  if (typeof c.tuitionFeePerSemester === "number" && c.tuitionFeePerSemester > 0) {
    return `${c.currency || "CHF"} ${c.tuitionFeePerSemester.toLocaleString()} / semester`;
  }
  return "Tuition on request";
}

export function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
