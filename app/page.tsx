iimport Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#0f172a] via-[#0b1020] to-[#0b1020]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_left,rgba(16,185,129,0.14),transparent_24%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-8 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-5 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-sm text-cyan-200">
                Eastrion · AI Supply Chain Infrastructure
              </div>

              <h1 className="max-w-5xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Start with RiskAtlas, then expand into real supply chain execution.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                RiskAtlas is the entry layer of Eastrion’s supply chain intelligence model.
                It helps global SMEs identify risk exposure across country, supplier, route
                and execution layers before moving into sourcing, logistics coordination,
                industrial trade support and deeper commercial engagement.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/riskatlas"
                  className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-6 py-3.5 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Start Risk Assessment
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  Contact Eastrion
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-400">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  Product-led entry
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  Service-backed execution
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  AI-native risk infrastructure
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <div className="mb-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  RiskAtlas Flow
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  From signal to action
                </h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-[#10182b] p-4">
                  <p className="text-sm font-semibold text-cyan-300">Step 1 · Entry</p>
                  <h3 className="mt-1 text-lg font-semibold">Initial Risk Signal</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Start with a lightweight exposure review to frame where the main
                    supply chain risks may be concentrated.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#10182b] p-4">
                  <p className="text-sm font-semibold text-emerald-300">Step 2 · Product</p>
                  <h3 className="mt-1 text-lg font-semibold">Unlock the Full Report</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Convert a general signal into a structured report with explanation,
                    factor breakdown and action priorities.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#10182b] p-4">
                  <p className="text-sm font-semibold text-amber-300">Step 3 · Service</p>
                  <h3 className="mt-1 text-lg font-semibold">Move into Execution</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Where the case requires it, Eastrion can support supplier discussion,
                    logistics coordination and structured commercial follow-up.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/riskatlas"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Enter RiskAtlas
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0d1326]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Why Eastrion can do this
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Risk intelligence only matters when it is connected to real execution.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Eastrion is not positioning RiskAtlas as an isolated software widget.
              The product is grounded in real cross-border supply chain work, where
              supplier ambiguity, logistics disruption, corridor volatility and execution
              friction directly affect commercial outcomes.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 inline-flex rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-200">
                Industrial context
              </div>
              <h3 className="text-xl font-semibold">Real operating cases</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                The framework is informed by practical sourcing, industrial equipment,
                battery recycling and cross-border execution scenarios.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 inline-flex rounded-full bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-200">
                Execution lens
              </div>
              <h3 className="text-xl font-semibold">More than theoretical scoring</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Risk is framed through cost, timing, supplier concentration, route
                dependency and commercial exposure — not just abstract headlines.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 inline-flex rounded-full bg-amber-400/10 px-3 py-1 text-sm font-medium text-amber-200">
                Hybrid model
              </div>
              <h3 className="text-xl font-semibold">Product + service architecture</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                RiskAtlas captures attention and structures the problem. Eastrion’s
                services help move qualified opportunities into actual execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0b1020]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Solutions
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Eastrion supports the workflow beyond the assessment.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              RiskAtlas is the entry point, but not the whole business. For qualified
              cases, Eastrion can continue supporting execution through service lines that
              match your actual commercial needs.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Module 01
              </p>
              <h3 className="text-2xl font-semibold">Risk Exposure Scanning</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Initial country-industry-supplier-route exposure framing through the
                RiskAtlas logic and structured reporting pathway.
              </p>
              <div className="mt-6">
                <Link
                  href="/riskatlas"
                  className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
                >
                  Enter RiskAtlas →
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Module 02
              </p>
              <h3 className="text-2xl font-semibold">Sourcing & Industrial Trade</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Structured support for supplier discovery, industrial product matching,
                technical coordination and project-oriented trade opportunities.
              </p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-emerald-300 hover:text-emerald-200"
                >
                  Contact Eastrion →
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Module 03
              </p>
              <h3 className="text-2xl font-semibold">Logistics & Execution Support</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Cross-border shipment coordination, execution follow-up, planning logic
                and supply chain communication support where corridor risk matters.
              </p>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-amber-300 hover:text-amber-200"
                >
                  Contact Eastrion →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 lg:px-10">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-slate-900 to-emerald-500/10 p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  Start here
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Choose the right entry point for your next step.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                  Use RiskAtlas if you want a structured starting point for risk visibility.
                  Contact Eastrion directly if your case already involves sourcing,
                  logistics, industrial products or cross-border execution support.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Link
                  href="/riskatlas"
                  className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-6 py-3.5 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Enter RiskAtlas
                </Link>

                <Link
                  href="/riskatlas/pricing"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  View Pricing
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-6 py-3.5 text-base font-semibold text-emerald-200 transition hover:bg-emerald-400/15"
                >
                  Contact Eastrion
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}