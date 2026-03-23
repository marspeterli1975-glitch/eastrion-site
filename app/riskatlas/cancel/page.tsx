import Link from "next/link";

export default function RiskAtlasCancelPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        <div className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300">
          Payment Cancelled
        </div>

        <h1 className="mt-6 text-5xl font-bold tracking-tight">
          Checkout was not completed
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
          No payment was taken. You can return to the pricing page and try again
          whenever you are ready.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/riskatlas/pricing"
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200"
          >
            Back to Pricing
          </Link>
          <Link
            href="/riskatlas/report"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:bg-white/10"
          >
            Return to Report
          </Link>
        </div>
      </div>
    </main>
  );
}