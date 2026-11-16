import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Free Counselling",
  description: "Get free counselling for studying in Switzerland. Contact SwisSchools by phone, email or WhatsApp.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line bg-cloud">
        <div className="container-x py-14">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 text-4xl font-bold">Book free counselling</h1>
          <p className="mt-3 max-w-2xl text-ink-muted">
            Tell us about your goals and we&apos;ll help you plan your application, scholarships and visa — at no cost.
          </p>
        </div>
      </section>

      <section className="container-x grid gap-10 py-14 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5">
          <div className="card p-6">
            <h3 className="text-base font-semibold">Talk to us</h3>
            <div className="mt-4 space-y-3 text-sm">
              <a href="tel:+41783336264" className="flex items-center gap-3 text-ink-muted hover:text-brand">
                <span>📞</span> +41 78 333 62 64
              </a>
              <a href="mailto:contact@swisschools.com" className="flex items-center gap-3 text-ink-muted hover:text-brand">
                <span>✉️</span> contact@swisschools.com
              </a>
              <a href="https://wa.me/41783336264" className="flex items-center gap-3 text-ink-muted hover:text-brand">
                <span>💬</span> Chat on WhatsApp
              </a>
            </div>
          </div>
          <a href="https://wa.me/41783336264" className="btn-primary w-full">Request a callback on WhatsApp</a>
          <p className="text-xs text-ink-soft">
            We typically respond within one business day.
          </p>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
