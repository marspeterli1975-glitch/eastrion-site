import Link from "next/link";

export default function RiskAtlasPage() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#0f172a] via-[#0b1020] to-[#0b1020]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_left,rgba(16,185,129,0.14),transparent_24%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-8 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-5 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-sm text-cyan-200">
                RiskAtlas · Supply Chain Risk Assessment + Decision Engine
              </div>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Turn supply chain uncertainty into a structured, paid risk
                intelligence workflow.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                RiskAtlas helps importers, exporters, sourcing teams and
                logistics operators quickly identify exposure across supplier,
                route, country and execution layers — starting with a free scan,
                then upgrading into a professional decision-ready report.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/riskatlas/report"
                  className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-6 py-3.5 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Run Free Risk Scan
                </Link>

                <Link
                  href="/riskatlas/pricing"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  View Pricing
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-400">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  Free entry point
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  Paid report conversion
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  Execution upgrade path
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                    Commercial Flow
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    From free scan to paid action
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-[#10182b] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-cyan-300">
                        Step 1 · Free
                      </p>
                      <h3 className="mt-1 text-lg font-semibold">
                        Run Free Risk Scan
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        Get a quick initial view of your supply chain exposure
                        and see the structure of your risk report.
                      </p>
                    </div>
                    <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-medium text-cyan-200">
                      Entry
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#10182b] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-emerald-300">
                        Step 2 · US$49
                      </p>
                      <h3 className="mt-1 text-lg font-semibold">
                        Unlock Full Report
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        Access score explanation, executive summary, factor
                        breakdown, priority action plan and premium module
                        preview.
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-200">
                      Core Offer
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#10182b] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-amber-300">
                        Step 3 · US$149
                      </p>
                      <h3 className="mt-1 text-lg font-semibold">
                        Execution Upgrade
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        Go beyond diagnosis with stronger execution guidance,
                        recommended next actions and deeper operational
                        prioritization.
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-400/15 px-3 py-1 text-xs font-medium text-amber-200">
                      Premium
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/riskatlas/pricing"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  See Paid Plans
                </Link>
                <Link
                  href="/riskatlas/report"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Try Free Scan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
            Why this matters
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            One entry page, three conversion layers
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            Your current issue is not that Pricing does not exist. It is that
            users who land on RiskAtlas are not clearly told where the paid
            value begins. This page should now act as the bridge between free
            curiosity and paid confidence.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 inline-flex rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-200">
              Free Scan
            </div>
            <h3 className="text-xl font-semibold">Low-friction entry</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Let users experience the product immediately. No payment barrier,
              no confusion, no extra explanation needed.
            </p>
            <div className="mt-6">
              <Link
                href="/riskatlas/report"
                className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
              >
                Run Free Risk Scan →
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/5 p-6">
            <div className="mb-4 inline-flex rounded-full bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-200">
              Paid Report
            </div>
            <h3 className="text-xl font-semibold">Decision-ready output</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Convert interest into revenue by showing exactly what becomes
              available after upgrade: explanation, breakdown, priorities and
              stronger clarity.
            </p>
            <div className="mt-6">
              <Link
                href="/riskatlas/pricing"
                className="text-sm font-semibold text-emerald-300 hover:text-emerald-200"
              >
                Unlock Full Report →
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/5 p-6">
            <div className="mb-4 inline-flex rounded-full bg-amber-400/10 px-3 py-1 text-sm font-medium text-amber-200">
              Execution Upgrade
            </div>
            <h3 className="text-xl font-semibold">Higher-value monetization</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Give serious buyers a second step above the report, so RiskAtlas
              is not only a scanning tool, but the beginning of an execution
              service ladder.
            </p>
            <div className="mt-6">
              <Link
                href="/riskatlas/pricing"
                className="text-sm font-semibold text-amber-300 hover:text-amber-200"
              >
                See Execution Upgrade →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                What users should understand
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                RiskAtlas is not just a scan. It is a value ladder.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                The page should educate users in seconds:
                free scan for discovery, paid report for structured insight,
                execution upgrade for stronger operational actionability.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">
                <h3 className="text-lg font-semibold">
                  1. Discover exposure quickly
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Give prospects a practical first step with minimal resistance.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">
                <h3 className="text-lg font-semibold">
                  2. Pay for structured clarity
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  The report becomes the product users are paying for, not
                  merely the scan result.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-5">
                <h3 className="text-lg font-semibold">
                  3. Upgrade for execution support
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Premium monetization comes from helping users act, not only
                  observe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 lg:px-10">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-slate-900 to-emerald-500/10 p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Start here
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Choose your path inside RiskAtlas
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                Start with the free scan if you want a quick signal. Go straight
                to pricing if you already understand the value of deeper supply
                chain risk intelligence.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
              <Link
                href="/riskatlas/report"
                className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-6 py-3.5 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Run Free Risk Scan
              </Link>

              <Link
                href="/riskatlas/pricing"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
              >
                View Pricing
              </Link>

              <Link
                href="/riskatlas/pricing"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-6 py-3.5 text-base font-semibold text-emerald-200 transition hover:bg-emerald-400/15"
              >
                Unlock Full Report
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}