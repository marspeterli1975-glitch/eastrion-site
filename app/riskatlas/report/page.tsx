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
    return { grade: "A", label: "Low", color: "text-emerald-400", ring: "ring-emerald-500/30" };
  }
  if (score <= 40) {
    return { grade: "B", label: "Guarded", color: "text-lime-400", ring: "ring-lime-500/30" };
  }
  if (score <= 60) {
    return { grade: "C", label: "Moderate", color: "text-amber-400", ring: "ring-amber-500/30" };
  }
  if (score <= 80) {
    return { grade: "D", label: "High", color: "text-orange-400", ring: "ring-orange-500/30" };
  }
  return { grade: "E", label: "Critical", color: "text-red-400", ring: "ring-red-500/30" };
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

  const isProUnlocked = !!unlockState?.pro;

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
          plan: "professional",
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
              <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium tracking-[0.2em] text-cyan-300 uppercase">
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
                  {isProUnlocked ? "Professional Unlocked" : "Preview Only"}
                </div>
                <div className="mt-1 text-sm text-slate-400">
                  {isProUnlocked
                    ? `Paid${
                        unlockState?.lastPaidAt ? ` · ${new Date(unlockState.lastPaidAt).toLocaleString()}` : ""
                      }`
                    : "US$49 to unlock full professional report"}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Commercial mode</div>
                <div className="mt-2 text-lg font-semibold">Beta monetization live</div>
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
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                  The current route sits in a guarded zone. It is not a breakdown scenario, but it is not a clean
                  low-risk channel either. The main commercial implication is that margin planning, timing confidence,
                  and execution resilience are not yet strong enough to support aggressive commitments without further validation.
                </p>
              </div>

              <div className={`rounded-3xl border border-white/10 bg-[#0b1628] p-6 text-center shadow-2xl ring-1 ${band.ring}`}>
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Overall score</div>
                <div className="mt-3 text-5xl font-semibold">{overallScore}</div>
                <div className={`mt-3 text-2xl font-semibold ${band.color}`}>{band.grade}</div>
                <div className="mt-1 text-sm text-slate-400">{band.label}</div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Band A</div>
                <div className="mt-2 text-sm font-medium text-white">0–20 Low</div>
                <p className="mt-2 text-xs leading-6 text-slate-400">Routine exposure. Usually manageable with standard controls.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Band B</div>
                <div className="mt-2 text-sm font-medium text-white">21–40 Guarded</div>
                <p className="mt-2 text-xs leading-6 text-slate-400">Watch list exposure. Decisions remain viable, but should not be complacent.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Band C</div>
                <div className="mt-2 text-sm font-medium text-white">41–60 Moderate</div>
                <p className="mt-2 text-xs leading-6 text-slate-400">Meaningful pressure across execution, cost, or reliability dimensions.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Band D / E</div>
                <div className="mt-2 text-sm font-medium text-white">61–100 High / Critical</div>
                <p className="mt-2 text-xs leading-6 text-slate-400">Requires strong intervention, rerouting, renegotiation, or contingency action.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-b from-cyan-400/10 to-transparent p-6 md:p-8">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300">Commercial access layer</div>
            <h3 className="mt-3 text-2xl font-semibold">Professional Report</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Unlock the full report to access the decision note, premium risk interpretation, scenario view,
              supplier-port exposure summary, and recommended actions in a boardroom-ready format.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-400">Price</div>
                  <div className="mt-1 text-3xl font-semibold">US$49</div>
                </div>
                <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                  Beta Offer
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <div>• Executive summary with commercial interpretation</div>
                <div>• Premium report blocks visibly separated from preview content</div>
                <div>• Stronger decision-support language for paid users</div>
                <div>• Better perceived value for future PDF and enterprise layers</div>
              </div>

              <div className="mt-6">
                {isProUnlocked ? (
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                    Professional access is active on this browser.
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
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Professional report layer</div>
              <h2 className="mt-2 text-2xl font-semibold">Paid content block</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                This section is intentionally designed to make the difference between free preview and paid report obvious.
                Even before PDF export and backend persistence are added, users should feel that the paid layer is a more serious product.
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

    {/* Strategic Recommendation Layer */}
    <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6 md:p-8">
      <div className="text-xs uppercase tracking-[0.18em] text-cyan-300">
        Strategic Recommendation Layer
      </div>
      <h3 className="mt-2 text-xl font-semibold">
        Structured Advisory Output (Non-deterministic)
      </h3>
      <p className="mt-3 text-sm text-slate-400 leading-7">
        This section provides a structured recommendation framework based on the current risk exposure.
        It is designed to support decision-making, not to replace it.
      </p>
    </div>

    <div className="grid gap-6 lg:grid-cols-2">

      {/* Strategic View */}
      <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
        <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
          Strategic View
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          The current route should be treated as a controlled execution channel rather than a default expansion corridor.
          From a strategic perspective, the priority is not aggressive scaling, but maintaining execution reliability
          under moderate exposure conditions.
        </p>
      </div>

      {/* Tactical Focus */}
      <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
        <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
          Tactical Focus
        </div>
        <div className="mt-4 space-y-3 text-sm text-slate-300">
          <div>• Strengthen supplier readiness verification before commitment</div>
          <div>• Protect margin assumptions under cost variability</div>
          <div>• Design delivery buffers to absorb timing uncertainty</div>
          <div>• Monitor execution volatility rather than relying on baseline expectations</div>
        </div>
      </div>

      {/* Execution Actions */}
      <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
        <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
          Execution Actions
        </div>
        <div className="mt-4 space-y-3 text-sm text-slate-300">
          <div>1. Conduct secondary validation of supplier production stability</div>
          <div>2. Adjust customer-facing lead time expectations</div>
          <div>3. Prepare alternative routing scenarios for sensitive shipments</div>
          <div>4. Avoid single-point dependency in execution planning</div>
        </div>
      </div>

      {/* Risk Considerations */}
      <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
        <div className="text-xs uppercase tracking-[0.18em] text-amber-300">
          Risk Considerations
        </div>
        <div className="mt-4 space-y-3 text-sm text-slate-300">
          <div>• This assessment reflects a relative positioning, not a deterministic outcome</div>
          <div>• External volatility (policy, logistics, pricing) may alter execution conditions</div>
          <div>• Results should be integrated with contractual, operational, and commercial context</div>
          <div>• This report is designed as a decision-support layer, not a substitute for professional judgment</div>
        </div>
      </div>

    </div>

    {/* Premium Positioning */}
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
        Premium Positioning Note
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-300">
        This structured advisory layer is designed to emulate consulting-style outputs,
        bridging the gap between raw risk scoring and real-world execution decisions.
        It represents the foundation for future upgrades including scenario modeling,
        PDF reporting, and enterprise-level analytics.
      </p>
    </div>

  </div>
) : (
            <div className="mt-8 rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-8">
              <div className="max-w-3xl">
                <h3 className="text-xl font-semibold">Professional content is locked</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  The free preview shows the headline score and strategic reading. The paid layer adds the more commercially useful part:
                  decision note, interpretation depth, premium factors, and recommended action structure.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">
                    Executive summary
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">
                    Decision note
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">
                    Premium factors
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">
                    Recommended actions
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