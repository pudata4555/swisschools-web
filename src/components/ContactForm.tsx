"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to backend contact/applications endpoint during integration phase.
    setSent(true);
  };

  if (sent) {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-xl text-brand">✓</div>
        <h3 className="mt-4 text-lg font-semibold">Thanks, {form.name || "there"}!</h3>
        <p className="mt-2 text-sm text-ink-muted">
          We&apos;ve received your request. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  const input = "w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:border-brand";

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <input required value={form.name} onChange={set("name")} placeholder="Full name" className={input} />
        <input required type="email" value={form.email} onChange={set("email")} placeholder="Email address" className={input} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input value={form.phone} onChange={set("phone")} placeholder="Phone / WhatsApp" className={input} />
        <input value={form.subject} onChange={set("subject")} placeholder="Subject" className={input} />
      </div>
      <textarea required value={form.message} onChange={set("message")} placeholder="How can we help?" rows={5} className={input} />
      <button type="submit" className="btn-primary w-full">Send request</button>
      <p className="text-center text-xs text-ink-soft">
        By submitting you agree to be contacted about your enquiry.
      </p>
    </form>
  );
}
