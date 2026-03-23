"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type PlanKey = "pro" | "execution";

const plans = {
  pro: {
    name: "Professional Report",
    price: 49,
    desc: "Commercial decision layer",
    features: [
      "Full report unlock",
      "Executive summary expansion",
      "Priority action plan",
      "Full factor interpretation",
      "Download-ready format",
    ],
  },
  execution: {
    name: "Execution Upgrade",
    price: 149,
    desc: "Risk + loading plan linkage",
    features: [
      "Loading plan constraints",
      "Scenario analysis",
      "Supplier × route exposure map",
      "Execution planning logic",
      "Operational decision support",
    ],
  },
} as const;

export default function CheckoutClient() {
  const params = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const plan = (params.get("plan") || "pro") as PlanKey;
  const selected = plans[plan] || plans.pro;

  async function handleProceedToPayment() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to create checkout session.");
      }

      if (!data?.url) {
        throw new Error("Stripe checkout URL was not returned.");
      }

      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to start Stripe checkout."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#eef1f4] text-slate-900">
      <div className="mx-auto max-w-4xl px-6 py-14">
        <h1 className="text-center text-5xl font-bold tracking-tight">
          Confirm Your Upgrade
        </h1>

        <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-[#071332] p-8 text-white shadow-xl">
          <h2 className="text-4xl font-semibold">{selected.name}</h2>
          <p className="mt-2 text-lg text-slate-300">{selected.desc}</p>

          <div className="mt-8 text-6xl font-semibold">US${selected.price}</div>

          <ul className="mt-8 space-y-3 text-2xl leading-10">
            {selected.features.map((feature) => (
              <li key={feature}>• {feature}</li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap gap-4">
          <button
            onClick={handleProceedToPayment}
            disabled={loading}
            className="rounded-full bg-green-500 px-8 py-4 text-2xl font-semibold text-white transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Redirecting..." : "Proceed to Payment"}
          </button>

          <button
            onClick={() => router.push("/riskatlas/pricing")}
            disabled={loading}
            className="rounded-full bg-slate-800 px-8 py-4 text-2xl font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Back
          </button>
        </div>

        {error ? (
          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-base text-red-700">
            {error}
          </div>
        ) : null}

        <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-500">
          You will be redirected to Stripe Checkout to complete payment securely.
        </p>
      </div>
    </main>
  );
}