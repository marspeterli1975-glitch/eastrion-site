"use client";

import { useState } from "react";

export default function RiskScanner() {
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function runScan() {
    setLoading(true);

    const res = await fetch("/api/risk-scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        country,
        industry
      })
    });

    const data = await res.json();

    setResult(data);
    setLoading(false);
  }

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "18px",
        background: "rgba(15,23,42,0.03)",
        border: "1px solid var(--line)"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          placeholder="Supplier country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: "12px",
            border: "1px solid var(--line)"
          }}
        />

        <input
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: "12px",
            border: "1px solid var(--line)"
          }}
        />

        <button className="btn btn-primary" onClick={runScan}>
          {loading ? "Scanning..." : "Run Risk Scan"}
        </button>

       {result && (
  <div
    style={{
      marginTop: "20px",
      padding: "20px",
      borderRadius: "14px",
      background: "#fff",
      border: "1px solid var(--line)"
    }}
  >
    <h3 style={{ marginBottom: "10px" }}>
      Risk Assessment Result
    </h3>

    <p><strong>Risk Score:</strong> {result.risk_score} / 100</p>

    <p><strong>Risk Grade:</strong> {result.grade}</p>

    <p><strong>Exposure Level:</strong> {result.level}</p>

    <hr style={{ margin: "14px 0" }} />

    <p>
      <strong>Score Definition</strong>
    </p>

    <ul style={{ lineHeight: 1.6 }}>
      <li>0–20 : Low exposure</li>
      <li>21–40 : Guarded exposure</li>
      <li>41–60 : Moderate exposure</li>
      <li>61–80 : High exposure</li>
      <li>81–100 : Critical exposure</li>
    </ul>

    <p style={{ marginTop: "10px" }}>
      <strong>Assessment Summary</strong>
    </p>

    <p style={{ color: "var(--muted)" }}>
      {result.summary}
    </p>

    <p style={{ marginTop: "10px" }}>
      <strong>Suggested Risk Awareness</strong>
    </p>

    <ul style={{ lineHeight: 1.6 }}>
      <li>Review supplier concentration risk</li>
      <li>Evaluate logistics corridor resilience</li>
      <li>Monitor regulatory and geopolitical signals</li>
    </ul>

    <hr style={{ margin: "16px 0" }} />

    <p style={{ fontSize: "12px", color: "#6b7280" }}>
      Disclaimer: This tool provides structured supply chain risk indicators
      based on simplified assumptions and publicly observable signals.
      The results are for informational and analytical reference only and
      should not be interpreted as legal, financial, or investment advice.
      Final business decisions should incorporate independent professional
      judgment and additional due diligence.
    </p>
  </div>
)}
      </div>
    </div>
  );
}
