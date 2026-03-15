"use client";

import { useState } from "react";
import Link from "next/link";

type RiskResult = {
  country: string;
  industry: string;
  risk_score: number;
  grade: string;
  level: string;
  summary: string;
  risk_factors: string[];
  suggested_risk_awareness: string[];
  breakdown: {
    country_risk: number;
    industry_risk: number;
    logistics_risk: number;
    event_risk: number;
  };
  disclaimer: string;
};

const scoreDefinition = [
  { range: "0–20", level: "Low", meaning: "Limited structural exposure" },
  { range: "21–40", level: "Guarded", meaning: "Manageable exposure with moderate attention required" },
  { range: "41–60", level: "Moderate", meaning: "Noticeable operational and disruption sensitivity" },
  { range: "61–80", level: "High", meaning: "Significant supply chain vulnerability" },
  { range: "81–100", level: "Critical", meaning: "Severe exposure requiring active mitigation" }
];

export default function RiskAtlasPage() {
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<RiskResult | null>(null);

  async function handleScan() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/risk-scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ country, industry })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Scan failed");
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Unable to run risk scan. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleExportPdf() {
    if (!result) return;

    setPdfLoading(true);
    setError("");

    try {
      const res = await fetch("/api/risk-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(result)
      });

      if (!res.ok) {
        throw new Error("PDF export failed");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `riskatlas-report-${result.country}-${result.industry}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError("Failed to export PDF report.");
    } finally {
      setPdfLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-eyebrow">Eastrion — Global Supply Chain Infrastructure</p>
          <h1 className="hero-title">RiskAtlas</h1>
          <p className="hero-copy">
            A structured supply chain exposure scanner for global SMEs across sourcing,
            logistics, trade corridors and manufacturing ecosystems.
          </p>

          <div className="hero-actions">
            <Link href="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-inner">
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "20px",
              padding: "24px",
              background: "rgba(255,255,255,0.03)"
            }}
          >
            <h2 className="section-title">Run Risk Scan</h2>
            <p className="section-copy" style={{ marginBottom: "20px" }}>
              Enter a country and industry to generate an initial supply chain exposure scan.
            </p>

            <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px" }}>Country</label>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. India"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "#0f172a",
                    color: "white"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px" }}>Industry</label>
                <input
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. Battery"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "#0f172a",
                    color: "white"
                  }}
                />
              </div>
            </div>

            <div style={{ marginTop: "20px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                onClick={handleScan}
                disabled={loading || !country || !industry}
                className="btn btn-primary"
              >
                {loading ? "Scanning..." : "Run Risk Scan"}
              </button>

              {result && (
                <button
                  onClick={handleExportPdf}
                  disabled={pdfLoading}
                  className="btn btn-secondary"
                >
                  {pdfLoading ? "Exporting..." : "Export PDF Report"}
                </button>
              )}
            </div>

            {error && (
              <div style={{ marginTop: "16px", color: "#fca5a5" }}>
                {error}
              </div>
            )}
          </div>
        </div>
      </section>

      {result && (
        <section className="section-block">
          <div className="section-inner">
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "20px",
                padding: "24px",
                background: "rgba(255,255,255,0.03)"
              }}
            >
              <h2 className="section-title">Scan Result</h2>

              <div
                style={{
                  display: "grid",
                  gap: "16px",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  marginTop: "20px"
                }}
              >
                <div>
                  <p style={{ opacity: 0.7 }}>Risk Score</p>
                  <h3>{result.risk_score}</h3>
                </div>
                <div>
                  <p style={{ opacity: 0.7 }}>Grade</p>
                  <h3>{result.grade}</h3>
                </div>
                <div>
                  <p style={{ opacity: 0.7 }}>Exposure Level</p>
                  <h3>{result.level}</h3>
                </div>
              </div>

              <div style={{ marginTop: "24px" }}>
                <h3>Risk Breakdown</h3>
                <ul>
                  <li>Country Risk: {result.breakdown.country_risk}</li>
                  <li>Industry Risk: {result.breakdown.industry_risk}</li>
                  <li>Logistics Risk: {result.breakdown.logistics_risk}</li>
                  <li>Event Risk: {result.breakdown.event_risk}</li>
                </ul>
              </div>

              <div style={{ marginTop: "24px" }}>
                <h3>Score Definition</h3>
                <ul>
                  {scoreDefinition.map((item) => (
                    <li key={item.range}>
                      {item.range} — {item.level}: {item.meaning}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: "24px" }}>
                <h3>Assessment Summary</h3>
                <p>{result.summary}</p>
              </div>

              <div style={{ marginTop: "24px" }}>
                <h3>Key Risk Factors</h3>
                <ul>
                  {result.risk_factors.map((factor, index) => (
                    <li key={index}>{factor}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: "24px" }}>
                <h3>Suggested Risk Awareness</h3>
                <ul>
                  {result.suggested_risk_awareness.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: "24px" }}>
                <h3>Disclaimer</h3>
                <p>{result.disclaimer}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section-block">
        <div className="section-inner">
          <h2 className="section-title">Methodology</h2>
          <p className="section-copy">
            Total Risk Score = Country Risk + Industry Risk + Logistics Risk + Event Risk.
            This MVP is designed as a structured exposure scanner, not as legal, investment,
            customs or compliance advice.
          </p>
        </div>
      </section>
    </main>
  );
}
