import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Create account" };

const input = "w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:border-brand";

export default function RegisterPage() {
  return (
    <section className="container-x flex justify-center py-16">
      <div className="w-full max-w-md">
        <h1 className="text-center text-3xl font-bold">Create your account</h1>
        <p className="mt-2 text-center text-sm text-ink-muted">Save programmes and track your application.</p>
        <form className="card mt-8 space-y-4 p-6">
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="First name" className={input} />
            <input placeholder="Last name" className={input} />
          </div>
          <input type="email" placeholder="Email address" className={input} />
          <input placeholder="Username" className={input} />
          <div className="grid grid-cols-2 gap-4">
            <input type="password" placeholder="Password" className={input} />
            <input type="password" placeholder="Confirm password" className={input} />
          </div>
          <button type="button" className="btn-primary w-full">Register now</button>
        </form>
        <p className="mt-5 text-center text-sm text-ink-muted">
          Already have an account? <Link href="/login" className="font-semibold text-brand">Log in</Link>
        </p>
      </div>
    </section>
  );
}
