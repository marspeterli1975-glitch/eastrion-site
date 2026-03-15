"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();
  const [country, setCountry] = useState("India");
  const [industry, setIndustry] = useState("Battery");

  function handleGoToRiskAtlas() {
    const query = new URLSearchParams({
      country,
      industry,
    }).toString();

    router.push(`/riskatlas?${query}`);
  }

  return (
    <main className="page-shell">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-eyebrow">Risk Scan</p>
          <h1 className="hero-title">Run a structured supply chain risk scan.</h1>
          <p className="hero-copy" style={{ maxWidth: "520px" }}>
            This page provides a simple preview entrance. Click the button to open the
            full RiskAtlas scan page with your selected country and industry.
          </p>
        </div>
      </section>

      <section className="section-block">
        <div className="section-inner">
          <div
            style={{
              background: "#f3f4f6",
              borderRadius: "28px",
              padding: "32px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr auto",
                gap: "18px",
                alignItems: "center",
              }}
            >
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                style={{
                  padding: "18px 24px",
                  borderRadius: "18px",
                  border: "1px solid #d1d5db",
                  fontSize: "18px",
                  outline: "none",
                }}
              />

              <input
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="Industry"
                style={{
                  padding: "18px 24px",
                  borderRadius: "18px",
                  border: "1px solid #d1d5db",
                  fontSize: "18px",
                  outline: "none",
                }}
              />

              <button
                onClick={handleGoToRiskAtlas}
                style={{
                  padding: "20px 36px",
                  borderRadius: "999px",
                  border: "3px solid #111827",
                  background: "#0f2357",
                  color: "white",
                  fontSize: "20px",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Run Risk Scan
              </button>
            </div>

            <div
              style={{
                marginTop: "28px",
                background: "#ececec",
                borderRadius: "20px",
                padding: "28px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  marginBottom: "12px",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                Preview
              </h3>

              <p style={{ margin: 0, fontSize: "18px", color: "#111827", lineHeight: 1.7 }}>
                Click the button to open the full RiskAtlas scan page with your selected
                country and industry.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
