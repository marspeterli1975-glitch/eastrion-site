"use client";

import Link from "next/link";
import { useState } from "react";

type PlanType = "pro" | "execution";

export default function RiskAtlasPricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<PlanType | null>(null);
  const [error, setError] = useState("");

  const handleCheckout = async (plan: PlanType) => {
    try {
      setError("");
      setLoadingPlan(plan);

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to create checkout session.");
      }

      if (!data?.url) {
        throw new Error("Missing checkout URL.");
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to start checkout. Please try again."
      );
      setLoadingPlan(null);
    }
  };

  const isLoading = (plan: PlanType) => loadingPlan === plan;

  return (
    <main className="min-h-screen bg-[#020b2a] text-white">
      <section className="border-b border-white/10 bg-gradient-to-r from-[#020b2a] via-[#04144d] to-[#0d235f]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200">
                RiskAtlas · Paid conversion layer
              </div>

              <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">
                Supply Chain Risk Assessment Report
              </h1>

              <p className="mt-4 max-w-2xl text-slate-400">
                A structured, consulting-style risk assessment designed to support real operational and commercial decisions across sourcing, logistics, and cross-border execution.
              </p>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                RiskAtlas converts an initial supply chain signal into a structured,
                decision-ready report. Choose the right paid layer below to unlock
                consulting-style analysis or move into execution-grade support.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => handleCheckout("pro")}
                  disabled={loadingPlan !== null}
                  className="rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading("pro") ? "Redirecting..." : "Unlock Full Report · US$49"}
                </button>

                <button
                  onClick={() => handleCheckout("execution")}
                  disabled={loadingPlan !== null}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading("execution")
                    ? "Redirecting..."
                    : "Execution Upgrade · US$149"}
                </button>

                <Link
                  href="/riskatlas/report"
                  className="rounded-2xl border border-white/10 bg-transparent px-6 py-4 text-base font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  Back to Risk Preview
                </Link>
              </div>

              {error ? (
                <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-400">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  Stripe checkout session
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  Success URL with session_id
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  Paid unlock flow
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-900/10">
              <div className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Commercial flow
              </div>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-white">
                One pricing page, two paid paths
              </h2>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-cyan-400/20 bg-[#0f172a] p-5">
                  <div className="text-sm font-semibold text-cyan-300">
                    Step 1 · US$49
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    Professional Report
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Start with a structured commercial risk view: score interpretation, factor breakdown,
                    advisory layer, and a professional PDF report for internal alignment.
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-400/20 bg-[#0f172a] p-5">
                  <div className="text-sm font-semibold text-amber-300">
                    Step 2 · US$149
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    Execution Upgrade
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Move beyond diagnosis with execution prioritization, stronger actionability,
                    and load-planning linkage for real shipment and operating cases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-[#0f172a] p-7">
              <div className="inline-flex rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200">
                Pro layer
              </div>
              <h3 className="mt-5 text-3xl font-semibold text-white">
                Professional Report ($49)
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Designed for fast, structured risk interpretation before deeper execution work begins.
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                <li>✓ Structured risk scoring across geopolitical, logistics, supplier, and execution dimensions</li>
                <li>✓ Consulting-style advisory layer: Strategic / Tactical / Execution / Risk</li>
                <li>✓ Clear risk exposure classification (Low → Critical)</li>
                <li>✓ Practical execution guidance for supply chain decision-making</li>
                <li>✓ Professional PDF report for internal use and stakeholder alignment</li>
              </ul>
              <button
                onClick={() => handleCheckout("pro")}
                disabled={loadingPlan !== null}
                className="mt-8 w-full rounded-2xl bg-cyan-400 px-5 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading("pro") ? "Redirecting..." : "Buy Professional Report"}
              </button>

              <p className="mt-6 text-xs leading-6 text-slate-500">
                This report is designed as a decision-support tool. It does not constitute legal, financial, or investment advice.
                Users should integrate the output with their own contractual frameworks and operational judgment.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-b from-emerald-500/10 to-cyan-500/10 p-7 shadow-xl shadow-emerald-900/10">
              <div className="inline-flex rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200">
                Best starting point
              </div>
              <h3 className="mt-5 text-3xl font-semibold text-white">
                Choose the right layer for your decision stage
              </h3>
              <p className="mt-5 text-sm leading-7 text-slate-200">
                Start with the Professional Report when you need a structured risk view.
                Upgrade to the Execution layer when shipment feasibility, load planning,
                and operational controls need to be considered together.
              </p>
              <div className="mt-8 rounded-2xl border border-white/10 bg-[#0f172a]/60 p-5 text-sm leading-7 text-slate-300">
                This keeps conversion clean:
                <br />
                Initial signal → paid clarity → execution upgrade when needed
              </div>
              <Link
                href="/riskatlas/report"
                className="mt-8 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base font-medium text-white transition hover:bg-white/10"
              >
                Back to Risk Preview
              </Link>
            </div>

            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-7">
              <div className="inline-flex rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200">
                Execution layer
              </div>
              <h3 className="mt-5 text-3xl font-semibold text-white">
                Execution Upgrade ($149)
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Built for users moving from assessment into execution, where shipment feasibility,
                operational control, and load-planning linkage matter.
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-200">
                <li>✓ Everything included in the Professional Report</li>
                <li>✓ Additional execution sensitivity note for operational risk exposure</li>
                <li>✓ Operational control priorities for shipment readiness and continuity</li>
                <li>✓ Load Planning linkage for packing, routing, and handling feasibility</li>
                <li>✓ Stronger execution-oriented PDF output for internal coordination</li>
              </ul>
              <button
                onClick={() => handleCheckout("execution")}
                disabled={loadingPlan !== null}
                className="mt-8 w-full rounded-2xl bg-white px-5 py-4 text-base font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading("execution") ? "Redirecting..." : "Buy Execution Upgrade"}
              </button>

              <p className="mt-6 text-xs leading-6 text-slate-500">
                This layer is intended to support operational preparation and execution planning.
                It does not replace legal review, commercial negotiation, logistics validation,
                or professional engineering judgment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 p-8">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-cyan-300">
                  Start here
                </div>
                <h2 className="mt-4 text-4xl font-semibold text-white">
                  Choose the right paid entry point.
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
                  Use Professional if you need structured clarity first. Use
                  Execution Upgrade if you already know the case needs deeper
                  execution support.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => handleCheckout("pro")}
                  disabled={loadingPlan !== null}
                  className="rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading("pro") ? "Redirecting..." : "Unlock Full Report"}
                </button>

                <button
                  onClick={() => handleCheckout("execution")}
                  disabled={loadingPlan !== null}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading("execution")
                    ? "Redirecting..."
                    : "Upgrade to Execution Layer"}
                </button>

                <Link
                  href="/contact"
                  className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-6 py-4 text-center text-base font-semibold text-emerald-200 transition hover:bg-emerald-500/15"
                >
                  Contact Eastrion for service support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}