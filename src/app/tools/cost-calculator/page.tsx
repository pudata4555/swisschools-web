import type { Metadata } from "next";
import CostCalculator from "@/components/CostCalculator";

export const metadata: Metadata = {
  title: "Cost Calculator (CHF / INR)",
  description: "Estimate the yearly cost of studying in Switzerland — tuition, living and insurance — in CHF and Indian Rupees.",
};

export default function Page() {
  return (
    <>
      <section className="border-b border-line bg-cloud">
        <div className="container-x py-14">
          <p className="eyebrow">Tools</p>
          <h1 className="mt-3 text-4xl font-bold">Cost of studying in Switzerland</h1>
          <p className="mt-3 max-w-2xl text-ink-muted">
            Estimate your yearly budget in CHF and INR. Adjust the figures to match your programme and city.
          </p>
        </div>
      </section>
      <section className="container-x py-12">
        <CostCalculator />
      </section>
    </>
  );
}
