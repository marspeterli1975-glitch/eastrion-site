"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Tier = {
  name: string;
  price: string;
  subtitle: string;
  idealFor: string;
  features: string[];
  cta: string;
  plan?: string;
  highlight?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Preview",
    price: "Free",
    subtitle: "Entry-level exposure scan",
    idealFor: "For first-time visitors and early qualification",
    features: [
      "Basic risk preview",
      "Score + grade + summary",
      "Initial factor breakdown",
      "Limited report visibility",
    ],
    cta: "Current Entry Point",
  },
  {
    name: "Professional Report",
    price: "US$49",
    subtitle: "Commercial decision preview",
    idealFor: "For SMEs validating a route, supplier, or product exposure",
    features: [
      "Full report unlock",
      "Expanded executive summary",
      "Priority action plan",
      "Full factor interpretation",
      "Commercial-grade presentation",
      "Download-ready report structure",
    ],
    cta: "Upgrade to Full Report",
    plan: "pro",
    highlight: true,
  },
  {
    name: "Execution Upgrade",
    price: "US$149",
    subtitle: "Risk + loading-plan linkage",
    idealFor: "For actual shipment planning and operational execution",
    features: [
      "Loading plan linkage",
      "Scenario analysis",
      "Supplier × route × product exposure view",
      "Execution-oriented planning logic",
      "Designed for commercial operations",
    ],
    cta: "Unlock Execution Layer",
    plan: "execution",
  },
];

const faqs = [
  {
    q: "Why charge for this instead of giving everything free?",
    a: "Because the paid layer is not just a score. It translates supply-chain exposure into decision logic, execution priorities, and a presentation standard a customer can actually use internally.",
  },
  {
    q: "What is the difference between the free preview and the paid report?",
    a: "The free preview proves relevance. The paid report unlocks the full interpretive layer: deeper conclusions, action priorities, and the modules that connect risk insight to execution planning.",
  },
  {
    q: "Why is the execution layer priced higher?",
    a: "Because this is where risk stops being descriptive and becomes operational. Once loading constraints, scenario choices, and execution tradeoffs are added, the output starts affecting real shipment planning and commercial decisions.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
      <div className="text-base font-semibold text-white">{q}</div>
      <p className="mt-3 text-sm leading-7 text-slate-300">{a}</p>
    </div>
  );
}

export default function RiskAtlasPricingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-300">
                RiskAtlas Pricing
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                MVP → Paid Conversion
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">
              Turn exposure insight into a paid decision product
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
              The goal of this pricing structure is not to sell a generic report.
              It is to monetize the transition from “interesting risk signal” to
              “actionable commercial and operational guidance.”
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/riskatlas/report"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10"
            >
              Back to Report
            </Link>
            <Link
              href="/riskatlas"
              className="rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
            >
              Run Another Scan
            </Link>
          </div>
        </div>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-6">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Why the model can work for supply chain buyers
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Most companies do not buy “risk” as an abstract concept. They buy
                clarity when risk affects supplier selection, shipment execution,
                route choice, loading feasibility, or internal decision confidence.
                That is why this structure is layered.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                  <div className="text-sm font-semibold text-white">Signal</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Free preview proves relevance and gets the user into the funnel.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                  <div className="text-sm font-semibold text-white">Interpretation</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Paid report turns raw exposure into commercial reading and action logic.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                  <div className="text-sm font-semibold text-white">Execution</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Premium execution layer connects risk with shipment and loading decisions.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Commercial logic
              </div>
              <div className="mt-4 text-lg font-semibold text-white">
                Preview gets attention. Paid interpretation gets trust. Execution gets budget.
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                This is the product ladder. The first conversion is not the final
                business model; it is the bridge toward higher-value workflow
                products such as Loading Plan, Operational Risk, and shipment
                execution guidance.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl border p-6 ${
                tier.highlight
                  ? "border-cyan-400/30 bg-gradient-to-b from-cyan-500/10 to-slate-950"
                  : "border-white/10 bg-slate-950/70"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                    {tier.name}
                  </div>
                  <div className="mt-3 text-4xl font-semibold text-white">{tier.price}</div>
                  <div className="mt-2 text-sm text-slate-300">{tier.subtitle}</div>
                </div>

                {tier.highlight && (
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                    Recommended
                  </span>
                )}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-500">Best for</div>
                <div className="mt-2 text-sm leading-6 text-slate-200">{tier.idealFor}</div>
              </div>

              <div className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-200"
                  >
                    {feature}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                {tier.plan ? (
                  <button
                    onClick={() => router.push(`/riskatlas/checkout?plan=${tier.plan}`)}
                    className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      tier.highlight
                        ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                        : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    {tier.cta}
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white opacity-80"
                  >
                    {tier.cta}
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
            <h2 className="text-2xl font-semibold text-white">Pricing rationale</h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                <div className="text-base font-semibold text-white">
                  Free should prove value, not replace value
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  The free layer should be strong enough to feel real, but incomplete
                  enough that operational users still need the paid interpretation.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                <div className="text-base font-semibold text-white">
                  The first paid tier should be easy to say yes to
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  US$49 is not the end state. It is an entry point for teams that
                  want a more credible read before a real shipment, sourcing move,
                  or route decision.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                <div className="text-base font-semibold text-white">
                  The execution tier is where B2B value expands
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Once the product influences container planning, dispatch logic,
                  supplier readiness, and execution tradeoffs, it becomes easier to
                  justify a higher price or a consulting-backed offering.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
            <h2 className="text-2xl font-semibold text-white">FAQ</h2>
            <div className="mt-5 space-y-4">
              {faqs.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Current implementation note
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                This page is currently the conversion layer before payment
                integration. The next step is to connect the highlighted upgrade
                actions to Stripe checkout and then unlock the corresponding paid
                modules.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <button className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200">
                Connect Stripe Next
              </button>
              <Link
                href="/riskatlas/report"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10"
              >
                Return to Preview
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}