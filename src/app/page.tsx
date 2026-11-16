import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import { getUniversities, getCourses, getBlogs } from "@/lib/api";
import UniversityCard from "@/components/UniversityCard";
import CourseCard from "@/components/CourseCard";
import FaqAccordion, { Faq } from "@/components/FaqAccordion";
import { formatDate } from "@/lib/format";

export const revalidate = 300;

const FAQS: Faq[] = [
  { q: "Why should I choose Switzerland for higher education?", a: "Switzerland is known for its world-class education system, high academic standards, multicultural environment, and strong career opportunities in global industries like hospitality, business, engineering, finance and diplomacy." },
  { q: "What languages are the programmes taught in?", a: "Most Bachelor and Master programmes at private universities and business schools are offered in English. Some public universities teach in German, French or Italian depending on the region." },
  { q: "What is the cost of living for students?", a: "Roughly CHF 1,500–2,500 per month, covering accommodation, food, transport and insurance." },
  { q: "Are scholarships available for international students?", a: "Yes — many universities and the Swiss Government offer merit-based scholarships for international students." },
  { q: "What visa do I need to study in Switzerland?", a: "A Swiss Student Visa (Type D) is required for programmes longer than three months. You must show proof of roughly CHF 21,000–25,000 per year for living expenses and tuition." },
  { q: "Can I work while studying?", a: "Yes — international students can work up to 15 hours per week during term and full-time during holidays, with the required permission." },
];

const VALUE_PROPS = [
  { title: "Explore study programmes", body: "Discover leading opportunities across business, hospitality, engineering, finance and technology to match your goals.", icon: "🎓" },
  { title: "University guidance", body: "Personalised guidance on programmes, entry requirements, tuition fees and admission options at Swiss institutions.", icon: "🏛" },
  { title: "Admission support", body: "Help at every step — document preparation, applications, scholarships and student-visa documentation.", icon: "✅" },
];

export default async function HomePage() {
  const [universities, { courses }, blogs] = await Promise.all([
    getUniversities(8),
    getCourses(8),
    getBlogs(3),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-white">
        <HeroVideo />
        {/* Left-weighted overlay: keeps text readable while letting the video show */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-ink/20" />
        <div className="container-x relative py-24 sm:py-32">
          <p className="eyebrow text-brand-100">Your Swiss education journey starts here</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.1] text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
            Discover your future in <span className="text-brand-100">Switzerland</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
            Explore Swiss universities, English-taught programmes, tuition and costs,
            scholarships and the student visa — with free guidance built for
            international students.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/courses" className="btn-primary">Explore programmes</Link>
            <Link href="/contact" className="btn bg-white text-ink hover:bg-white/90">Book free counselling</Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
            <span><strong className="text-white">30+</strong> Swiss universities</span>
            <span><strong className="text-white">600+</strong> programmes</span>
            <span><strong className="text-white">English</strong>-taught options</span>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="container-x -mt-10 relative z-10 grid gap-5 sm:grid-cols-3">
        {VALUE_PROPS.map((v) => (
          <div key={v.title} className="card p-6">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-xl">{v.icon}</div>
            <h3 className="mt-4 text-base font-semibold">{v.title}</h3>
            <p className="mt-2 text-sm text-ink-muted">{v.body}</p>
          </div>
        ))}
      </section>

      {/* WHY SWITZERLAND */}
      <section className="container-x py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Your trusted guide</p>
            <h2 className="mt-3 text-3xl font-bold">Higher education in Switzerland, made simple</h2>
            <p className="mt-4 text-ink-muted">
              Switzerland offers an exceptional combination of academic excellence,
              international exposure, innovation and career-focused education. We help
              you explore opportunities that align with your qualifications, interests
              and professional ambitions.
            </p>
            <p className="mt-3 text-ink-muted">
              From identifying suitable universities and programmes to preparing
              applications, understanding admission requirements and organising visa
              documentation, we simplify each step.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/about" className="btn-outline">About us</Link>
              <Link href="/guides" className="btn-ghost">Read our guides</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Safe & multicultural", "Among the world's safest countries, with English, German, French and Italian spoken."],
              ["Globally ranked", "Home to ETH Zurich, EPFL and world-leading hospitality schools."],
              ["Work while studying", "Up to 15 hrs/week in term, full-time in holidays."],
              ["Post-study stay", "6-month job-search visa after graduation."],
            ].map(([t, b]) => (
              <div key={t} className="card p-5">
                <h4 className="text-sm font-semibold">{t}</h4>
                <p className="mt-2 text-xs text-ink-muted">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED UNIVERSITIES */}
      {universities.length > 0 && (
        <section className="bg-cloud py-20">
          <div className="container-x">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Institutions</p>
                <h2 className="mt-3 text-3xl font-bold">Featured Swiss universities</h2>
              </div>
              <Link href="/universities" className="hidden btn-outline sm:inline-flex">All universities</Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {universities.slice(0, 8).map((u) => (
                <UniversityCard key={u._id} u={u} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* POPULAR COURSES */}
      {courses.length > 0 && (
        <section className="container-x py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Programmes</p>
              <h2 className="mt-3 text-3xl font-bold">Popular courses</h2>
            </div>
            <Link href="/courses" className="hidden btn-outline sm:inline-flex">Browse all courses</Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {courses.slice(0, 8).map((c) => (
              <CourseCard key={c._id} c={c} />
            ))}
          </div>
        </section>
      )}

      {/* TOOLS TEASER */}
      <section className="bg-ink py-20 text-white">
        <div className="container-x">
          <p className="eyebrow text-brand-100">Free student tools</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold">Plan your move with confidence</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Cost calculator", "Tuition + living costs in CHF and INR.", "/tools/cost-calculator"],
              ["Eligibility checker", "See where your marks and scores fit.", "/tools/eligibility"],
              ["CGPA converter", "Indian percentage ⇄ ECTS / Swiss scale.", "/tools/cgpa-converter"],
              ["English score converter", "IELTS ⇄ TOEFL ⇄ PTE equivalence.", "/tools/english-score"],
              ["Profile evaluation", "Get a shortlist that fits your profile.", "/tools/profile-evaluation"],
              ["Compare universities", "Weigh options side by side.", "/tools/compare"],
            ].map(([t, b, href]) => (
              <Link key={href} href={href} className="group rounded-2xl border border-white/15 bg-white/[0.07] p-5 transition-colors hover:border-white/30 hover:bg-white/[0.12]">
                <h3 className="text-base font-semibold text-white group-hover:text-brand-100">{t}</h3>
                <p className="mt-1.5 text-sm text-white/75">{b}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      {blogs.length > 0 && (
        <section className="container-x py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Guides & insights</p>
              <h2 className="mt-3 text-3xl font-bold">Latest from our blog</h2>
            </div>
            <Link href="/guides" className="hidden btn-outline sm:inline-flex">All articles</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {blogs.map((b) => (
              <Link key={b._id} href={`/guides/${b.slug}`} className="card card-hover group p-6">
                <span className="text-xs text-ink-soft">{formatDate(b.createdAt)}</span>
                <h3 className="mt-2 line-clamp-2 text-lg font-semibold group-hover:text-brand">{b.title}</h3>
                {b.excerpt && <p className="mt-2 line-clamp-3 text-sm text-ink-muted">{b.excerpt}</p>}
                <span className="mt-4 inline-block text-sm font-semibold text-brand">Read more →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-cloud py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold">Frequently asked questions</h2>
            <p className="mt-4 text-ink-muted">
              Everything you need to know about studying in Switzerland. Still have
              questions? <Link href="/contact" className="font-semibold text-brand">Talk to a counsellor →</Link>
            </p>
          </div>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-20">
        <div className="relative overflow-hidden rounded-2xl bg-brand px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-bold text-white">Ready to start your Swiss journey?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Book a free counselling session and get a personalised plan for your
            application, scholarships and visa.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn bg-white text-brand hover:bg-white/90">Book free counselling</Link>
            <a href="https://wa.me/41783336264" className="btn border border-white/40 text-white hover:bg-white/10">WhatsApp us</a>
          </div>
        </div>
      </section>
    </>
  );
}
