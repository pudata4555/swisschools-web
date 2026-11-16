import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Log in" };

const input = "w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:border-brand";

export default function LoginPage() {
  return (
    <section className="container-x flex justify-center py-16">
      <div className="w-full max-w-md">
        <h1 className="text-center text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-center text-sm text-ink-muted">Log in to track your applications and documents.</p>
        <form className="card mt-8 space-y-4 p-6">
          <input type="email" placeholder="Email or username" className={input} />
          <input type="password" placeholder="Password" className={input} />
          <button type="button" className="btn-primary w-full">Log in</button>
          <p className="text-center text-xs text-ink-soft">
            <Link href="/forgot-password" className="hover:text-brand">Forgot password?</Link>
          </p>
        </form>
        <p className="mt-5 text-center text-sm text-ink-muted">
          New here? <Link href="/register" className="font-semibold text-brand">Create an account</Link>
        </p>
      </div>
    </section>
  );
}
