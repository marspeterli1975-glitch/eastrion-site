"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ReportPage() {
  const [unlocked, setUnlocked] = useState<"none" | "pro" | "execution">("none");

  useEffect(() => {
    const status = localStorage.getItem("riskatlas_unlock");
    if (status === "pro" || status === "execution") {
      setUnlocked(status);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#0b1020] text-white px-6 py-12">

      {/* 1️⃣ 风险评分（焦虑入口） */}
      <section className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Your Supply Chain Risk Score
        </h1>

        <div className="text-6xl font-bold text-amber-400 mb-2">B</div>

        <p className="text-slate-300 text-lg">
          Your current structure shows **moderate exposure with hidden execution risks**.
          Most issues are not yet visible, but they are forming.
        </p>
      </section>

      {/* 2️⃣ 免费内容 */}
      <section className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold mb-4">Free Insight</h2>

        <ul className="space-y-2 text-slate-300">
          <li>• Country-level risk exposure detected</li>
          <li>• Supplier dependency risk identified</li>
          <li>• Logistics corridor volatility present</li>
        </ul>
      </section>

      {/* 3️⃣ 🔒 锁内容 */}
      <section className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold mb-4">
          🔒 Full Risk Breakdown (Locked)
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-slate-400 mb-4">
            Upgrade to unlock:
          </p>

          <ul className="space-y-2 text-slate-400">
            <li>• Score explanation (why B, not A)</li>
            <li>• Risk factor weight breakdown</li>
            <li>• Supplier-specific vulnerabilities</li>
            <li>• Route-level disruption scenarios</li>
            <li>• Priority action plan</li>
          </ul>
        </div>
      </section>

      {/* 4️⃣ 对比 */}
      <section className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold mb-6">
          Free vs Professional Report
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="border border-white/10 rounded-xl p-6 bg-white/5">
            <h3 className="text-lg font-semibold mb-3">Free</h3>
            <ul className="text-slate-400 space-y-2 text-sm">
              <li>✓ Basic risk signal</li>
              <li>✓ Limited visibility</li>
              <li>✗ No explanation</li>
              <li>✗ No action plan</li>
            </ul>
          </div>

          <div className="border border-cyan-400/30 rounded-xl p-6 bg-cyan-400/5">
            <h3 className="text-lg font-semibold mb-3 text-cyan-300">
              Professional ($49)
            </h3>
            <ul className="text-slate-200 space-y-2 text-sm">
              <li>✓ Full explanation</li>
              <li>✓ Risk structure clarity</li>
              <li>✓ Action priorities</li>
              <li>✓ Decision-ready insight</li>
            </ul>
          </div>

        </div>
      </section>

      {/* 5️⃣ CTA（多点） */}
      <section className="max-w-5xl mx-auto mt-12 text-center">

        <h2 className="text-2xl font-semibold mb-4">
          Unlock your full risk picture
        </h2>

        <p className="text-slate-400 mb-6">
          Most supply chain failures are predictable — but ignored.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">

          <Link
            href="/riskatlas/pricing"
            className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold"
          >
            Unlock Full Report ($49)
          </Link>

          <Link
            href="/riskatlas/pricing?plan=execution"
            className="border border-white/20 px-6 py-3 rounded-xl"
          >
            Upgrade to Execution ($149)
          </Link>

        </div>
      </section>

      {/* 6️⃣ 不行动的代价 */}
      <section className="max-w-5xl mx-auto mt-16">
        <div className="border border-red-400/20 bg-red-400/5 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-red-300 mb-2">
            If you ignore this
          </h3>

          <p className="text-slate-300 text-sm">
            Your supply chain will likely continue operating under hidden risks —
            until they convert into cost, delay, or supplier failure.
          </p>
        </div>
      </section>

    </main>
  );
}