"use client";

import { useState } from "react";

type RiskResponse = {
  risk_score: number;
  grade: string;
  level: string;
  summary: string;
  risk_factors?: string[];
  breakdown?: {
    country_risk: number;
    industry_risk: number;
    logistics_risk: number;
    event_risk: number;
  };
};

export default function RiskScanner() {
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");
  const [result, setResult] = useState<RiskResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runScan() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/risk-scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country,
          industry,
        }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data: RiskResponse = await res.json();
      setResult(data);
    } catch (err) {
      setError("Risk scan failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        borderRadius: "18px",
        background: "rgba(15, 23, 42, 0.03)",
        border: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <input
          placeholder="Supplier country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: "12px",
            border: "1px solid var(--line)",
            fontSize: "15px",
            background: "#fff",
            color: "var(--text)",
            outline: "none",
          }}
        />

        <input
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: "12px",
            border: "1px solid var(--line)",
            fontSize: "15px",
            background: "#fff",
            color: "var(--text)",
            outline: "none",
          }}
        />

        <button
          type="button"
          className="btn btn-primary"
          onClick={runScan}
          disabled={loading}
          style={{
            cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.85 : 1,
          }}
        >
          {loading ? "Scanning..." : "Run Risk Scan"}
        </button>

        {error && (
          <div
            style={{
              marginTop: "8px",
              padding: "14px 16px",
              borderRadius: "12px",
              background: "rgba(220, 38, 38, 0.06)",
              border: "1px solid rgba(220, 38, 38, 0.18)",
              color: "#991b1b",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {result && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              borderRadius: "14px",
              background: "#fff",
              border: "1px solid var(--line)",
            }}
          >
            <h3 style={{ margin: "0 0 12px" }}>Risk Assessment Result</h3>

            <p>
              <strong>Risk Score:</strong> {result.risk_score} / 100
            </p>

            <p>
              <strong>Risk Grade:</strong> {result.grade}
            </p>

            <p>
              <strong>Exposure Level:</strong> {result.level}
            </p>

            {result.breakdown && (
              <>
                <hr style={{ margin: "14px 0" }} />

                <p>
                  <strong>Breakdown</strong>
                </p>

                <ul style={{ lineHeight: 1.7 }}>
                  <li>Country Risk: {result.breakdown.country_risk}</li>
                  <li>Industry Risk: {result.breakdown.industry_risk}</li>
                  <li>Logistics Risk: {result.breakdown.logistics_risk}</li>
                  <li>Event Risk: {result.breakdown.event_risk}</li>
                </ul>
              </>
            )}

            <hr style={{ margin: "14px 0" }} />

            <p>
              <strong>Score Definition</strong>
            </p>

            <ul style={{ lineHeight: 1.7 }}>
              <li>0–20 : Low exposure</li>
              <li>21–40 : Guarded exposure</li>
              <li>41–60 : Moderate exposure</li>
              <li>61–80 : High exposure</li>
              <li>81–100 : Critical exposure</li>
            </ul>

            <p style={{ marginTop: "12px" }}>
              <strong>Assessment Summary</strong>
            </p>

            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              {result.summary}
            </p>

            {result.risk_factors && result.risk_factors.length > 0 && (
              <>
                <p style={{ marginTop: "12px" }}>
                  <strong>Key Risk Factors</strong>
                </p>

                <ul style={{ lineHeight: 1.7 }}>
                  {result.risk_factors.map((factor, index) => (
                    <li key={index}>{factor}</li>
                  ))}
                </ul>
              </>
            )}

            <p style={{ marginTop: "12px" }}>
              <strong>Suggested Risk Awareness</strong>
            </p>

            <ul style={{ lineHeight: 1.7 }}>
              <li>Review supplier concentration risk</li>
              <li>Evaluate logistics corridor resilience</li>
              <li>Monitor regulatory and geopolitical signals</li>
            </ul>

            <hr style={{ margin: "16px 0" }} />

            <p style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.7 }}>
              Disclaimer: This tool provides structured supply chain risk
              indicators based on simplified assumptions and publicly observable
              signals. The results are for informational and analytical
              reference only and should not be interpreted as legal, financial,
              or investment advice. Final business decisions should incorporate
              independent professional judgment and additional due diligence.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
