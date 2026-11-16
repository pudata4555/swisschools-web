import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUniversity, getAllCourses } from "@/lib/api";
import CourseCard from "@/components/CourseCard";
import { clean } from "@/lib/format";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const u = await getUniversity(params.id);
  if (!u) return { title: "University" };
  return { title: clean(u.universityName), description: clean(u.description?.replace(/<[^>]+>/g, " ")).slice(0, 160) };
}

export default async function UniversityDetail({ params }: { params: { id: string } }) {
  const [u, allCourses] = await Promise.all([getUniversity(params.id), getAllCourses()]);
  if (!u) notFound();

  const name = clean(u.universityName);
  const programmes = allCourses.filter(
    (c) => clean(c.universityName).toLowerCase() === name.toLowerCase()
  );

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        {u.universityImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={u.universityImage} alt={name} className="absolute inset-0 h-full w-full object-cover opacity-30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
        <div className="container-x relative py-20">
          <nav className="text-sm text-white/60">
            <Link href="/universities" className="hover:text-white">Universities</Link> / {name}
          </nav>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold">{name}</h1>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">Book counselling</Link>
            <a href="#programmes" className="btn bg-white text-ink hover:bg-white/90">View programmes ({programmes.length})</a>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-10 py-14 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h2 className="text-2xl font-bold">About {name}</h2>
          {u.description ? (
            <div
              className="prose-rich mt-4 text-ink-muted"
              dangerouslySetInnerHTML={{ __html: u.description }}
            />
          ) : (
            <p className="mt-4 text-ink-muted">A detailed profile for this institution is coming soon.</p>
          )}
        </div>
        <aside className="h-fit space-y-4">
          <div className="card p-6">
            <h3 className="text-base font-semibold">At a glance</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Location</dt>
                <dd className="text-right font-medium text-ink">Switzerland</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Programmes listed</dt>
                <dd className="text-right font-medium text-ink">{programmes.length}</dd>
              </div>
            </dl>
            <Link href="/contact" className="btn-primary mt-5 w-full">Get admission help</Link>
          </div>
        </aside>
      </section>

      <section id="programmes" className="bg-cloud py-14">
        <div className="container-x">
          <h2 className="text-2xl font-bold">Programmes at {name}</h2>
          {programmes.length === 0 ? (
            <p className="mt-4 text-ink-muted">Programme listings for this university are being updated.</p>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {programmes.map((c) => (
                <CourseCard key={c._id} c={c} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
