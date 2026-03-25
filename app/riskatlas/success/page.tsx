"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type UnlockState = {
  pro?: boolean;
  execution?: boolean;
  lastSessionId?: string;
  lastPaidAt?: string;
};

type VerifyResponse = {
  paid?: boolean;
  status?: string;
  sessionId?: string;
  customerEmail?: string | null;
};

export default function RiskAtlasSuccessPage() {
  const [mounted, setMounted] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setMounted(true);

    async function verifyPayment() {
      try {
        const params = new URLSearchParams(window.location.search);
        const session = params.get("session_id") || "";
        setSessionId(session);

        if (!session) {
          setVerified(false);
          setErrorMessage("Missing Stripe session ID.");
          return;
        }

        const response = await fetch(`/api/verify-checkout-session?session_id=${encodeURIComponent(session)}`, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to verify checkout session.");
        }

        const data: VerifyResponse = await response.json();

        const paid = !!data?.paid || data?.status === "paid";

        if (!paid) {
          setVerified(false);
          setErrorMessage("Payment has not been confirmed yet.");
          return;
        }

        const nowIso = new Date().toISOString();

        const unlockState: UnlockState = {
          pro: true,
          execution: false,
          lastSessionId: session,
          lastPaidAt: nowIso,
        };

        localStorage.setItem("riskatlas_unlock_state", JSON.stringify(unlockState));

        setVerified(true);
        setCustomerEmail(data?.customerEmail || null);
      } catch (error) {
        console.error(error);
        setVerified(false);
        setErrorMessage("Unable to verify your payment at the moment.");
      } finally {
        setVerifying(false);
      }
    }

    verifyPayment();
  }, []);

  const paidAtDisplay = useMemo(() => {
    if (!mounted || !verified) return "";
    try {
      const raw = localStorage.getItem("riskatlas_unlock_state");
      if (!raw) return "";
      const parsed: UnlockState = JSON.parse(raw);
      if (!parsed?.lastPaidAt) return "";
      return new Date(parsed.lastPaidAt).toLocaleString();
    } catch {
      return "";
    }
  }, [mounted, verified]);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#07111f] text-white">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-64 rounded bg-white/10" />
            <div className="h-40 rounded-3xl bg-white/10" />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-32 rounded-3xl bg-white/10" />
              <div className="h-32 rounded-3xl bg-white/10" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_28%),linear-gradient(180deg,#08111f_0%,#07111f_100%)]">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
            RiskAtlas Payment Status
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">
            {verifying
              ? "Verifying your payment..."
              : verified
              ? "Professional Report unlocked"
              : "Payment confirmation needs attention"}
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
            {verifying
              ? "Please wait while RiskAtlas confirms your Stripe checkout session and activates your Professional access on this browser."
              : verified
              ? "Your payment has been confirmed. The Professional Report is now active in this browser, and you can open the unlocked report immediately."
              : "We could not fully confirm your payment status from this page. Your checkout may still be valid, but this session needs verification before access can be confirmed."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        {verifying ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <div className="text-sm text-slate-300">Checking Stripe session and updating access state...</div>
          </div>
        ) : verified ? (
          <div className="space-y-6">
            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-8">
              <div className="text-xs uppercase tracking-[0.18em] text-emerald-300">Payment confirmed</div>
              <h2 className="mt-2 text-2xl font-semibold">Professional access is active</h2>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                Your US$49 purchase has unlocked the Professional Report. This browser now has access to the paid report layer.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Session ID</div>
                  <div className="mt-2 break-all text-sm text-slate-200">
                    {sessionId || "Not available"}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Activated at</div>
                  <div className="mt-2 text-sm text-slate-200">{paidAtDisplay || "Just now"}</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 md:col-span-2">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Customer email</div>
                  <div className="mt-2 text-sm text-slate-200">{customerEmail || "Not returned by checkout session"}</div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-cyan-300">Next action</div>
                <h3 className="mt-3 text-xl font-semibold">Open your unlocked report</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  The main deliverable is now available inside the report page. Open it to view the Professional content block and structured advisory layer.
                </p>

                <div className="mt-6">
                  <Link
                    href="/riskatlas/report"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                  >
                    Open Professional Report
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-amber-400/20 bg-amber-400/5 p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-amber-300">Download status</div>
                <h3 className="mt-3 text-xl font-semibold">PDF download is not live yet</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Your purchase currently unlocks the browser-based Professional Report view. A direct downloadable PDF output has not yet been wired into this beta flow.
                </p>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
                  Current beta delivery:
                  <div className="mt-2 space-y-2 text-slate-400">
                    <div>• Paid access to Professional Report content</div>
                    <div>• Stripe payment confirmation</div>
                    <div>• Browser-based unlock via local storage</div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-slate-400">
                  The next product step is to add a true report export layer with a download button.
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0a1526] p-6 md:p-8">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Beta clarification</div>
              <h3 className="mt-3 text-xl font-semibold">What the customer receives right now</h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                In the current beta, payment unlocks the enhanced report experience rather than generating a downloadable file. This is commercially acceptable for an early paid beta, but the next upgrade should add a visible export or download action so the product feels more complete after checkout.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/riskatlas/report"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                >
                  Go to Report
                </Link>

                <Link
                  href="/riskatlas"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Back to RiskAtlas
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-3xl border border-red-400/20 bg-red-400/10 p-6 md:p-8">
              <div className="text-xs uppercase tracking-[0.18em] text-red-300">Verification incomplete</div>
              <h2 className="mt-2 text-2xl font-semibold">We could not confirm this checkout session</h2>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                {errorMessage || "The payment status could not be confirmed from this page."}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Troubleshooting</div>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <div>• Refresh this page once</div>
                  <div>• Return to the report page and check whether Professional access is already active</div>
                  <div>• Confirm the Stripe session returned to the correct success URL</div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Next actions</div>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/riskatlas/report"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                  >
                    Check Report Access
                  </Link>

                  <Link
                    href="/riskatlas"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                  >
                    Back to RiskAtlas
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}