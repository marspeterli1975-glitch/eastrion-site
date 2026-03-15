"use client";

import { useEffect, useState } from "react";
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

function getLevelTone(level: string) {
  const normalized = level.toLowerCase();

  if (normalized === "low") return { badge: "badge-low", panel: "tone-low" };
  if (normalized === "guarded") return { badge: "badge-guarded", panel: "tone-guarded" };
  if (normalized === "moderate") return { badge: "badge-moderate", panel: "tone-moderate" };
  if (normalized === "high") return { badge: "badge-high", panel: "tone-high" };
  return { badge: "badge-critical", panel: "tone-critical" };
}

export default function RiskAtlasPage() {
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<RiskResult | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const queryCountry = params.get("country") || "";
    const queryIndustry = params.get("industry") || "";

    setCountry(queryCountry);
    setIndustry(queryIndustry);
  }, []);

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

  const tone = result ? getLevelTone(result.level) : null;

  return (
    <main className="riskatlas-page">
      <section className="riskatlas-hero">
        <div className="riskatlas-shell">
          <div className="riskatlas-hero-top">
            <Link href="/" className="riskatlas-back">
              Back to Home
            </Link>
          </div>

          <div className="riskatlas-hero-grid">
            <div className="riskatlas-hero-copy">
              <p className="riskatlas-eyebrow">Eastrion — Structured Supply Chain Risk Intelligence</p>
              <h1 className="riskatlas-title">RiskAtlas</h1>
              <p className="riskatlas-subtitle">
                A practical exposure scanner for global SMEs across sourcing, logistics,
                manufacturing corridors, and cross-border operating environments.
              </p>

              <div className="riskatlas-usecases">
                <div className="riskatlas-mini-card">
                  <span className="mini-label">Use Case</span>
                  <strong>Supplier & corridor pre-screening</strong>
                </div>
                <div className="riskatlas-mini-card">
                  <span className="mini-label">Output</span>
                  <strong>Structured scan + exportable PDF</strong>
                </div>
                <div className="riskatlas-mini-card">
                  <span className="mini-label">Positioning</span>
                  <strong>Exposure scanner, not legal or investment advice</strong>
                </div>
              </div>
            </div>

            <div className="riskatlas-side-panel">
              <div className="side-panel-card">
                <span className="side-kicker">What this scans</span>
                <ul className="side-list">
                  <li>Country operating exposure</li>
                  <li>Industry sensitivity</li>
                  <li>Logistics complexity</li>
                  <li>Event-linked disruption risk</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="riskatlas-section">
        <div className="riskatlas-shell">
          <div className="riskatlas-card scan-card">
            <div className="section-head">
              <div>
                <p className="section-kicker">Scanner</p>
                <h2>Run Risk Scan</h2>
              </div>
              <p className="section-note">
                Enter a country and industry to generate an initial supply chain exposure scan.
              </p>
            </div>

            <div className="scanner-grid">
              <div className="field-wrap">
                <label>Country</label>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. India"
                  className="risk-input"
                />
              </div>

              <div className="field-wrap">
                <label>Industry</label>
                <input
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. Battery"
                  className="risk-input"
                />
              </div>
            </div>

            <div className="shortcut-block">
              <div className="shortcut-group">
                <span className="shortcut-label">Popular Countries</span>
                <div className="quick-tags">
                  <button type="button" className="quick-tag" onClick={() => setCountry("India")}>India</button>
                  <button type="button" className="quick-tag" onClick={() => setCountry("China")}>China</button>
                  <button type="button" className="quick-tag" onClick={() => setCountry("Saudi Arabia")}>Saudi Arabia</button>
                  <button type="button" className="quick-tag" onClick={() => setCountry("USA")}>USA</button>
                </div>
              </div>

              <div className="shortcut-group">
                <span className="shortcut-label">Popular Industries</span>
                <div className="quick-tags">
                  <button type="button" className="quick-tag" onClick={() => setIndustry("Battery")}>Battery</button>
                  <button type="button" className="quick-tag" onClick={() => setIndustry("Electronics")}>Electronics</button>
                  <button type="button" className="quick-tag" onClick={() => setIndustry("Chemicals")}>Chemicals</button>
                  <button type="button" className="quick-tag" onClick={() => setIndustry("Logistics")}>Logistics</button>
                </div>
              </div>
            </div>

            <div className="scanner-actions">
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

            {error && <div className="error-box">{error}</div>}
          </div>
        </div>
      </section>

      {result && (
        <section className="riskatlas-section">
          <div className="riskatlas-shell">
            <div className={`riskatlas-card result-hero ${tone?.panel}`}>
              <div className="result-head">
                <div>
                  <p className="section-kicker">Result</p>
                  <h2>Scan Result</h2>
                  <p className="result-context">
                    {result.country} · {result.industry}
                  </p>
                </div>

                <div className={`level-badge ${tone?.badge}`}>
                  {result.level}
                </div>
              </div>

              <div className="metric-grid">
                <div className="metric-card">
                  <span className="metric-label">Risk Score</span>
                  <strong>{result.risk_score}</strong>
                </div>
                <div className="metric-card">
                  <span className="metric-label">Grade</span>
                  <strong>{result.grade}</strong>
                </div>
                <div className="metric-card">
                  <span className="metric-label">Exposure Level</span>
                  <strong>{result.level}</strong>
                </div>
              </div>
            </div>

            <div className="breakdown-grid">
              <div className="break-card">
                <span className="break-label">Country Risk</span>
                <strong>{result.breakdown.country_risk}</strong>
              </div>
              <div className="break-card">
                <span className="break-label">Industry Risk</span>
                <strong>{result.breakdown.industry_risk}</strong>
              </div>
              <div className="break-card">
                <span className="break-label">Logistics Risk</span>
                <strong>{result.breakdown.logistics_risk}</strong>
              </div>
              <div className="break-card">
                <span className="break-label">Event Risk</span>
                <strong>{result.breakdown.event_risk}</strong>
              </div>
            </div>

            <div className="two-col-grid">
              <div className="riskatlas-card">
                <div className="section-head compact">
                  <div>
                    <p className="section-kicker">Interpretation</p>
                    <h3>Assessment Summary</h3>
                  </div>
                </div>
                <p className="body-copy">{result.summary}</p>
              </div>

              <div className="riskatlas-card">
                <div className="section-head compact">
                  <div>
                    <p className="section-kicker">Meaning</p>
                    <h3>Score Definition</h3>
                  </div>
                </div>

                <div className="definition-list">
                  {scoreDefinition.map((item) => (
                    <div key={item.range} className="definition-row">
                      <div className="definition-range">{item.range}</div>
                      <div>
                        <div className="definition-level">{item.level}</div>
                        <div className="definition-meaning">{item.meaning}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="two-col-grid">
              <div className="riskatlas-card">
                <div className="section-head compact">
                  <div>
                    <p className="section-kicker">Signals</p>
                    <h3>Key Risk Factors</h3>
                  </div>
                </div>
                <ul className="bullet-list">
                  {result.risk_factors.map((factor, index) => (
                    <li key={index}>{factor}</li>
                  ))}
                </ul>
              </div>

              <div className="riskatlas-card">
                <div className="section-head compact">
                  <div>
                    <p className="section-kicker">Action Framing</p>
                    <h3>Suggested Risk Awareness</h3>
                  </div>
                </div>
                <ul className="bullet-list">
                  {result.suggested_risk_awareness.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="two-col-grid">
              <div className="riskatlas-card">
                <div className="section-head compact">
                  <div>
                    <p className="section-kicker">Methodology</p>
                    <h3>How the score is structured</h3>
                  </div>
                </div>

                <div className="method-grid">
                  <div className="method-item">
                    <strong>Country Risk</strong>
                    <p>Structural operating exposure linked to country conditions, execution reliability, and macro uncertainty.</p>
                  </div>
                  <div className="method-item">
                    <strong>Industry Risk</strong>
                    <p>Sector-specific sensitivity including compliance burden, hazardous handling, and material criticality.</p>
                  </div>
                  <div className="method-item">
                    <strong>Logistics Risk</strong>
                    <p>Transport complexity, route dependence, lead-time pressure, and shipment fragility.</p>
                  </div>
                  <div className="method-item">
                    <strong>Event Risk</strong>
                    <p>Disruption potential from policy shifts, congestion, infrastructure interruptions, and other operational shocks.</p>
                  </div>
                </div>

                <p className="formula-line">
                  Total Risk Score = Country Risk + Industry Risk + Logistics Risk + Event Risk
                </p>
              </div>

              <div className="riskatlas-card disclaimer-card">
                <div className="section-head compact">
                  <div>
                    <p className="section-kicker">Boundary</p>
                    <h3>Disclaimer</h3>
                  </div>
                </div>
                <p className="body-copy">{result.disclaimer}</p>

                <div className="cta-mini">
                  <p>For deeper evaluation, tailored corridor analysis, or enterprise use, contact Eastrion for an extended assessment workflow.</p>
                  <Link href="/contact" className="text-cta">
                    Contact Eastrion →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
