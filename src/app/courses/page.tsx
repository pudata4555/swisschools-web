import type { Metadata } from "next";
import { getAllCourses } from "@/lib/api";
import CourseFinder from "@/components/CourseFinder";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Find a Course",
  description:
    "Search Swiss degree programmes by subject, level and city. Bachelor, Master, MBA and doctoral programmes for international students.",
};

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <>
      <section className="border-b border-line bg-cloud">
        <div className="container-x py-14">
          <p className="eyebrow">Course finder</p>
          <h1 className="mt-3 text-4xl font-bold">Find your programme</h1>
          <p className="mt-3 max-w-2xl text-ink-muted">
            Search {courses.length > 0 ? courses.length : "hundreds of"} Swiss
            programmes. Filter by level and search by subject, university or city.
          </p>
        </div>
      </section>

      <section className="container-x py-12">
        <CourseFinder courses={courses} />
      </section>
    </>
  );
}
