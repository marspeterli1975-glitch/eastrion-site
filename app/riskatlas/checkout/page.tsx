import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#eef1f4] text-slate-900">
          <div className="mx-auto max-w-4xl px-6 py-14">
            <div className="animate-pulse rounded-3xl bg-white/60 p-10 text-center text-2xl text-slate-500">
              Loading checkout...
            </div>
          </div>
        </main>
      }
    >
      <CheckoutClient />
    </Suspense>
  );
}