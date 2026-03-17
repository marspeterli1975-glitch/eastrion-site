export default function CancelPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <section className="bg-[#eef2f1]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="max-w-4xl">
            <div className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              RiskAtlas Payment
            </div>

            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight text-slate-950 md:text-7xl">
              Payment cancelled.
              <br />
              No order has been
              <br />
              completed.
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-600">
              Your checkout session was not completed. No payment has been captured, and no report has been delivered.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-[#183a72] to-[#4db7b2] px-7 py-4 text-base font-semibold text-white shadow-sm transition hover:opacity-95"
              >
                Return to Home
              </a>

              <a
                href="/"
                className="inline-flex items-center rounded-full bg-white px-7 py-4 text-base font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
              >
                Restart RiskAtlas
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Status Cards */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Current Status
            </div>
            <div className="text-3xl font-semibold tracking-tight text-slate-950">
              Cancelled
            </div>
            <p className="mt-4 text-base leading-7 text-slate-600">
              The checkout process was interrupted or closed before payment completion.
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Payment Result
            </div>
            <div className="text-3xl font-semibold tracking-tight text-slate-950">
              No Charge
            </div>
            <p className="mt-4 text-base leading-7 text-slate-600">
              No final payment confirmation was received through the Stripe workflow.
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Delivery Status
            </div>
            <div className="text-3xl font-semibold tracking-tight text-slate-950">
              No Report
            </div>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Since no completed payment was verified, the report has not been generated for download.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Retry
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Restart the scan flow
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              You can return to RiskAtlas and run the same scan again whenever you are ready.
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Commercial Review
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Adjust before purchase
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              If needed, revise the scan parameters or confirm that this report matches the intended scope.
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Support
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Return to the website
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Navigate back to the main site and restart the product journey from the RiskAtlas entry point.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <a
            href="/"
            className="inline-flex items-center text-base font-medium text-slate-500 transition hover:text-slate-900"
          >
            ← Back to Home
          </a>
        </div>
      </section>
    </main>
  );
}
