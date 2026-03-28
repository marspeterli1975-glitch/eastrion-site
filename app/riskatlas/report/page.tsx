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

type MatrixItem = {
  id: number;
  painPoint: string;
  trade: { score: number; note: string };
  investment: { score: number; note: string };
  logistics: { score: number; note: string };
  supplyChain: { score: number; note: string };
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

const executivePainPoints = [
  {
    id: 1,
    title: "Geopolitical Corridor Disruption",
    summary:
      "Route continuity remains exposed to chokepoints, policy intervention, and corridor-level instability rather than only supplier-side issues.",
    linkage:
      "Primarily linked to geopolitical exposure, route concentration, event volatility, and cross-border operating conditions within the existing 8-dimensional model.",
  },
  {
    id: 2,
    title: "Freight Cost and Margin Transmission Pressure",
    summary:
      "Cost shocks are difficult to transmit cleanly into pricing, which weakens margin discipline and destabilizes working-capital assumptions.",
    linkage:
      "Linked to cost volatility, logistics disruption sensitivity, pricing transmission weakness, and execution exposure already captured in the model base.",
  },
  {
    id: 3,
    title: "Equipment and Capacity Imbalance",
    summary:
      "The operating challenge is not only shortage but mismatch: timing, space, equipment, and deployment readiness can fail to align when conditions turn.",
    linkage:
      "Mapped to capacity tightness, route availability, operational readiness, and shipment-level execution strain inside the 8-dimensional structure.",
  },
  {
    id: 4,
    title: "Port Congestion and Fulfilment Delay",
    summary:
      "The real commercial loss is not limited to delay itself but extends to customer promise erosion, re-planning cost, and follow-on fulfilment instability.",
    linkage:
      "Connected to port exposure, transit continuity, planning disruption, and end-to-end fulfilment reliability dimensions.",
  },
  {
    id: 5,
    title: "Digital Visibility and Coordination Gaps",
    summary:
      "Weak visibility converts manageable volatility into decision lag, manual override dependency, and late-stage firefighting.",
    linkage:
      "Derived from coordination, operating predictability, planning reliability, and execution-control dimensions in the current framework.",
  },
  {
    id: 6,
    title: "Compliance and Market-Entry Friction",
    summary:
      "Trade friction increasingly arises from fragmented rules, documentation burdens, and cross-market compliance asymmetry rather than tariff alone.",
    linkage:
      "Aligned with regulatory variability, market-entry exposure, documentation complexity, and operating control dimensions.",
  },
  {
    id: 7,
    title: "Sustainability and Green-Cost Pressure",
    summary:
      "Green requirements are transitioning from reporting burdens into long-cycle operating constraints that affect supplier qualification and cost design.",
    linkage:
      "Mapped to regulatory drift, certification pressure, cost pass-through weakness, and long-horizon operating resilience.",
  },
];

const executiveImpactMatrix: MatrixItem[] = [
  {
    id: 1,
    painPoint: "Geopolitical and corridor disruption",
    trade: {
      score: 92,
      note: "Trade flow interruption and pricing instability hit order continuity directly.",
    },
    investment: {
      score: 75,
      note: "Port, route, and overseas capacity investment becomes harder to time correctly.",
    },
    logistics: {
      score: 88,
      note: "Rerouting pushes fuel, insurance, and transit complexity materially higher.",
    },
    supplyChain: {
      score: 95,
      note: "Single-point fragility becomes most visible at the end-to-end network level.",
    },
  },
  {
    id: 2,
    painPoint: "Freight cost and cost-pass-through pressure",
    trade: {
      score: 78,
      note: "Pricing transmission lags behind volatility and compresses margin.",
    },
    investment: {
      score: 65,
      note: "Return assumptions become less stable for logistics and warehousing bets.",
    },
    logistics: {
      score: 92,
      note: "Fuel and disruption costs dominate the operating-cost stack.",
    },
    supplyChain: {
      score: 82,
      note: "Inventory pressure and cash conversion worsen under cost spikes.",
    },
  },
  {
    id: 3,
    painPoint: "Capacity and equipment mismatch",
    trade: {
      score: 65,
      note: "Shipment rhythm weakens when space and equipment do not align with demand.",
    },
    investment: {
      score: 80,
      note: "Overcapacity and mistimed fleet or port investment can destroy returns.",
    },
    logistics: {
      score: 85,
      note: "Slow equipment turns and repeated booking disruption reduce execution efficiency.",
    },
    supplyChain: {
      score: 78,
      note: "Multimodal coordination breaks more easily when capacity assumptions fail.",
    },
  },
  {
    id: 4,
    painPoint: "Port congestion and end-to-end delay",
    trade: {
      score: 70,
      note: "Customer confidence and fulfilment reliability deteriorate under repeated delay.",
    },
    investment: {
      score: 60,
      note: "Expansion decisions are delayed when network certainty remains weak.",
    },
    logistics: {
      score: 90,
      note: "Detention, demurrage, and queue cost escalate quickly during congestion waves.",
    },
    supplyChain: {
      score: 85,
      note: "Visibility interruption and downstream planning failure expand beyond the port itself.",
    },
  },
  {
    id: 5,
    painPoint: "Digital visibility and control weakness",
    trade: {
      score: 55,
      note: "Slow decision cycles hurt SMEs and delay corrective action.",
    },
    investment: {
      score: 45,
      note: "Digitization investment often pays back slowly without executive sponsorship.",
    },
    logistics: {
      score: 80,
      note: "Manual handling remains high and execution efficiency falls materially.",
    },
    supplyChain: {
      score: 75,
      note: "Forecast and execution variance amplify risk across the network.",
    },
  },
  {
    id: 6,
    painPoint: "Compliance and market-entry friction",
    trade: {
      score: 85,
      note: "Rule changes and certification burdens directly affect market access.",
    },
    investment: {
      score: 70,
      note: "Localization bets become policy-driven rather than purely economic.",
    },
    logistics: {
      score: 70,
      note: "Clearance and last-mile cost rise when cross-border complexity increases.",
    },
    supplyChain: {
      score: 80,
      note: "Diversification becomes more complex as regulatory asymmetry increases.",
    },
  },
  {
    id: 7,
    painPoint: "Sustainability and green-cost pressure",
    trade: {
      score: 60,
      note: "Carbon and sustainability rules indirectly influence pricing power.",
    },
    investment: {
      score: 85,
      note: "Green infrastructure and compliance investment become strategic requirements.",
    },
    logistics: {
      score: 75,
      note: "Fuel and packaging compliance add measurable operating burden.",
    },
    supplyChain: {
      score: 70,
      note: "ESG becomes a longer-cycle qualification and continuity barrier.",
    },
  },
];

const executiveResponseFramework = {
  strategic: [
    "Rebuild route resilience through corridor diversification, regional redundancy, and reduced dependency on a single geopolitical passage.",
    "Use the 8-dimensional model as a board-level exposure lens, then link it to supplier concentration, route resilience, and market-entry strategy.",
    "Treat green compliance, regional warehousing, and visibility infrastructure as structural capability investment rather than short-term discretionary spend.",
  ],
  tactical: [
    "Create dual-path routing assumptions and predefine trigger conditions for switching between primary and backup corridor options.",
    "Introduce margin-protection measures such as pricing review thresholds, freight renegotiation windows, and controlled contract buffers.",
    "Run quarterly exposure reviews that translate model signals into inventory posture, supplier readiness checks, and compliance gating.",
  ],
  immediate: [
    "Confirm the top three current execution vulnerabilities before the next commercial commitment cycle.",
    "Activate weekly monitoring of route continuity, port stress, policy movement, and cost pass-through deviation.",
    "Escalate any shipment or order set where exposure moves from guarded into execution-fragile conditions without clear fallback control.",
  ],
};

function averageScore(items: MatrixItem[], key: keyof Omit<MatrixItem, "id" | "painPoint">) {
  const total = items.reduce((sum, item) => sum + item[key].score, 0);
  return Math.round(total / items.length);
}

function MatrixTable({
  title,
  subtitle,
  items,
  column,
}: {
  title: string;
  subtitle: string;
  items: MatrixItem[];
  column: keyof Omit<MatrixItem, "id" | "painPoint">;
}) {
  const avg = averageScore(items, column);

  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 p-5 md:p-6">
      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{title}</div>
      <div className="mt-2 text-sm leading-7 text-slate-400">{subtitle}</div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
        <div className="grid grid-cols-[84px_minmax(0,1fr)] border-b border-white/10 bg-white/[0.03]">
          <div className="px-4 py-4 text-sm font-semibold text-white">No.</div>
          <div className="px-4 py-4 text-sm font-semibold text-white">{title}</div>
        </div>

        {items.map((item) => (
          <div
            key={`${title}-${item.id}`}
            className="grid grid-cols-[84px_minmax(0,1fr)] border-b border-white/10 last:border-b-0"
          >
            <div className="px-4 py-4 text-lg font-semibold text-white">{item.id}</div>
            <div className="px-4 py-4">
              <div className="text-sm font-medium text-slate-200">{item[column].score}</div>
              <div className="mt-1 text-sm leading-7 text-slate-300">{item[column].note}</div>
            </div>
          </div>
        ))}

        <div className="grid grid-cols-[84px_minmax(0,1fr)] bg-white/[0.03]">
          <div className="px-4 py-4 text-sm font-semibold text-white">AVG</div>
          <div className="px-4 py-4 text-2xl font-semibold text-white">{avg}</div>
        </div>
      </div>
    </div>
  );
}

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
          "Executive intelligence layer enabled",
          "Impact matrix and response framework included",
        ],
        disclaimer:
          "This executive-intelligence report is for analytical and operating-planning purposes only and does not constitute legal, financial, engineering, or investment advice.",
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
      a.download = "riskatlas-executive-intelligence-report.pdf";
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
                    ? "Executive Intelligence Active"
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
                  {isExecutionUnlocked ? "Second-layer product active" : "Beta monetization live"}
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
              {isExecutionUnlocked ? "Executive Intelligence Layer" : "Professional Report"}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {isExecutionUnlocked
                ? "Your current path includes the professional report plus a second-layer management-facing intelligence block for pain-point mapping, impact weighting, and executive response priorities."
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
                  {isExecutionUnlocked ? "Second Layer Active" : "Beta Offer"}
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm text-slate-300">
                {isExecutionUnlocked ? (
                  <>
                    <div>• Professional report remains unchanged as the advisory base layer</div>
                    <div>• Executive pain-point mapping translates model output into industry language</div>
                    <div>• Impact matrix shows differentiated pressure on trade, investment, logistics, and supply chain</div>
                    <div>• Executive response framework converts guarded exposure into management actions</div>
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
                        ? "Executive Intelligence Layer is active on this browser."
                        : "Professional access is active on this browser."}
                    </div>

                    {isExecutionUnlocked ? (
                      <>
                        <Link
                          href="/load-planning"
                          className="block w-full rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 hover:bg-slate-200"
                        >
                          Open Linked Load Planning
                        </Link>

                        <button
                          onClick={downloadExecutionPdf}
                          className="block w-full rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5"
                        >
                          Download Executive Report
                        </button>

                        <div className="text-xs text-slate-500">
                          The second layer is positioned as a management-facing intelligence block rather than a longer version of the same report.
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
                          PDF export is currently the professional report handoff layer.
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
                {isExecutionUnlocked ? "Professional report complete" : "Professional report layer"}
              </div>
              <h2 className="mt-2 text-2xl font-semibold">
                {isExecutionUnlocked ? "Professional report concludes here" : "Paid content block"}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                {isExecutionUnlocked
                  ? "For 149 users, the advisory report remains the base layer. The next section is intentionally presented as a separate executive intelligence block rather than additional report text."
                  : "This section is intentionally designed to make the difference between free preview and paid report obvious. The paid layer should feel materially more structured than the preview layer."}
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
                  Structured Advisory Layer
                </div>
                <h3 className="mt-2 text-xl font-semibold">
                  Consulting-Style Recommendation Output
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  This section translates the current exposure profile into a structured recommendation layer designed to support practical commercial and operating decisions.
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

      {isExecutionUnlocked && (
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="space-y-8 rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/8 to-cyan-400/5 p-6 md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">
                  Executive Intelligence Layer
                </div>

                <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
                  Management-facing risk translation and action framing
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
                  This layer does not replace the original 8-dimensional model. It translates the same model output into
                  industry pain points, differentiated business impact, and executive action priorities so the 149 path
                  feels like a distinct management tool rather than a slightly longer report.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 lg:min-w-[280px]">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Second layer status</div>
                <div className="mt-2 text-lg font-semibold text-white">Active</div>
                <div className="mt-2 text-sm leading-7 text-slate-400">
                  Separate from the report body and designed for executive scanning, internal prioritization, and next-step decision framing.
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Layer type</div>
                <div className="mt-2 text-base font-semibold text-white">Executive intelligence</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Model basis</div>
                <div className="mt-2 text-base font-semibold text-white">Original 8 dimensions retained</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Primary use</div>
                <div className="mt-2 text-base font-semibold text-white">Management prioritization</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Linked capability</div>
                <div className="mt-2 text-base font-semibold text-white">Load Planning available</div>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-blue-400/5 p-6 md:p-8">
              <div className="text-xs uppercase tracking-[0.18em] text-blue-300">
                Executive Pain-Point Mapping
              </div>
              <h3 className="mt-2 text-xl font-semibold">
                Industry pain points translated from the same 8-dimensional model
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                The purpose of this section is not to add a new model. It is to convert the existing model output into the language
                management teams actually use when reviewing resilience, route exposure, cost pressure, and operating fragility.
              </p>

              <div className="mt-6 space-y-4">
                {executivePainPoints.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {item.id}. {item.title}
                        </div>
                        <p className="mt-2 text-sm leading-7 text-slate-300">{item.summary}</p>
                      </div>

                      <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                        Executive translation
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-slate-400">
                      <span className="font-medium text-slate-200">Model linkage:</span> {item.linkage}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-violet-400/20 bg-violet-400/5 p-6 md:p-8">
              <div className="text-xs uppercase tracking-[0.18em] text-violet-300">
                Executive Impact Matrix
              </div>
              <h3 className="mt-2 text-xl font-semibold">
                Differentiated impact by business domain
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                A single score cannot show where pain is most concentrated. This matrix translates the same risk environment into domain-specific pressure on trade, investment, logistics, and the overall supply chain.
              </p>

              <div className="mt-6 grid gap-6 xl:grid-cols-2">
                <MatrixTable
                  title="Trade"
                  subtitle="Export volume, pricing, and market-entry pressure"
                  items={executiveImpactMatrix}
                  column="trade"
                />

                <MatrixTable
                  title="Investment"
                  subtitle="Infrastructure, capacity, and localization investment pressure"
                  items={executiveImpactMatrix}
                  column="investment"
                />

                <MatrixTable
                  title="Logistics"
                  subtitle="Operating cost, efficiency, and execution pressure"
                  items={executiveImpactMatrix}
                  column="logistics"
                />

                <MatrixTable
                  title="Supply Chain"
                  subtitle="Network resilience, planning, and inventory pressure"
                  items={executiveImpactMatrix}
                  column="supplyChain"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-amber-400/20 bg-amber-400/5 p-6 md:p-8">
              <div className="text-xs uppercase tracking-[0.18em] text-amber-300">
                Executive Response Framework
              </div>
              <h3 className="mt-2 text-xl font-semibold">
                Strategic, tactical, and immediate management actions
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                The purpose of this framework is to turn a guarded exposure reading into a management response stack. It keeps the model unchanged while improving usability for planning, budget discussion, and operating control.
              </p>

              <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Strategic Horizon</div>
                  <div className="mt-3 space-y-3 text-sm text-slate-300">
                    {executiveResponseFramework.strategic.map((item) => (
                      <div key={item}>• {item}</div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Tactical Hedging</div>
                  <div className="mt-3 space-y-3 text-sm text-slate-300">
                    {executiveResponseFramework.tactical.map((item) => (
                      <div key={item}>• {item}</div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Immediate Executive Actions</div>
                  <div className="mt-3 space-y-3 text-sm text-slate-300">
                    {executiveResponseFramework.immediate.map((item) => (
                      <div key={item}>• {item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6 md:p-8">
              <div className="text-xs uppercase tracking-[0.18em] text-emerald-300">
                Linked Executive Actions
              </div>
              <h3 className="mt-2 text-xl font-semibold">
                Continue into execution support or export the management handoff
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                The Executive Intelligence Layer should close with action. Users can either continue into linked load planning for execution support or export the stronger management-facing handoff document.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/load-planning"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                >
                  Open Load Planning
                </Link>

                <button
                  onClick={downloadExecutionPdf}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Download Executive Report
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}