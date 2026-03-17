"use client";

import { useMemo, useState } from "react";

type ScanResponse = {
  session_id: string;
  analysis: {
    score: number;
    grade: string;
    exposure_level: string;
    dimensions: {
      country_risk: number;
      industry_sensitivity: number;
      logistics_complexity: number;
      event_disruption: number;
    };
    summary: string;
  };
  payment_status: string;
};

type CheckoutResponse = {
  checkout_url: string;
  checkout_session_id: string;
  payment_status: string;
  success_url?: string;
};

const popularCountries = ["India", "China", "Saudi Arabia", "USA"];
const popularIndustries = ["Battery", "Electronics", "Chemicals", "Logistics"];

export default function RiskAtlasPage() {
  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://global-risk-api.onrender.com";

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [error, setError] = useState("");
  const [scanResult, setScanResult] = useState<ScanResponse | null>(null);

  const canScan = useMemo(() => {
    return (
      companyName.trim().length > 1 &&
      email.trim().length > 5 &&
      country.trim().length > 1 &&
      industry.trim().length > 1
    );
  }, [companyName, email, country, industry]);

  const scoreTone = useMemo(() => {
    if (!scanResult) return "text-slate-900";
    const score = scanResult.analysis.score;
    if (score <= 20) return "text-emerald-700";
    if (score <= 40) return "text-sky-700";
    if (score <= 60) return "text-amber-700";
    if (score <= 80) return "text-orange-700";
    return "text-red-700";
  }, [scanResult]);

  async function handleScan() {
    if (!canScan) {
      setError("Please complete company name, email, country, and industry.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setScanResult(null);

      const res = await fetch(`${apiBase}/scan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          company_name: companyName.trim(),
          email: email.trim(),
          country: country.trim(),
          industry: industry.trim(),
          logistics_complexity: 3,
          event_disruption: 2,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Scan failed with HTTP ${res.status}`);
      }

      const data: ScanResponse = await res.json();
      setScanResult(data);
    } catch (err) {
      setError("Unable to complete the scan right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUnlockReport() {
    if (!scanResult?.session_id) {
      setError("No scan result available.");
      return;
    }

    try {
      setUnlocking(true);
      setError("");

      const res = await fetch(`${apiBase}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          session_id: scanResult.session_id,
          amount_cents: 4900,
          currency: "aud",
          product_name: "RiskAtlas Exposure Report",
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Checkout failed with HTTP ${res.status}`);
      }

      const data: CheckoutResponse = await res.json();

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
        return;
      }

      throw new Error("Missing checkout URL");
    } catch (err) {
      setError("Unable to start checkout right now. Please try again.");
    } finally {
      setUnlocking(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-[#eef2f1]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
          <a
            href="/"
            className="inline-flex items-center rounded-full bg-white px-7 py-4 text-base font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            Back to Home
          </a>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.7fr_1fr]">
            <div>
              <div className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Eastrion — Structured Supply Chain Risk Intelligence
              </div>

              <h1 className="text-6xl font-semibold leading-[0.92] tracking-tight text-slate-950 md:text-8xl">
                RiskAtlas
              </h1>

              <p className="mt-6 max-w-4xl text-2xl leading-10 text-slate-600">
                A practical exposure scanner for global SMEs across sourcing, logistics,
                manufacturing corridors, and cross-border operating environments.
              </p>

              <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-700">
                Identify hidden supply chain exposure before it becomes cost.
              </p>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
                  <div className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Use Case
                  </div>
                  <div className="text-2xl font-semibold leading-9 tracking-tight text-slate-950">
                    Supplier & corridor pre-screening
                  </div>
                </div>

                <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
                  <div className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Output
                  </div>
                  <div className="text-2xl font-semibold leading-9 tracking-tight text-slate-950">
                    Structured scan + exportable PDF
                  </div>
                </div>

                <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
                  <div className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Positioning
                  </div>
                  <div className="text-2xl font-semibold leading-9 tracking-tight text-slate-950">
                    Exposure scanner, not legal or investment advice
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[36px] bg-[#22346f] p-8 text-white shadow-sm">
              <div className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                What this scans
              </div>
              <ul className="space-y-4 text-xl leading-9 text-white/95">
                <li>• Country operating exposure</li>
                <li>• Industry sensitivity</li>
                <li>• Logistics complexity</li>
                <li>• Event-linked disruption risk</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Scanner */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="rounded-[36px] bg-[#f5f6f7] p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Scanner
              </div>
              <h2 className="text-5xl font-semibold tracking-tight text-slate-950">
                Run Risk Scan
              </h2>
            </div>

            <div className="text-xl leading-10 text-slate-500">
              Enter a company, country, and industry to generate an initial supply chain
              exposure scan.
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-3 block text-2xl font-semibold text-slate-950">
                Company Name
              </label>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Test Battery Co"
                className="w-full rounded-[28px] border-0 bg-[#0f1a57] px-7 py-5 text-2xl text-white placeholder:text-slate-400 outline-none ring-1 ring-transparent focus:ring-slate-300"
              />
            </div>

            <div>
              <label className="mb-3 block text-2xl font-semibold text-slate-950">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. name@company.com"
                className="w-full rounded-[28px] border-0 bg-[#0f1a57] px-7 py-5 text-2xl text-white placeholder:text-slate-400 outline-none ring-1 ring-transparent focus:ring-slate-300"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-3 block text-2xl font-semibold text-slate-950">
                Country
              </label>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. India"
                className="w-full rounded-[28px] border-0 bg-[#0f1a57] px-7 py-5 text-2xl text-white placeholder:text-slate-400 outline-none ring-1 ring-transparent focus:ring-slate-300"
              />
            </div>

            <div>
              <label className="mb-3 block text-2xl font-semibold text-slate-950">
                Industry
              </label>
              <input
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Battery"
                className="w-full rounded-[28px] border-0 bg-[#0f1a57] px-7 py-5 text-2xl text-white placeholder:text-slate-400 outline-none ring-1 ring-transparent focus:ring-slate-300"
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Popular Countries
            </div>
            <div className="flex flex-wrap gap-3">
              {popularCountries.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCountry(item)}
                  className="rounded-full bg-white px-6 py-3 text-xl font-semibold text-slate-900 ring-1 ring-slate-200 transition hover:bg-slate-50"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Popular Industries
            </div>
            <div className="flex flex-wrap gap-3">
              {popularIndustries.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setIndustry(item)}
                  className="rounded-full bg-white px-6 py-3 text-xl font-semibold text-slate-900 ring-1 ring-slate-200 transition hover:bg-slate-50"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mt-8 rounded-[24px] border border-red-200 bg-red-50 px-6 py-4 text-base text-red-700">
              {error}
            </div>
          )}

          <div className="mt-8">
            <button
              type="button"
              onClick={handleScan}
              disabled={loading}
              className="inline-flex items-center rounded-full bg-gradient-to-r from-[#183a72] to-[#a9c9cd] px-10 py-5 text-2xl font-semibold text-white shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Running..." : "Run Free Risk Scan"}
            </button>
          </div>

          {/* Result Block */}
          {scanResult && (
            <div className="mt-12 rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Initial Exposure Result
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <h3 className="text-4xl font-semibold tracking-tight text-slate-950">
                    Exposure Score Preview
                  </h3>

                  <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                    This free scan gives you an initial view of structural exposure. Unlock the
                    full PDF report for strategic interpretation and action guidance.
                  </p>

                  <div className="mt-8 grid gap-5 md:grid-cols-3">
                    <div className="rounded-[24px] bg-[#f5f6f7] p-6">
                      <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Score
                      </div>
                      <div className={`mt-3 text-5xl font-semibold tracking-tight ${scoreTone}`}>
                        {scanResult.analysis.score}
                      </div>
                    </div>

                    <div className="rounded-[24px] bg-[#f5f6f7] p-6">
                      <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Grade
                      </div>
                      <div className="mt-3 text-5xl font-semibold tracking-tight text-slate-950">
                        {scanResult.analysis.grade}
                      </div>
                    </div>

                    <div className="rounded-[24px] bg-[#f5f6f7] p-6">
                      <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Exposure
                      </div>
                      <div className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
                        {scanResult.analysis.exposure_level}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 rounded-[24px] bg-[#f5f6f7] p-6">
                    <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Scan Interpretation
                    </div>
                    <p className="mt-3 text-lg leading-8 text-slate-700">
                      {scanResult.analysis.summary}
                    </p>
                  </div>
                </div>

                <div className="rounded-[28px] bg-[#22346f] p-8 text-white">
                  <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">
                    Full Report Unlock
                  </div>

                  <h4 className="text-3xl font-semibold tracking-tight">
                    Structured PDF delivery
                  </h4>

                  <p className="mt-4 text-lg leading-8 text-white/85">
                    Unlock the full consulting-style report with score breakdown, structural risk
                    signals, and strategic actions.
                  </p>

                  <div className="mt-8">
                    <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
                      Price
                    </div>
                    <div className="mt-2 text-5xl font-semibold tracking-tight">A$49</div>
                  </div>

                  <button
                    type="button"
                    onClick={handleUnlockReport}
                    disabled={unlocking}
                    className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-lg font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {unlocking ? "Redirecting..." : "Unlock Full Report"}
                  </button>

                  <div className="mt-6 text-sm leading-7 text-white/70">
                    Includes structured PDF output, score interpretation, and secure download delivery.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
