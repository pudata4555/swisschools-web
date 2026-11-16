import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/api";
import { formatDate } from "@/lib/format";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const b = await getBlogBySlug(params.slug);
  if (!b) return { title: "Guide" };
  return { title: b.title, description: b.excerpt };
}

export default async function GuideDetail({ params }: { params: { slug: string } }) {
  const b = await getBlogBySlug(params.slug);
  if (!b) notFound();

  const html = b.content && /<[a-z][\s\S]*>/i.test(b.content);

  return (
    <article className="container-x max-w-3xl py-14">
      <nav className="text-sm text-ink-soft">
        <Link href="/guides" className="hover:text-brand">Guides</Link> / {b.title}
      </nav>
      <h1 className="mt-4 text-4xl font-bold leading-tight">{b.title}</h1>
      <p className="mt-3 text-sm text-ink-soft">{formatDate(b.createdAt)}</p>
      {b.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={b.image} alt={b.title} className="mt-8 w-full rounded-2xl object-cover" />
      )}
      <div className="mt-8 text-[15px] leading-relaxed text-ink-muted">
        {html ? (
          <div className="prose-rich" dangerouslySetInnerHTML={{ __html: b.content! }} />
        ) : (
          (b.content || b.excerpt || "").split("\n").filter(Boolean).map((p, i) => (
            <p key={i} className="mb-4">{p}</p>
          ))
        )}
      </div>

      <div className="mt-12 rounded-2xl bg-cloud p-8 text-center">
        <h2 className="text-xl font-bold">Thinking about studying in Switzerland?</h2>
        <p className="mt-2 text-ink-muted">Book a free counselling session with our team.</p>
        <Link href="/contact" className="btn-primary mt-5">Get started</Link>
      </div>
    </article>
  );
}
