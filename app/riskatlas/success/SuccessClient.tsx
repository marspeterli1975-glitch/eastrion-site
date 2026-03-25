"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type UnlockState = {
  pro: boolean;
  execution: boolean;
  lastSessionId?: string;
  lastPaidAt?: string;
};

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);
  const [message, setMessage] = useState("Checking payment status...");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setPaid(false);
        setMessage("Missing session_id in success URL.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `/api/verify-checkout-session?session_id=${encodeURIComponent(
            sessionId
          )}`,
          { cache: "no-store" }
        );

        const data = await res.json();

        if (!res.ok || !data?.ok) {
          setPaid(false);
          setMessage(data?.error || "Unable to verify payment.");
          setLoading(false);
          return;
        }

        if (data.paid) {
          const plan = data?.metadata?.plan;

          const currentRaw = localStorage.getItem("riskatlas_unlock_state");
          let current: UnlockState = {
            pro: false,
            execution: false,
          };

          if (currentRaw) {
            try {
              current = JSON.parse(currentRaw);
            } catch {
              current = { pro: false, execution: false };
            }
          }

          const nextState: UnlockState = {
            ...current,
            pro: plan === "pro" ? true : current.pro,
            execution: plan === "execution" ? true : current.execution,
            lastSessionId: data.sessionId,
            lastPaidAt: new Date().toISOString(),
          };

          localStorage.setItem(
            "riskatlas_unlock_state",
            JSON.stringify(nextState)
          );

          setPaid(true);
          setMessage("Payment confirmed and unlock state saved.");
        } else {
          setPaid(false);
          setMessage("Payment not completed yet.");
        }
      } catch (error) {
        console.error("Success page verification error:", error);
        setPaid(false);
        setMessage("Verification request failed.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  return (
    <main className="min-h-screen bg-[#020b2a] text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-20">
        <div className="w-full max-w-3xl text-center">
          <div
            className={`inline-flex rounded-full border px-4 py-2 text-sm font-medium ${
              loading
                ? "border-cyan-400/20 bg-cyan-500/10 text-cyan-200"
                : paid
                ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
                : "border-amber-400/20 bg-amber-500/10 text-amber-200"
            }`}
          >
            {loading
              ? "Verifying Payment"
              : paid
              ? "Payment Successful"
              : "Payment Not Confirmed"}
          </div>

          <h1 className="mt-8 text-5xl font-semibold leading-tight tracking-tight text-white lg:text-7xl">
            {loading
              ? "Checking your payment status"
              : paid
              ? "Your Professional Report is unlocked"
              : "We could not confirm this payment yet"}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            {message}
          </p>

          {sessionId ? (
            <p className="mt-4 break-all text-sm text-slate-500">
              Session ID: {sessionId}
            </p>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/riskatlas/report"
              className="rounded-2xl bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Return to Report
            </Link>

            <Link
              href="/riskatlas/pricing"
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-medium text-white transition hover:bg-white/10"
            >
              Back to Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}