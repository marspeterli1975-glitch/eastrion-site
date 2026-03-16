export default function CancelPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <a
          href="/"
          className="mb-8 inline-block text-sm font-medium text-slate-500 hover:text-slate-800"
        >
          ← Back to Home
        </a>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200 text-slate-700 text-2xl">
            !
          </div>

          <h1 className="mb-3 text-3xl font-semibold tracking-tight">
            Payment Cancelled
          </h1>

          <p className="mb-6 text-slate-600">
            No payment was completed. You can return to RiskAtlas and restart the scan anytime.
          </p>

          <a
            href="/"
            className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Return to Home
          </a>
        </div>
      </section>
    </main>
  );
}
