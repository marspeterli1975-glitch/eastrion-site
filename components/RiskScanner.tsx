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
              marginTop: "16px",
              padding: "16px",
              borderRadius: "12px",
              background: "#fff",
              border: "1px solid var(--line)"
            }}
          >
            <strong>Risk Score: {result.risk_score}</strong>

            <p>Grade: {result.grade}</p>

            <p>Level: {result.level}</p>

            <p style={{ color: "var(--muted)" }}>{result.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
