"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type PlanningInsight = {
  recommended_container: string;
  estimated_container_count: number;
  volume_utilization: number;
  weight_utilization: number;
  efficiency_band: string;
};

type OperationalRisk = {
  operational_risk_score: number;
  operational_risk_level: string;
  risk_flags: string[];
  risk_notes: string[];
  recommended_actions: string[];
};

type RiskAtlasMerged = {
  macro_risk_score: number;
  execution_risk_score: number;
  final_riskatlas_score: number;
  final_riskatlas_level: string;
};

type UploadResultRow = {
  product_name: string;
  hs_code: string | number;
  units_per_container: number;
  estimated_container_count: number;
  total_volume_m3: number;
  total_weight_kg: number;
  planning_insight: PlanningInsight;
  operational_risk: OperationalRisk;
  riskatlas: RiskAtlasMerged;
};

type UploadApiResponse = {
  success: boolean;
  error?: string;
  results?: UploadResultRow[];
};

type RunRiskAtlasResponse = {
  success: boolean;
  error?: string;
  summary?: {
    line_count: number;
    total_operational_risk_score: number;
    total_final_riskatlas_score: number;
    highest_risk_line: string;
    overall_level: string;
  };
  results?: UploadResultRow[];
};

type CargoForm = "solid" | "powder" | "liquid";
type TransportMode = "container" | "inland_truck";

export default function LoadPlanningPage() {
  const [mode, setMode] = useState<"upload" | "manual">("upload");

  const [productName, setProductName] = useState("Battery module skid");
  const [productDescription, setProductDescription] = useState("");
  const [hsCode, setHsCode] = useState("");
  const [lengthMm, setLengthMm] = useState("1200");
  const [widthMm, setWidthMm] = useState("1000");
  const [heightMm, setHeightMm] = useState("1100");
  const [weightKg, setWeightKg] = useState("850");
  const [quantity, setQuantity] = useState("28");
  const [cargoForm, setCargoForm] = useState<CargoForm>("solid");
  const [maxStackLayers, setMaxStackLayers] = useState("2");
  const [transportMode, setTransportMode] = useState<TransportMode>("container");
  const [note, setNote] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [runningRiskAtlas, setRunningRiskAtlas] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");
  const [uploadResults, setUploadResults] = useState<UploadResultRow[]>([]);
  const [riskAtlasSummary, setRiskAtlasSummary] = useState<RunRiskAtlasResponse["summary"] | null>(null);

  const hasUploadResults = uploadResults.length > 0;

  const manualSummary = useMemo(() => {
    const l = Number(lengthMm) || 0;
    const w = Number(widthMm) || 0;
    const h = Number(heightMm) || 0;
    const wt = Number(weightKg) || 0;
    const qty = Number(quantity) || 0;
    const itemVolume = (l * w * h) / 1_000_000_000;

    return {
      itemVolumeM3: itemVolume,
      totalVolumeM3: itemVolume * qty,
      totalWeightKg: wt * qty,
    };
  }, [lengthMm, widthMm, heightMm, weightKg, quantity]);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    setUploadError("");
    setUploadSuccessMessage("");
    setRiskAtlasSummary(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please choose a CSV packing list file first.");
      return;
    }

    const lowerName = selectedFile.name.toLowerCase();
    if (!lowerName.endsWith(".csv")) {
      setUploadError("V1 currently supports CSV upload only.");
      return;
    }

    try {
      setUploading(true);
      setUploadError("");
      setUploadSuccessMessage("");
      setUploadResults([]);
      setRiskAtlasSummary(null);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch(
        "https://global-risk-api.onrender.com/load-planning/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data: UploadApiResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Upload failed.");
      }

      const rows = data.results ?? [];
      setUploadResults(rows);
      setUploadSuccessMessage(`Upload successful. ${rows.length} line(s) processed.`);
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Failed to fetch";
      setUploadError(message);
    } finally {
      setUploading(false);
    }
  };

  const handleRunRiskAtlas = async () => {
    if (!selectedFile) {
      setUploadError("Please choose a CSV file before running RiskAtlas.");
      return;
    }

    try {
      setRunningRiskAtlas(true);
      setUploadError("");

      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch(
        "https://global-risk-api.onrender.com/load-planning/run-riskatlas",
        {
          method: "POST",
          body: formData,
        }
      );

      const data: RunRiskAtlasResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "RiskAtlas analysis failed.");
      }

      setRiskAtlasSummary(data.summary ?? null);
      setUploadResults(data.results ?? []);
    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : "RiskAtlas analysis failed.";
      setUploadError(message);
    } finally {
      setRunningRiskAtlas(false);
    }
  };

  const totalUploadedVolume = useMemo(() => {
    return uploadResults.reduce((sum, row) => sum + (row.total_volume_m3 || 0), 0);
  }, [uploadResults]);

  const totalUploadedWeight = useMemo(() => {
    return uploadResults.reduce((sum, row) => sum + (row.total_weight_kg || 0), 0);
  }, [uploadResults]);

  return (
    <main className="min-h-screen bg-[#f4f6f8] text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            ← Back to Eastrion
          </Link>

          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-semibold tracking-tight text-[#123b66] md:text-5xl">
                Load Planning
              </h1>
              <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
                Planning-grade capacity estimation for container loading and inland truck deployment.
                Designed for industrial cargo, cross-border sourcing, and real supply chain execution.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Version 1 scope
              </div>
              <div className="mt-2 text-sm font-medium text-slate-800">
                Upload Packing List + Initial Capacity Estimation
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-8">
            <Card>
              <div className="flex flex-col gap-5">
                <div>
                  <h2 className="text-2xl font-semibold text-[#123b66]">Input Method</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Use upload as the primary workflow for structured planning. Manual entry remains available for quick reference.
                  </p>
                </div>

                <div className="inline-flex w-full max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-1">
                  <ModeButton active={mode === "upload"} onClick={() => setMode("upload")}>
                    Upload Packing List
                  </ModeButton>
                  <ModeButton active={mode === "manual"} onClick={() => setMode("manual")}>
                    Manual Entry
                  </ModeButton>
                </div>
              </div>

              {mode === "upload" ? (
                <div className="mt-8">
                  <div className="grid gap-4 md:grid-cols-3">
                    <ActionCard
                      title="Download Template"
                      description="Use the standard Eastrion CSV format for structured submission."
                      action={
                        <a
                          href="/templates/packing_list_template.csv"
                          download
                          className="inline-flex items-center rounded-full bg-[#123b66] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0f3153]"
                        >
                          Download CSV Template
                        </a>
                      }
                    />

                    <ActionCard
                      title="Upload File"
                      description="Upload a completed CSV packing list for server-side planning."
                      action={
                        <label className="inline-flex cursor-pointer items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                          Choose CSV
                          <input
                            type="file"
                            accept=".csv,text/csv"
                            className="hidden"
                            onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                          />
                        </label>
                      }
                    />

                    <ActionCard
                      title="Run Planning"
                      description="Send your CSV file to the planning engine and retrieve results."
                      action={
                        <button
                          type="button"
                          onClick={handleUpload}
                          disabled={uploading}
                          className="inline-flex items-center rounded-full bg-[#123b66] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0f3153] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {uploading ? "Uploading..." : "Upload & Generate"}
                        </button>
                      }
                    />
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Upload Status
                    </h3>

                    <div className="mt-4 space-y-3 text-sm">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-slate-700">Selected file:</span>
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700">
                          {selectedFile ? selectedFile.name : "No file selected"}
                        </span>
                      </div>

                      {uploadSuccessMessage ? (
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
                          {uploadSuccessMessage}
                        </div>
                      ) : null}

                      {uploadError ? (
                        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-800">
                          {uploadError}
                        </div>
                      ) : null}

                      {hasUploadResults ? (
                        <button
                          type="button"
                          onClick={handleRunRiskAtlas}
                          disabled={runningRiskAtlas}
                          className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {runningRiskAtlas ? "Running RiskAtlas..." : "Run Full RiskAtlas Analysis"}
                        </button>
                      ) : null}

                      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-600">
                        V1 currently supports <span className="font-semibold text-slate-800">CSV</span> upload only.
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-8">
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-7 text-amber-900">
                    Manual entry is currently kept as a guided reference panel. In the next step, it will be connected to the backend manual planning API.
                  </div>

                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <Field label="Product Name" value={productName} onChange={setProductName} />
                    <Field
                      label="Product Description / Spec"
                      value={productDescription}
                      onChange={setProductDescription}
                    />
                    <Field label="Suggested HS Code" value={hsCode} onChange={setHsCode} />
                    <SelectField
                      label="Cargo Form"
                      value={cargoForm}
                      onChange={(v) => setCargoForm(v as CargoForm)}
                      options={[
                        { label: "solid", value: "solid" },
                        { label: "powder", value: "powder" },
                        { label: "liquid", value: "liquid" },
                      ]}
                    />
                    <Field label="Max Outer Length (mm)" value={lengthMm} onChange={setLengthMm} type="number" />
                    <Field label="Max Outer Width (mm)" value={widthMm} onChange={setWidthMm} type="number" />
                    <Field label="Max Outer Height (mm)" value={heightMm} onChange={setHeightMm} type="number" />
                    <Field label="Gross Weight per Unit (kg)" value={weightKg} onChange={setWeightKg} type="number" />
                    <Field label="Quantity" value={quantity} onChange={setQuantity} type="number" />
                    <Field label="Max Stack Layers" value={maxStackLayers} onChange={setMaxStackLayers} type="number" />
                  </div>

                  <div className="mt-6">
                    <SelectField
                      label="Transport Mode"
                      value={transportMode}
                      onChange={(v) => setTransportMode(v as TransportMode)}
                      options={[
                        { label: "container", value: "container" },
                        { label: "inland_truck", value: "inland_truck" },
                      ]}
                    />
                  </div>

                  <div className="mt-6">
                    <TextAreaField label="Planner Note" value={note} onChange={setNote} />
                  </div>
                </div>
              )}
            </Card>

            <Card>
              <h2 className="text-2xl font-semibold text-[#123b66]">Input Summary</h2>

              {mode === "upload" ? (
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <MetricCard label="Uploaded line count" value={`${uploadResults.length}`} />
                  <MetricCard label="Uploaded total volume" value={`${totalUploadedVolume.toFixed(3)} m³`} />
                  <MetricCard label="Uploaded total weight" value={`${totalUploadedWeight.toFixed(2)} kg`} />
                </div>
              ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <MetricCard label="Item volume" value={`${manualSummary.itemVolumeM3.toFixed(3)} m³`} />
                  <MetricCard label="Total volume" value={`${manualSummary.totalVolumeM3.toFixed(3)} m³`} />
                  <MetricCard label="Total weight" value={`${manualSummary.totalWeightKg.toFixed(2)} kg`} />
                </div>
              )}

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-600">
                This version is a planning estimator, not a 3D loading engine. It currently focuses on standard CSV input and initial capacity estimation.
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-[#123b66]">
                    Planning Insight
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Initial planning recommendation, operational risk layer, and RiskAtlas merged view.
                  </p>
                </div>

                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#123b66]">
                  API Live
                </span>
              </div>

              {!hasUploadResults ? (
                <EmptyState text="No upload result yet. Download the template, upload a CSV file, and generate the planning insight." />
              ) : (
                <div className="mt-6 space-y-6">
                  {uploadResults.map((row, idx) => (
                    <div
                      key={`${row.product_name}-${idx}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="text-lg font-semibold text-slate-900">
                            {row.product_name}
                          </div>
                          <div className="mt-1 text-sm text-slate-500">
                            HS Code: {row.hs_code || "N/A"}
                          </div>
                        </div>

                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                          Line {idx + 1}
                        </span>
                      </div>

                      <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <MetricCard label="Units per container" value={`${row.units_per_container}`} />
                        <MetricCard label="Estimated container count" value={`${row.estimated_container_count}`} />
                        <MetricCard label="Total volume" value={`${row.total_volume_m3.toFixed(3)} m³`} />
                        <MetricCard label="Total weight" value={`${row.total_weight_kg.toFixed(2)} kg`} />
                      </div>

                      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="text-sm font-semibold text-slate-900">Planning Recommendation</div>
                        <div className="mt-3 grid gap-4 md:grid-cols-2">
                          <MiniMetric label="Recommended container" value={row.planning_insight?.recommended_container || "N/A"} />
                          <MiniMetric label="Efficiency band" value={row.planning_insight?.efficiency_band || "N/A"} />
                          <MiniMetric label="Volume utilization" value={`${(((row.planning_insight?.volume_utilization || 0) * 100)).toFixed(1)}%`} />
                          <MiniMetric label="Weight utilization" value={`${(((row.planning_insight?.weight_utilization || 0) * 100)).toFixed(1)}%`} />
                        </div>
                      </div>

                      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                        <div className="text-sm font-semibold text-slate-900">Operational Risk</div>
                        <div className="mt-3 grid gap-4 md:grid-cols-2">
                          <MiniMetric label="Risk score" value={`${row.operational_risk?.operational_risk_score ?? 0}`} />
                          <MiniMetric label="Risk level" value={row.operational_risk?.operational_risk_level || "N/A"} />
                        </div>

                        {!!row.operational_risk?.risk_flags?.length && (
                          <div className="mt-4">
                            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                              Risk Flags
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {row.operational_risk.risk_flags.map((flag, i) => (
                                <span
                                  key={`${flag}-${i}`}
                                  className="rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                                >
                                  {flag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {!!row.operational_risk?.recommended_actions?.length && (
                          <div className="mt-4">
                            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                              Recommended Actions
                            </div>
                            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
                              {row.operational_risk.recommended_actions.map((action, i) => (
                                <li key={`${action}-${i}`}>{action}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4">
                        <div className="text-sm font-semibold text-slate-900">RiskAtlas Merged View</div>
                        <div className="mt-3 grid gap-4 md:grid-cols-2">
                          <MiniMetric label="Macro risk score" value={`${row.riskatlas?.macro_risk_score ?? 0}`} />
                          <MiniMetric label="Execution risk score" value={`${row.riskatlas?.execution_risk_score ?? 0}`} />
                          <MiniMetric label="Final RiskAtlas score" value={`${row.riskatlas?.final_riskatlas_score ?? 0}`} />
                          <MiniMetric label="Final level" value={row.riskatlas?.final_riskatlas_level || "N/A"} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card>
              <h2 className="text-2xl font-semibold text-[#123b66]">RiskAtlas Portfolio Summary</h2>

              {!riskAtlasSummary ? (
                <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">
                  Run Full RiskAtlas Analysis after upload to generate a merged shipment-level summary.
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <MetricCard label="Line count" value={`${riskAtlasSummary.line_count}`} />
                    <MetricCard label="Overall level" value={riskAtlasSummary.overall_level} />
                    <MetricCard label="Average operational risk" value={`${riskAtlasSummary.total_operational_risk_score}`} />
                    <MetricCard label="Average RiskAtlas score" value={`${riskAtlasSummary.total_final_riskatlas_score}`} />
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700">
                    Highest-risk line: <span className="font-semibold text-slate-900">{riskAtlasSummary.highest_risk_line || "N/A"}</span>
                  </div>
                </div>
              )}
            </Card>

            <Card>
              <h2 className="text-2xl font-semibold text-[#123b66]">Product Notes</h2>

              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                <p>
                  <span className="font-semibold text-slate-800">Current live path:</span> Upload Packing List → CSV parsing → planning recommendation → operational risk evaluation → RiskAtlas merged output.
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Already connected:</span> template download, local front-end entry, Render planning API, operational risk layer, and RiskAtlas summary route.
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Next step:</span> connect country / route variables from RiskAtlas core engine, then add paid PDF and Stripe gating.
                </p>
              </div>

              <div className="mt-6">
                <Link
                  href="/riskatlas"
                  className="inline-flex items-center rounded-full bg-[#123b66] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0f3153]"
                >
                  Explore RiskAtlas
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:p-8">
      {children}
    </section>
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-[#123b66] text-white shadow-sm"
          : "text-slate-600 hover:bg-white hover:text-slate-900"
      }`}
    >
      {children}
    </button>
  );
}

function ActionCard({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="mt-2 text-sm leading-6 text-slate-600">{description}</div>
      <div className="mt-4">{action}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-slate-700">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123b66] focus:ring-4 focus:ring-[#123b66]/10"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-slate-700">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123b66] focus:ring-4 focus:ring-[#123b66]/10"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-slate-700">{label}</div>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123b66] focus:ring-4 focus:ring-[#123b66]/10"
      />
    </label>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
        {value}
      </div>
    </div>
  );
}

function MiniMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-lg font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">
      {text}
    </div>
  );
}
