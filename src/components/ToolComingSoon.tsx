import Link from "next/link";

export default function ToolComingSoon({ title, blurb }: { title: string; blurb: string }) {
  return (
    <section className="container-x py-20">
      <div className="mx-auto max-w-xl text-center">
        <span className="chip">Coming soon</span>
        <h1 className="mt-4 text-3xl font-bold">{title}</h1>
        <p className="mt-3 text-ink-muted">{blurb}</p>
        <p className="mt-6 text-sm text-ink-soft">
          This tool is in development. In the meantime, our counsellors can do this with you.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Link href="/contact" className="btn-primary">Talk to a counsellor</Link>
          <Link href="/tools" className="btn-outline">All tools</Link>
        </div>
      </div>
    </section>
  );
}
