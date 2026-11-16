import type { Metadata } from "next";
import Link from "next/link";
import { getBlogs } from "@/lib/api";
import { formatDate } from "@/lib/format";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Guides & Blog",
  description: "Guides and articles on studying in Switzerland — universities, costs, scholarships, visas and student life.",
};

export default async function GuidesPage() {
  const blogs = await getBlogs(30);
  return (
    <>
      <section className="border-b border-line bg-cloud">
        <div className="container-x py-14">
          <p className="eyebrow">Guides & blog</p>
          <h1 className="mt-3 text-4xl font-bold">Study-in-Switzerland insights</h1>
          <p className="mt-3 max-w-2xl text-ink-muted">
            Practical articles on universities, costs, scholarships, the student visa and life in Switzerland.
          </p>
        </div>
      </section>
      <section className="container-x py-12">
        {blogs.length === 0 ? (
          <p className="text-ink-muted">New articles are on the way. Check back soon.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {blogs.map((b) => (
              <Link key={b._id} href={`/guides/${b.slug}`} className="card card-hover group p-6">
                <span className="text-xs text-ink-soft">{formatDate(b.createdAt)}</span>
                <h2 className="mt-2 line-clamp-2 text-lg font-semibold group-hover:text-brand">{b.title}</h2>
                {b.excerpt && <p className="mt-2 line-clamp-3 text-sm text-ink-muted">{b.excerpt}</p>}
                <span className="mt-4 inline-block text-sm font-semibold text-brand">Read more →</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
