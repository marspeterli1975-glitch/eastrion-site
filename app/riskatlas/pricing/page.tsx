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
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
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
                decision-ready report. Start with paid clarity first, then move into
                execution-layer support only when shipment feasibility, route choice,
                and operating continuity need to be considered together.
              </p>

              <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm leading-7 text-emerald-200">
                Typical use case: exporters facing corridor volatility, supplier uncertainty,
                or execution-sensitive routes use the Professional Report first, then upgrade
                only when shipment planning and operating control require deeper support.
              </div>

              <div className="mt-3 text-sm leading-7 text-slate-300">
                Commonly used before supplier confirmation, route commitment, or execution-sensitive shipment planning.
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => handleCheckout("pro")}
                  disabled={loadingPlan !== null}
                  className="rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading("pro")
                    ? "Redirecting..."
                    : "Buy Professional Report → Get Instant Access"}
                </button>

                <button
                  onClick={() => handleCheckout("execution")}
                  disabled={loadingPlan !== null}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading("execution")
                    ? "Redirecting..."
                    : "Upgrade to Execution Layer → Start Planning"}
                </button>

                <Link
                  href="/riskatlas/report"
                  className="rounded-2xl border border-white/10 bg-transparent px-6 py-4 text-base font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  Back to Risk Preview
                </Link>
              </div>

              <div className="mt-4 text-sm leading-7 text-slate-400">
                Secure payment via Stripe. You can return at any time using the back arrow in the top-left corner of Stripe Checkout.
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
                    Start with structured clarity: quantify exposure, align internal decisions,
                    and identify where supplier, route, and execution risk may affect cost,
                    delivery, or contract confidence.
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
                    Move beyond diagnosis into execution control: add shipment feasibility,
                    operational prioritization, and load-planning linkage when real dispatch
                    and continuity decisions need stronger support.
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
            <div className="rounded-3xl border border-cyan-300/35 bg-[#0f172a] p-7 shadow-2xl shadow-cyan-950/20 ring-1 ring-cyan-400/10">
              <div className="inline-flex rounded-full bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-100">
                Most Popular · Best Starting Point
              </div>
              <h3 className="mt-5 text-3xl font-semibold text-white">
                Professional Report ($49)
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Built for fast, structured clarity before deeper execution work begins.
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                <li>✓ Identify high-risk supplier, route, logistics, and execution exposure in one structured view</li>
                <li>✓ Translate uncertainty into a consulting-style advisory layer for internal decision alignment</li>
                <li>✓ Clarify whether current exposure remains guarded, moderate, high, or critical before commitment</li>
                <li>✓ Reduce avoidable delay and coordination risk through clearer commercial visibility</li>
                <li>✓ Download a professional PDF report for internal review and stakeholder discussion</li>
              </ul>
              <button
                onClick={() => handleCheckout("pro")}
                disabled={loadingPlan !== null}
                className="mt-8 w-full rounded-2xl bg-cyan-400 px-5 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading("pro")
                  ? "Redirecting..."
                  : "Buy Professional Report → Get Instant Access"}
              </button>

              <p className="mt-3 text-xs leading-6 text-slate-400">
                Secure payment via Stripe. You can return at any time using the back arrow in the top-left corner.
              </p>

              <p className="mt-4 text-xs leading-6 text-emerald-200/90">
                Best starting point for exporters, sourcing teams, and logistics operators who need structured clarity first.
              </p>

              <p className="mt-6 text-xs leading-6 text-slate-500">
                This report is designed as a decision-support tool. It does not constitute legal, financial, or investment advice.
                Users should integrate the output with their own contractual frameworks and operational judgment.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-b from-emerald-500/10 to-cyan-500/10 p-7 shadow-xl shadow-emerald-900/10">
              <div className="inline-flex rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200">
                Recommended decision path
              </div>
              <h3 className="mt-5 text-3xl font-semibold text-white">
                Start with clarity. Upgrade when execution matters.
              </h3>
              <p className="mt-5 text-sm leading-7 text-slate-200">
                Most users should begin with the Professional Report to understand
                exposure clearly. Upgrade to the Execution layer only when shipment
                planning, route feasibility, and operational controls need to be
                assessed together.
              </p>
              <div className="mt-8 rounded-2xl border border-white/10 bg-[#0f172a]/60 p-5 text-sm leading-7 text-slate-300">
                Typical progression:
                <br />
                Initial signal → paid clarity → execution upgrade when shipment planning becomes real
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
                Move from assessment into real execution support, where shipment feasibility,
                operational control, and load-planning linkage materially affect continuity.
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-200">
                <li>✓ Everything included in the Professional Report</li>
                <li>✓ Add execution clarity for shipment readiness and operating continuity</li>
                <li>✓ Clarify control priorities for continuity, handling, and route-linked execution risk</li>
                <li>✓ Link into Load Planning for packing, routing, and handling logic before execution</li>
                <li>✓ Generate a stronger execution-oriented PDF for coordination and shipment planning</li>
              </ul>
              <button
                onClick={() => handleCheckout("execution")}
                disabled={loadingPlan !== null}
                className="mt-8 w-full rounded-2xl bg-white px-5 py-4 text-base font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading("execution")
                  ? "Redirecting..."
                  : "Upgrade to Execution Layer → Start Planning"}
              </button>

              <p className="mt-3 text-xs leading-6 text-slate-400">
                Secure payment via Stripe. You can return at any time using the back arrow in the top-left corner.
              </p>

              <p className="mt-4 text-xs leading-6 text-amber-200/90">
                Best for users already approaching real shipment planning, route choice, or execution-sensitive commitments.
              </p>

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
                  Still deciding
                </div>
                <h2 className="mt-4 text-4xl font-semibold text-white">
                  Start with the paid layer that matches your immediate need.
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
                  Begin with the Professional Report for structured clarity.
                  Upgrade only when the case has already moved into shipment planning,
                  execution readiness, or operating control.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => handleCheckout("pro")}
                  disabled={loadingPlan !== null}
                  className="rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading("pro")
                    ? "Redirecting..."
                    : "Buy Professional Report → Get Instant Access"}
                </button>

                <button
                  onClick={() => handleCheckout("execution")}
                  disabled={loadingPlan !== null}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading("execution")
                    ? "Redirecting..."
                    : "Upgrade to Execution Layer → Start Planning"}
                </button>

                <div className="text-sm leading-7 text-slate-400">
                  Secure payment via Stripe. You can return at any time using the back arrow in the top-left corner of Stripe Checkout.
                </div>

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