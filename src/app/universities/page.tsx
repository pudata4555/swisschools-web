import type { Metadata } from "next";
import { getUniversities } from "@/lib/api";
import UniversityCard from "@/components/UniversityCard";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Swiss Universities",
  description:
    "Browse Swiss universities and higher education institutions — public universities, universities of applied sciences and hospitality schools.",
};

export default async function UniversitiesPage() {
  const universities = await getUniversities(100);

  return (
    <>
      <section className="border-b border-line bg-cloud">
        <div className="container-x py-14">
          <p className="eyebrow">Institutions</p>
          <h1 className="mt-3 text-4xl font-bold">Swiss universities</h1>
          <p className="mt-3 max-w-2xl text-ink-muted">
            Explore {universities.length} institutions across Switzerland — from public
            research universities and universities of applied sciences to world-renowned
            hospitality schools.
          </p>
        </div>
      </section>

      <section className="container-x py-12">
        {universities.length === 0 ? (
          <p className="text-ink-muted">Universities are being updated. Please check back shortly.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {universities.map((u) => (
              <UniversityCard key={u._id} u={u} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
