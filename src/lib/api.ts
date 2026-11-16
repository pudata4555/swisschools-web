import type { Blog, Course, CourseFilters, University } from "./types";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://api.swisschools.com";

type FetchOpts = { revalidate?: number };

async function getJSON<T>(path: string, opts: FetchOpts = {}): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      next: { revalidate: opts.revalidate ?? 300 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getUniversities(limit = 60): Promise<University[]> {
  const data = await getJSON<{ universities: University[] }>(
    `/api/universities?limit=${limit}`
  );
  return data?.universities ?? [];
}

export async function getUniversity(id: string): Promise<University | null> {
  const data = await getJSON<{ university: University }>(
    `/api/universities/${id}`
  );
  return data?.university ?? null;
}

export async function getCourses(limit = 24): Promise<{ courses: Course[]; total: number }> {
  const data = await getJSON<{ courses: Course[]; meta?: { total: number } }>(
    `/api/courses?limit=${limit}`
  );
  return { courses: data?.courses ?? [], total: data?.meta?.total ?? 0 };
}

export async function getAllCourses(): Promise<Course[]> {
  const data = await getJSON<{ courses: Course[] }>(`/api/courses?limit=1000`);
  return data?.courses ?? [];
}

export async function getCourse(id: string): Promise<Course | null> {
  const data = await getJSON<Course | { course: Course }>(`/api/courses/${id}`);
  if (!data) return null;
  return (data as { course?: Course }).course ?? (data as Course);
}

export async function getCourseFilters(): Promise<CourseFilters | null> {
  return getJSON<CourseFilters>(`/api/courses/filters`);
}

export async function getBlogs(limit = 10): Promise<Blog[]> {
  const data = await getJSON<{ blogs: Blog[] }>(`/api/blogs?limit=${limit}`);
  return data?.blogs ?? [];
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const data = await getJSON<{ blogs: Blog[] }>(
    `/api/blogs?slug=${encodeURIComponent(slug)}`
  );
  return data?.blogs?.[0] ?? null;
}
