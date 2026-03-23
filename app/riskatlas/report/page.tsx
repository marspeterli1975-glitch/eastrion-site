"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getUnlockState } from "@/lib/payment-unlock";
import {
  buildDemoReport,
  getGrade,
  loadRiskReportFromStorage,
  type ActionPriority,
  type ReportData,
} from "@/lib/risk-report-storage";

const API_BASE =
  process.env.NEXT_PUBLIC_RISK_API_BASE_URL?.replace(/\/$/, "") || "";

function getScoreColor(score: number) {
  if (score <= 20) return "bg-emerald-500";
  if (score <= 40) return "bg-lime-500";
  if (score <= 60) return "bg-amber-500";
  if (score <= 80) return "bg-orange-500";
  return "bg-red-500";
}

function getPriorityTone(priority: ActionPriority) {
  if (priority === "Immediate") return "bg-red-100 text-red-700 border-red-200";
  if (priority === "High") return "bg-orange-100 text-orange-700 border-orange-200";
  if (priority === "Medium") return "bg-amber-100 text-amber-700 border-amber-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
}

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
    </div>
  );
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-medium text-slate-200">{value}</div>
    </div>
  );
}

function MetaBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-500">{title}</div>
      <div className="mt-2 text-sm leading-6 text-slate-300">{value}</div>
    </div>
  );
}

function ValueCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
      <div className="text-sm font-semibold text-white">{title}</div>
      <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
    </div>
  );
}

function LockedCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-[11px] font-medium text-cyan-300">
          Premium
        </span>
      </div>
      <p className="text-sm leading-6 text-slate-300">{description}</p>
      <div className="mt-4">
        <Link
          href="/riskatlas/pricing"
          className="inline-flex rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white hover:bg-white/10"
        >
          Unlock Module
        </Link>
      </div>
    </div>
  );
}

function MiniRiskBar({ score }: { score: number }) {
  const width = `${Math.max(4, Math.min(score, 100))}%`;

  return (
    <div className="w-full max-w-[160px]">
      <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
        <span>Exposure</span>
        <span>{score}/100</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full ${getScoreColor(score)}`} style={{ width }} />
      </div>
    </div>
  );
}

function ScoreDial({ score, grade }: { score: number; grade: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mt-2 flex h-56 w-56 items-center justify-center rounded-full border-[18px] border-white/10 bg-slate-950">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Score</div>
          <div className="mt-1 text-5xl font-semibold text-white">{score}</div>
          <div className="mt-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
            Grade {grade}
          </div>
        </div>
      </div>

      <div className="mt-3 w-full max-w-[260px]">
        <div className="mb-2 flex justify-between text-[11px] uppercase tracking-wide text-slate-500">
          <span>A</span>
          <span>B</span>
          <span>C</span>
          <span>D</span>
          <span>E</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/10">
          <div className="flex h-full">
            <div className="h-full w-1/5 bg-emerald-500" />
            <div className="h-full w-1/5 bg-lime-500" />
            <div className="h-full w-1/5 bg-amber-500" />
            <div className="h-full w-1/5 bg-orange-500" />
            <div className="h-full w-1/5 bg-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RiskReportPage() {
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [useDemo, setUseDemo] = useState(false);
  const [error, setError] = useState("");
  const [unlockState, setUnlockState] = useState({
    pro: false,
    execution: false,
  });

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      setLoading(true);
      setError("");

      if (mounted) {
        setUnlockState(getUnlockState());
      }

      const cachedReport = loadRiskReportFromStorage();
      if (cachedReport) {
        if (!mounted) return;
        setReport(cachedReport);
        setUseDemo(false);
        setLoading(false);
        return;
      }

      try {
        if (!API_BASE) {
          if (!mounted) return;
          setUseDemo(true);
          setReport(buildDemoReport());
          setError("No saved scan result found. Demo data is being used for preview.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE}/risk-report-preview`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const safeScore =
          typeof data?.overall_score === "number" ? data.overall_score : 37;
        const mapped = getGrade(safeScore);

        const normalized: ReportData = {
          report_id: data?.report_id || "RA-LIVE-UNKNOWN",
          company_name: data?.company_name || "Client",
          route_name: data?.route_name || "Unknown Route",
          product_name: data?.product_name || "Unknown Product",
          generated_at: data?.generated_at || new Date().toISOString(),
          overall_score: safeScore,
          grade: data?.grade || mapped.grade,
          risk_level: data?.risk_level || mapped.level,
          executive_summary:
            data?.executive_summary ||
            "Risk report loaded successfully, but summary content is incomplete.",
          decision_note:
            data?.decision_note ||
            "Proceed only after reviewing key operational and supplier-side controls.",
          score_definition:
            data?.score_definition ||
            "RiskAtlas score ranges from 0 to 100. Lower is better. 0–20 = A, 21–40 = B, 41–60 = C, 61–80 = D, 81–100 = E.",
          confidence_note:
            data?.confidence_note ||
            "Confidence note unavailable. Connect more structured inputs for stronger reliability.",
          factors: Array.isArray(data?.factors) ? data.factors : [],
          actions: Array.isArray(data?.actions) ? data.actions : [],
          premium_preview: {
            loading_plan_summary:
              data?.premium_preview?.loading_plan_summary ||
              "Premium version unlocks loading-plan execution logic.",
            scenario_outlook:
              data?.premium_preview?.scenario_outlook ||
              "Premium version unlocks scenario analysis.",
            supplier_port_exposure:
              data?.premium_preview?.supplier_port_exposure ||
              "Premium version unlocks exposure mapping.",
            commercial_note:
              data?.premium_preview?.commercial_note ||
              "Paid report unlocks the executable version.",
          },
        };

        if (!mounted) return;
        setReport(normalized);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setUseDemo(true);
        setError(
          "Live API unavailable. The page is showing demo data so you can continue UI testing."
        );
        setReport(buildDemoReport());
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const gradeInfo = useMemo(() => {
    return getGrade(report?.overall_score ?? 0);
  }, [report]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-64 rounded bg-slate-800" />
            <div className="h-40 rounded-3xl bg-slate-900" />
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="h-64 rounded-3xl bg-slate-900" />
              <div className="h-64 rounded-3xl bg-slate-900 lg:col-span-2" />
            </div>
            <div className="h-80 rounded-3xl bg-slate-900" />
          </div>
        </div>
      </main>
    );
  }

  if (!report) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8">
            <h1 className="text-2xl font-semibold">Risk report unavailable</h1>
            <p className="mt-3 text-sm text-slate-300">
              No report data was returned. Check the API connection or fallback logic.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-8 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-6 shadow-2xl shadow-black/20">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium tracking-wide text-cyan-300">
              RiskAtlas
            </span>
            {useDemo && (
              <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
                Demo Mode
              </span>
            )}
          </div>

          <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">
            Risk Report Preview
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            A commercial-grade preview built for paid delivery: score meaning,
            executive summary, action priorities, and locked premium sections for upsell.
          </p>

          <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-4">
            <InfoChip label="Client" value={report.company_name} />
            <InfoChip label="Route" value={report.route_name} />
            <InfoChip label="Product" value={report.product_name} />
            <InfoChip label="Generated" value={formatDate(report.generated_at)} />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {unlockState.pro && (
              <span className="rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-xs font-semibold text-green-300">
                Professional Report Unlocked
              </span>
            )}
            {unlockState.execution && (
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                Execution Upgrade Unlocked
              </span>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10">
              Export Preview PDF
            </button>
            <Link
              href="/riskatlas/pricing"
              className="rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Unlock Full Report
            </Link>
          </div>
        </header>

        {error && (
          <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-200">
            {error}
          </div>
        )}

        <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Overall Score</h2>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                {report.report_id}
              </span>
            </div>

            <ScoreDial score={report.overall_score} grade={report.grade} />

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Grade</span>
                <span className="text-lg font-semibold">{report.grade}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-slate-400">Risk Level</span>
                <span className="text-sm font-medium text-slate-200">{report.risk_level}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {gradeInfo.description}
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
              <div className="text-sm font-semibold text-cyan-300">Score Definition</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {report.score_definition}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              <SectionTitle
                title="Executive Summary"
                subtitle="This is the section a paying client will actually read first."
              />
              <p className="mt-4 text-sm leading-7 text-slate-200">
                {report.executive_summary}
              </p>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <div className="text-sm font-semibold text-white">Decision Guidance</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {report.decision_note}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <div className="text-sm font-semibold text-white">Confidence Note</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {report.confidence_note}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              <SectionTitle
                title="Risk Factor Breakdown"
                subtitle="Each factor explains where the score comes from and what to do next."
              />

              <div className="mt-5 space-y-4">
                {report.factors.map((factor) => (
                  <div
                    key={factor.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-5"
                  >
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                            {factor.category}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium text-white ${getScoreColor(
                              factor.score
                            )}`}
                          >
                            Score {factor.score}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-white">{factor.title}</h3>
                      </div>
                      <MiniRiskBar score={factor.score} />
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-3">
                      <MetaBlock title="Impact" value={factor.impact} />
                      <MetaBlock title="Likelihood" value={factor.likelihood} />
                      <MetaBlock title="Evidence" value={factor.evidence} />
                    </div>

                    <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <div className="text-sm font-semibold text-emerald-300">
                        Recommended Action
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {factor.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              <SectionTitle
                title="Priority Action Plan"
                subtitle="Commercial clients need an action list, not only a score."
              />

              <div className="mt-5 grid gap-4">
                {report.actions.map((action) => (
                  <div
                    key={action.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-5"
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getPriorityTone(
                          action.priority
                        )}`}
                      >
                        {action.priority}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                        Owner: {action.owner}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                        {action.timeline}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-white">{action.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{action.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6">
              <SectionTitle
                title="Premium Modules Preview"
                subtitle="This section is intentionally structured for monetization and Stripe unlock."
              />

              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                <LockedCard
                  title="Loading Plan Linkage"
                  description={report.premium_preview.loading_plan_summary}
                />
                <LockedCard
                  title="Scenario Analysis"
                  description={report.premium_preview.scenario_outlook}
                />
                <LockedCard
                  title="Exposure Map"
                  description={report.premium_preview.supplier_port_exposure}
                />
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                <div className="text-sm font-semibold text-white">Monetization Logic</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {report.premium_preview.commercial_note}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/riskatlas/pricing"
                    className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                  >
                    View Pricing
                  </Link>
                  <Link
                    href="/riskatlas/pricing"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    Upgrade to Full Report
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
              <SectionTitle
                title="Why this UI can be charged"
                subtitle="This is the bridge from MVP to product."
              />

              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <ValueCard
                  title="Explained Score"
                  text="The customer now sees not just a number, but a rating system with interpretation."
                />
                <ValueCard
                  title="Management Summary"
                  text="Executives can understand the route viability in under one minute."
                />
                <ValueCard
                  title="Actionable Output"
                  text="The report already looks like a consulting deliverable, not a raw model output."
                />
                <ValueCard
                  title="Built-in Upsell"
                  text="Paid modules are previewed but locked, preparing the Stripe conversion step."
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}