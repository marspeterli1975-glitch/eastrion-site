"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { unlockPlan, type UnlockPlan } from "@/lib/payment-unlock";

type VerifyResponse = {
  ok: true;
  sessionId: string;
  paid: boolean;
  status: string | null;
  payment_status: string | null;
  plan: UnlockPlan;
  customer_email: string | null;
  amount_total: number | null;
  currency: string | null;
};

type VerifyErrorResponse = {
  error: string;
};

function isVerifyResponse(
  data: VerifyResponse | VerifyErrorResponse
): data is VerifyResponse {
  return "ok" in data;
}

export default function SuccessClient() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);
  const [plan, setPlan] = useState<UnlockPlan>("pro");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function verifySession() {
      if (!sessionId) {
        setError("Missing session_id in success URL.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/verify-checkout-session?session_id=${encodeURIComponent(
            sessionId
          )}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = (await response.json()) as
          | VerifyResponse
          | VerifyErrorResponse;

        if (!response.ok) {
          throw new Error(
            isVerifyResponse(data) ? "Failed to verify session." : data.error
          );
        }

        if (!isVerifyResponse(data)) {
          throw new Error("Invalid session verification response.");
        }

        if (!mounted) return;

        if (data.paid) {
          unlockPlan(data.plan, data.sessionId);
          setPaid(true);
          setPlan(data.plan);
        } else {
          setPaid(false);
          setPlan(data.plan);
          setError("Payment has not been confirmed as paid.");
        }
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setError(
          err instanceof Error ? err.message : "Unable to verify payment."
        );
      } finally {
        if (mounted) setLoading(false);
      }
    }

    verifySession();

    return () => {
      mounted = false;
    };
  }, [sessionId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
          <div className="animate-pulse rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-lg text-slate-300">
            Verifying your payment...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
        {paid ? (
          <>
            <div className="rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 text-sm font-semibold text-green-300">
              Payment Successful
            </div>

            <h1 className="mt-6 text-5xl font-bold tracking-tight">
              Your{" "}
              {plan === "execution"
                ? "Execution Upgrade"
                : "Professional Report"}{" "}
              is unlocked
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Stripe confirmed the payment and this browser has been marked as
              unlocked. The next step is to connect this unlock state to a
              database-backed user system.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/riskatlas/report"
                className="rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
              >
                Return to Report
              </Link>
              <Link
                href="/riskatlas/pricing"
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:bg-white/10"
              >
                Back to Pricing
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300">
              Payment Not Confirmed
            </div>

            <h1 className="mt-6 text-5xl font-bold tracking-tight">
              We could not confirm this payment yet
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              {error || "Please return to pricing and try again."}
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
          </>
        )}
      </div>
    </main>
  );
}