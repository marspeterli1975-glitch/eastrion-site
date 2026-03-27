"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type UnlockState = {
  pro?: boolean;
  execution?: boolean;
  lastSessionId?: string;
  lastPaidAt?: string;
};

type CheckoutResponse = {
  url?: string;
  checkoutUrl?: string;
};

function getRiskBand(score: number) {
  if (score <= 20) {
    return {
      grade: "A",
      label: "Low",
      color: "text-emerald-400",
      ring: "ring-emerald-500/30",
    };
  }
  if (score <= 40) {
    return {
      grade: "B",
      label: "Guarded",
      color: "text-lime-400",
      ring: "ring-lime-500/30",
    };
  }
  if (score <= 60) {
    return {
      grade: "C",
      label: "Moderate",
      color: "text-amber-400",
      ring: "ring-amber-500/30",
    };
  }
  if (score <= 80) {
    return {
      grade: "D",
      label: "High",
      color: "text-orange-400",
      ring: "ring-orange-500/30",
    };
  }
  return {
    grade: "E",
    label: "Critical",
    color: "text-red-400",
    ring: "ring-red-500/30",
  };
}

function getDecisionVerdict(score: number) {
  if (score <= 20) {
    return {
      title: "Proceed",
      description:
        "Current exposure is low. The route can be treated as commercially usable under standard monitoring.",
      tone: "text-emerald-300",
      box: "border-emerald-400/20 bg-emerald-400/10",
    };
  }
  if (score <= 40) {
    return {
      title: "Proceed with Monitoring",
      description:
        "Current exposure remains manageable, but execution should be monitored with disciplined supplier and logistics controls.",
      tone: "text-lime-300",
      box: "border-lime-400/20 bg-lime-400/10",
    };
  }
  if (score <= 60) {
    return {
      title: "Conditional",
      description:
        "The route remains viable, but commitments should be made selectively and supported by tighter operational safeguards.",
      tone: "text-amber-300",
      box: "border-amber-400/20 bg-amber-400/10",
    };
  }
  if (score <= 80) {
    return {
      title: "High Risk",
      description:
        "Execution exposure is elevated. Commercial use should be limited unless controls, buffers, and alternatives are in place.",
      tone: "text-orange-300",
      box: "border-orange-400/20 bg-orange-400/10",
    };
  }
  return {
    title: "Avoid",
    description:
      "Current exposure is critical. The route should not be treated as commercially reliable without major risk reduction measures.",
      tone: "text-red-300",
      box: "border-red-400/20 bg-red-400/10",
    };
  }
}

const executionControlPriorities = [
  "Validate supplier production readiness before shipment booking is locked.",
  "Protect margin and timeline assumptions against corridor volatility.",
  "Introduce operational buffers for handling, routing, and delivery uncertainty.",
  "Avoid single-point execution dependency across supplier, route, or loading plan.",
];

const executionLinkageItems = [
  {
    title: "Packing Discipline",
    text: "Translate the risk reading into shipment-level packing assumptions, especially where stack limits, outer dimensions, and handling sensitivity affect feasibility.",
  },
  {
    title: "Routing Readiness",
    text: "Use the execution layer to judge whether the planned route still supports stable dispatch, transit continuity, and customer-facing lead-time commitments.",
  },
  {
    title: "Handling Control",
    text: "Treat loading, transfer, and inland deployment as operational control points rather than downstream administrative steps.",
  },
];

const executionLayerMetrics = [
  {
    label: "Execution posture",
    value: "Managed deployment",
  },
  {
    label: "Load planning linkage",
    value: "Enabled",
  },
  {
    label: "Operational readiness",
    value: "Control-led",
  },
  {
    label: "Internal coordination use",
    value: "Expanded",
  },
];

export default function RiskAtlasReportPage() {
  const [mounted, setMounted] = useState(false);
  const [unlockState, setUnlockState] = useState<UnlockState>({});
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const raw = localStorage.getItem("riskatlas_unlock_state");
      if (raw) {
        const parsed = JSON.parse(raw);
        setUnlockState(parsed || {});
      }
    } catch (error) {
      console.error("Failed to read unlock state:", error);
    }
  }, []);

  const overallScore = 38;
  const band = useMemo(() => getRiskBand(overallScore), [overallScore]);
  const verdict = useMemo(() => getDecisionVerdict(overallScore), [overallScore]);
  const isProUnlocked = !!unlockState?.pro;
  const isExecutionUnlocked = !!unlockState?.execution;

  async function handleUnlockProfessional() {
    try {
      setIsPaying(true);

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: "riskatlas_professional_report",
          plan: "pro",
          amount: 49,
          currency: "usd",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session.");
      }

      const data: CheckoutResponse = await response.json();
      const redirectUrl = data.url || data.checkoutUrl;

      if (!redirectUrl) {
        throw new Error("Checkout URL not returned.");
      }

      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      alert("Unable to start checkout. Please try again.");
    } finally {
      setIsPaying(false);
    }
  }

  async function downloadProfessionalPdf() {
    try {
      const payload = {
        country: "China - India",
        industry: "Battery Materials",
        risk_score: 38,
        grade: "B",
        level: "Guarded",
        breakdown: {
          country_risk: 42,
          industry_risk: 36,
          logistics_risk: 48,
          event_risk: 30,
        },
        risk_factors: [
          "Supplier concentration risk",
          "Logistics corridor dependency",
          "Regulatory variability",
        ],
        disclaimer:
          "This report is for analytical purposes only and does not constitute legal, financial, or investment advice.",
      };

      const res = await fetch("/api/risk-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("PDF API ERROR:", text);
        alert(`PDF export failed: ${text}`);
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "riskatlas-report.pdf";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF FETCH ERROR:", e);
      alert("PDF export failed");
    }
  }

  async function downloadExecutionPdf() {
    try {
      const payload = {
        country: "China - India",
        industry: "Battery Materials",
        risk_score: 38,
        grade: "B",
        level: "Guarded",
        breakdown: {
          country_risk: 42,
          industry_risk: 36,
          logistics_risk: 48,
          event_risk: 30,
        },
        risk_factors: [
          "Supplier concentration risk",
          "Logistics corridor dependency",
          "Regulatory variability",
          "Execution layer enabled",
          "Load planning linkage required",
        ],
        disclaimer:
          "This execution-layer report is for analytical and operational planning purposes only and does not constitute legal, financial, engineering, or investment advice.",
      };

      const res = await fetch("/api/risk-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("EXECUTION PDF API ERROR:", text);
        alert(`Execution PDF export failed: ${text}`);
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "riskatlas-execution-report.pdf";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("EXECUTION PDF FETCH ERROR:", e);
      alert("Execution PDF export failed");
    }
  }

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#07111f] text-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-56 rounded bg-white/10" />
            <div className="h-28 rounded-2xl bg-white/10" />
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="h-40 rounded-2xl bg-white/10" />
              <div className="h-40 rounded-2xl bg-white/10" />
              <div className="h-40 rounded-2xl bg-white/10" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_28%),linear-gradient(180deg,#08111f_0%,#07111f_100%)]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
                RiskAtlas Beta Report
              </div>

              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                Supply Chain Risk Exposure Scan
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                This page is the commercial report layer of RiskAtlas Beta. Users can review a free strategic preview,
                then unlock the Professional Report for a deeper operational and decision-oriented view.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[360px]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Unlock status</div>
                <div className="mt-2 text-lg font-semibold">
                  {isExecutionUnlocked
                    ? "Execution Upgrade Unlocked"
                    : isProUnlocked
                    ? "Professional Unlocked"
                    : "Preview Only"}
                </div>
                <div className="mt-1 text-sm text-slate-400">
                  {isProUnlocked
                    ? `Paid${
                        unlockState?.lastPaidAt
                          ? ` · ${new Date(unlockState.lastPaidAt).toLocaleString()}`
                          : ""
                      }`
                    : "US$49 to unlock full professional report"}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Commercial mode</div>
                <div className="mt-2 text-lg font-semibold">
                  {isExecutionUnlocked ? "Execution layer active" : "Beta monetization live"}
                </div>
                <div className="mt-1 text-sm text-slate-400">
                  Frontend unlock works via browser local storage for now.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Executive result</div>
                <h2 className="mt-2 text-2xl font-semibold">Initial Supply Chain Risk Reading</h2>

                <div className={`mt-4 rounded-2xl border px-4 py-4 ${verdict.box}`}>
                  <div className={`text-sm font-semibold ${verdict.tone}`}>
                    Decision Verdict: {verdict.title}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-200">
                    {verdict.description}
                  </p>
                </div>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                  The current route sits in a guarded zone. It is not a breakdown scenario, but it is not a clean
                  low-risk channel either. The main commercial implication is that margin planning, timing confidence,
                  and execution resilience are not yet strong enough to support aggressive commitments without further validation.
                </p>
              </div>

              <div
                className={`rounded-3xl border border-white/10 bg-[#0b1628] p-6 text-center shadow-2xl ring-1 ${band.ring}`}
              >
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Overall score</div>
                <div className="mt-3 text-5xl font-semibold">{overallScore}</div>
                <div className={`mt-3 text-2xl font-semibold ${band.color}`}>{band.grade}</div>
                <div className="mt-1 text-sm text-slate-400">{band.label}</div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-5">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Band A</div>
                <div className="mt-2 text-sm font-medium text-white">0-20 Low</div>
                <p className="mt-2 text-xs text-slate-400">Routine exposure. Stable and manageable.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Band B</div>
                <div className="mt-2 text-sm font-medium text-white">21-40 Guarded</div>
                <p className="mt-2 text-xs text-slate-400">Watch list exposure. Requires attention.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Band C</div>
                <div className="mt-2 text-sm font-medium text-white">41-60 Moderate</div>
                <p className="mt-2 text-xs text-slate-400">Meaningful operational pressure.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Band D</div>
                <div className="mt-2 text-sm font-medium text-white">61-80 High</div>
                <p className="mt-2 text-xs text-slate-400">Execution risk is elevated.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Band E</div>
                <div className="mt-2 text-sm font-medium text-white">81-100 Critical</div>
                <p className="mt-2 text-xs text-slate-400">Severe disruption risk.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-b from-cyan-400/10 to-transparent p-6 md:p-8">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300">Commercial access layer</div>
            <h3 className="mt-3 text-2xl font-semibold">
              {isExecutionUnlocked ? "Execution Upgrade" : "Professional Report"}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {isExecutionUnlocked
                ? "Your upgrade includes the structured advisory layer, execution-oriented PDF output, and access to Load Planning linkage."
                : "Unlock the full report to access the structured advisory layer, premium interpretation, and the professional PDF report."}
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">Price</div>
                  <div className="mt-1 text-3xl font-semibold">
                    {isExecutionUnlocked ? "US$149" : "US$49"}
                  </div>
                </div>
                <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                  {isExecutionUnlocked ? "Execution Active" : "Beta Offer"}
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm text-slate-300">
                {isExecutionUnlocked ? (
                  <>
                    <div>• Execution sensitivity note for operational risk exposure</div>
                    <div>• Operational control priorities for shipment readiness and continuity</div>
                    <div>• Load Planning linkage for packing, routing, and handling feasibility</div>
                    <div>• Stronger execution-oriented PDF output for internal coordination</div>
                  </>
                ) : (
                  <>
                    <div>• Executive summary with commercial interpretation</div>
                    <div>• Premium report blocks visibly separated from preview content</div>
                    <div>• Structured advisory layer for paid users</div>
                    <div>• Professional PDF report for paid access</div>
                  </>
                )}
              </div>

              <div className="mt-6">
                {isProUnlocked ? (
                  <div className="space-y-3">
                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                      {isExecutionUnlocked
                        ? "Execution Upgrade is active on this browser."
                        : "Professional access is active on this browser."}
                    </div>

                    {isExecutionUnlocked ? (
                      <>
                        <Link
                          href="/load-planning"
                          className="block w-full rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 hover:bg-slate-200"
                        >
                          Go to Load Planning
                        </Link>

                        <button
                          onClick={downloadExecutionPdf}
                          className="block w-full rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5"
                        >
                          Download Execution Report
                        </button>

                        <div className="text-xs text-slate-500">
                          Execution layer includes load-planning linkage and stronger operational coordination output.
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={downloadProfessionalPdf}
                          className="block w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-200"
                        >
                          Download PDF Report
                        </button>

                        <div className="text-xs text-slate-500">
                          PDF export (beta version). Full dynamic report generation will be upgraded in the next phase.
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handleUnlockProfessional}
                    disabled={isPaying}
                    className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isPaying ? "Redirecting to Checkout..." : "Unlock Professional Report"}
                  </button>
                )}
              </div>

              <div className="mt-4 text-xs leading-6 text-slate-500">
                Checkout is handled by Stripe Hosted Checkout. Access is currently unlocked on this browser via local storage.
              </div>
            </div>

            <div className="mt-5">
              <Link
                href="/riskatlas"
                className="inline-flex items-center text-sm text-slate-300 transition hover:text-white"
              >
                ← Back to RiskAtlas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Preview insight 01</div>
            <h3 className="mt-3 text-lg font-semibold">Primary reading</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              The current risk level is not severe enough to force immediate avoidance, but it is high enough to justify
              tighter controls around supplier reliability, timing exposure, and cost discipline.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Preview insight 02</div>
            <h3 className="mt-3 text-lg font-semibold">Commercial implication</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              A guarded route can still be commercially workable, but quoted margins and promised timelines should not be
              positioned as if the corridor were stable and low-volatility.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Preview insight 03</div>
            <h3 className="mt-3 text-lg font-semibold">Decision posture</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Proceeding is possible, but the route should be treated as a managed decision rather than a default one.
              That distinction is where premium interpretation starts to matter.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="rounded-3xl border border-white/10 bg-[#0a1526] p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                {isExecutionUnlocked ? "Execution report layer" : "Professional report layer"}
              </div>
              <h2 className="mt-2 text-2xl font-semibold">
                {isExecutionUnlocked ? "Execution content block" : "Paid content block"}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                {isExecutionUnlocked
                  ? "This section reflects the execution-grade layer, designed to connect risk interpretation with shipment feasibility and operational readiness."
                  : "This section is intentionally designed to make the difference between free preview and paid report obvious. Even before backend persistence and dynamic PDF generation are added, users should feel that the paid layer is a more serious product."}
              </p>
            </div>

            {!isProUnlocked && (
              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm text-amber-300">
                Locked until Professional Report is purchased
              </div>
            )}
          </div>

          {isProUnlocked ? (
            <div className="mt-8 space-y-6">
              <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6 md:p-8">
                <div className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                  {isExecutionUnlocked ? "Structured Execution Advisory Layer" : "Structured Advisory Layer"}
                </div>
                <h3 className="mt-2 text-xl font-semibold">
                  {isExecutionUnlocked
                    ? "Execution-Oriented Recommendation Output"
                    : "Consulting-Style Recommendation Output"}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {isExecutionUnlocked
                    ? "This section translates the current exposure profile into a structured recommendation layer for commercial decisions, execution planning, and shipment feasibility."
                    : "This section translates the current exposure profile into a structured recommendation layer designed to support practical commercial and operating decisions."}
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Strategic View</div>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    The route remains commercially usable, but it should not be treated as frictionless.
                    Priority should be placed on disciplined execution, monitoring continuity signals,
                    and preserving reliability as transaction volume grows.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Tactical Focus</div>
                  <div className="mt-4 space-y-3 text-sm text-slate-300">
                    <div>• Strengthen supplier readiness validation before commitment.</div>
                    <div>• Protect margin assumptions under cost and timing variability.</div>
                    <div>• Introduce delivery buffers for operational uncertainty.</div>
                    <div>• Monitor execution volatility instead of relying on baseline assumptions.</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Execution Actions</div>
                  <div className="mt-4 space-y-3 text-sm text-slate-300">
                    <div>1. Conduct secondary validation of supplier production stability.</div>
                    <div>2. Adjust customer-facing lead-time expectations where required.</div>
                    <div>3. Prepare alternative routing scenarios for sensitive shipments.</div>
                    <div>4. Avoid single-point dependency in execution planning.</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
                  <div className="text-xs uppercase tracking-[0.18em] text-amber-300">Risk Considerations</div>
                  <div className="mt-4 space-y-3 text-sm text-slate-300">
                    <div>• This assessment reflects a relative positioning, not a deterministic outcome.</div>
                    <div>• External volatility in policy, logistics, pricing, or operating conditions may alter execution performance.</div>
                    <div>• Results should be integrated with contractual, commercial, and operational context.</div>
                    <div>• This report is designed as a decision-support layer, not a substitute for professional judgment.</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Use Boundary</div>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  This report is provided for analytical and informational purposes only. It does not constitute
                  legal, financial, or investment advice. Users remain responsible for integrating this analysis
                  with their own contractual frameworks, operating controls, and commercial judgment.
                </p>
              </div>

              {isExecutionUnlocked && (
                <>
                  <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6 md:p-8">
                    <div className="text-xs uppercase tracking-[0.18em] text-emerald-300">
                      Execution Layer Overview
                    </div>
                    <h3 className="mt-2 text-xl font-semibold">
                      Operational execution perspective is now part of the report
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                      The 149 layer is not limited to a stronger PDF handoff. It adds an execution-facing reading of the
                      same corridor, so the report can be used not only for commercial judgment but also for shipment readiness,
                      planning linkage, and internal operating coordination.
                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      {executionLayerMetrics.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-white/10 bg-black/20 p-4"
                        >
                          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                            {item.label}
                          </div>
                          <div className="mt-2 text-base font-semibold text-white">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="rounded-3xl border border-blue-400/20 bg-blue-400/5 p-6 md:p-8">
                      <div className="text-xs uppercase tracking-[0.18em] text-blue-300">
                        Load Planning Linkage
                      </div>
                      <h3 className="mt-2 text-xl font-semibold">
                        Risk reading is connected to shipment feasibility
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        In the execution layer, the report is no longer a standalone interpretation page.
                        It begins to connect risk posture with real shipment preparation, especially where packing structure,
                        handling sensitivity, and deployment feasibility influence whether the route remains workable in practice.
                      </p>

                      <div className="mt-6 space-y-4">
                        {executionLinkageItems.map((item) => (
                          <div
                            key={item.title}
                            className="rounded-2xl border border-white/10 bg-black/20 p-4"
                          >
                            <div className="text-sm font-semibold text-white">{item.title}</div>
                            <p className="mt-2 text-sm leading-7 text-slate-300">{item.text}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6">
                        <Link
                          href="/load-planning"
                          className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                        >
                          Open Load Planning
                        </Link>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-violet-400/20 bg-violet-400/5 p-6 md:p-8">
                      <div className="text-xs uppercase tracking-[0.18em] text-violet-300">
                        Operational Control Priorities
                      </div>
                      <h3 className="mt-2 text-xl font-semibold">
                        Minimum execution actions before scaling commitment
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        These priorities make the execution layer visibly different from the professional report.
                        The objective is to convert a guarded risk reading into a controlled operating posture rather
                        than leave it as a general advisory note.
                      </p>

                      <div className="mt-6 space-y-3">
                        {executionControlPriorities.map((item, index) => (
                          <div
                            key={item}
                            className="rounded-2xl border border-white/10 bg-black/20 p-4"
                          >
                            <div className="flex gap-3">
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white">
                                {index + 1}
                              </div>
                              <div className="text-sm leading-7 text-slate-300">{item}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6">
                        <button
                          onClick={downloadExecutionPdf}
                          className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                        >
                          Download Execution Report
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6 md:p-8">
                    <div className="text-xs uppercase tracking-[0.18em] text-emerald-300">
                      Execution Upgrade Active
                    </div>
                    <h3 className="mt-2 text-xl font-semibold">
                      Operational Execution Layer Enabled
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      Your upgrade includes execution-level considerations, including shipment feasibility,
                      operational controls, and load planning linkage.
                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <Link
                        href="/load-planning"
                        className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                      >
                        Go to Load Planning
                      </Link>

                      <button
                        onClick={downloadExecutionPdf}
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                      >
                        Download Execution Report
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8">
              <div className="max-w-3xl">
                <h3 className="text-xl font-semibold">Professional content is locked</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  The free preview shows the headline score and strategic reading. The paid layer adds the more commercially useful part:
                  structured advisory output, premium interpretation, and the beta PDF handoff.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">
                    Strategic View
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">
                    Tactical Focus
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">
                    Execution Actions
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">
                    Risk Considerations
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleUnlockProfessional}
                    disabled={isPaying}
                    className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isPaying ? "Redirecting to Checkout..." : "Pay US$49 to Unlock"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}