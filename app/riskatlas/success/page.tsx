import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export const dynamic = "force-dynamic";

export default function RiskAtlasSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#020b2a] text-white">
          <section className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-20">
            <div className="text-center">
              <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200">
                Loading
              </div>
              <h1 className="mt-6 text-4xl font-semibold text-white">
                Preparing success page...
              </h1>
            </div>
          </section>
        </main>
      }
    >
      <SuccessClient />
    </Suspense>
  );
}