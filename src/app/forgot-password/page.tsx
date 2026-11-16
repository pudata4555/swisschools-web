import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Reset password" };

export default function ForgotPasswordPage() {
  return (
    <section className="container-x flex justify-center py-16">
      <div className="w-full max-w-md">
        <h1 className="text-center text-3xl font-bold">Reset your password</h1>
        <p className="mt-2 text-center text-sm text-ink-muted">
          Enter your email and we&apos;ll send you reset instructions.
        </p>
        <form className="card mt-8 space-y-4 p-6">
          <input type="email" placeholder="Email address" className="w-full rounded-lg border border-line px-3 py-2.5 text-sm outline-none focus:border-brand" />
          <button type="button" className="btn-primary w-full">Send reset link</button>
        </form>
        <p className="mt-5 text-center text-sm text-ink-muted">
          <Link href="/login" className="font-semibold text-brand">Back to log in</Link>
        </p>
      </div>
    </section>
  );
}
