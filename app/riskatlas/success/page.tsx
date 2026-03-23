import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export const dynamic = "force-dynamic";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 text-white">
          <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
            <div className="animate-pulse rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-lg text-slate-300">
              Loading payment result...
            </div>
          </div>
        </main>
      }
    >
      <SuccessClient />
    </Suspense>
  );
}