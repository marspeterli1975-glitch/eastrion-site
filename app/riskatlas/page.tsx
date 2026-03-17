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
    if (!scanResult) return "#0f172a";
    const score = scanResult.analysis.score;
    if (score <= 20) return "#047857";
    if (score <= 40) return "#0369a1";
    if (score <= 60) return "#b45309";
    if (score <= 80) return "#c2410c";
    return "#b91c1c";
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
        throw new Error(`Scan failed with HTTP ${res.status}`);
      }

      const data: ScanResponse = await res.json();
      setScanResult(data);
    } catch {
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
        throw new Error(`Checkout failed with HTTP ${res.status}`);
      }

      const data: CheckoutResponse = await res.json();

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
        return;
      }

      throw new Error("Missing checkout URL");
    } catch {
      setError("Unable to start checkout right now. Please try again.");
    } finally {
      setUnlocking(false);
    }
  }

  const pageWrap: React.CSSProperties = {
    background: "#ffffff",
    color: "#0f172a",
    minHeight: "100vh",
  };

  const heroSection: React.CSSProperties = {
    background: "#eef2f1",
    padding: "56px 24px 44px",
  };

  const container: React.CSSProperties = {
    maxWidth: 1280,
    margin: "0 auto",
  };

  const heroGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1.7fr 1fr",
    gap: 32,
    alignItems: "start",
  };

  const cardGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 20,
    marginTop: 36,
  };

  const whiteCard: React.CSSProperties = {
    background: "#ffffff",
    borderRadius: 28,
    padding: 28,
    boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
    border: "1px solid #e2e8f0",
  };

  const navyCard: React.CSSProperties = {
    background: "#22346f",
    borderRadius: 34,
    padding: 32,
    color: "#ffffff",
    boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
  };

  const scanWrap: React.CSSProperties = {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "40px 24px 80px",
  };

  const scannerCard: React.CSSProperties = {
    background: "#f5f6f7",
    borderRadius: 36,
    padding: 40,
    boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
    border: "1px solid #e2e8f0",
  };

  const scannerHead: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1.1fr 1fr",
    gap: 24,
    alignItems: "start",
  };

  const inputGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 24,
    marginTop: 28,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 10,
    color: "#0f172a",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: 26,
    border: "none",
    background: "#0f1a57",
    color: "#ffffff",
    padding: "18px 24px",
    fontSize: 18,
    outline: "none",
    boxSizing: "border-box",
  };

  const chipWrap: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 12,
  };

  const chipStyle: React.CSSProperties = {
    borderRadius: 999,
    background: "#ffffff",
    border: "1px solid #dbe2ea",
    padding: "10px 18px",
    fontSize: 16,
    fontWeight: 700,
    color: "#0f172a",
    cursor: "pointer",
  };

  const primaryBtn: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    background: "linear-gradient(90deg, #183a72 0%, #a9c9cd 100%)",
    color: "#ffffff",
    border: "none",
    padding: "16px 28px",
    fontSize: 18,
    fontWeight: 800,
    cursor: "pointer",
  };

  const secondaryBtn: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    background: "#ffffff",
    color: "#0f172a",
    border: "1px solid #dbe2ea",
    padding: "14px 24px",
    fontSize: 16,
    fontWeight: 700,
    textDecoration: "none",
  };

  return (
    <main style={pageWrap}>
      <section style={heroSection}>
        <div style={container}>
          <a href="/" style={secondaryBtn}>
            Back to Home
          </a>

          <div style={{ height: 32 }} />

          <div style={heroGrid}>
            <div>
              <div
                style={{
                  marginBottom: 16,
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#64748b",
                }}
              >
                Eastrion — Structured Supply Chain Risk Intelligence
              </div>

              <h1
                style={{
                  margin: 0,
                  fontSize: 84,
                  lineHeight: 0.95,
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: "#0f172a",
                }}
              >
                RiskAtlas
              </h1>

              <p
                style={{
                  marginTop: 24,
                  maxWidth: 880,
                  fontSize: 24,
                  lineHeight: 1.6,
                  color: "#475569",
                }}
              >
                A practical exposure scanner for global SMEs across sourcing, logistics,
                manufacturing corridors, and cross-border operating environments.
              </p>

              <p
                style={{
                  marginTop: 18,
                  maxWidth: 760,
                  fontSize: 20,
                  lineHeight: 1.7,
                  color: "#334155",
                  fontWeight: 500,
                }}
              >
                Identify hidden supply chain exposure before it becomes cost.
              </p>

              <div style={cardGrid}>
                <div style={whiteCard}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#94a3b8",
                      marginBottom: 12,
                    }}
                  >
                    Use Case
                  </div>
                  <div style={{ fontSize: 22, lineHeight: 1.45, fontWeight: 700 }}>
                    Supplier & corridor pre-screening
                  </div>
                </div>

                <div style={whiteCard}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#94a3b8",
                      marginBottom: 12,
                    }}
                  >
                    Output
                  </div>
                  <div style={{ fontSize: 22, lineHeight: 1.45, fontWeight: 700 }}>
                    Structured scan + exportable PDF
                  </div>
                </div>

                <div style={whiteCard}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#94a3b8",
                      marginBottom: 12,
                    }}
                  >
                    Positioning
                  </div>
                  <div style={{ fontSize: 22, lineHeight: 1.45, fontWeight: 700 }}>
                    Exposure scanner, not legal or investment advice
                  </div>
                </div>
              </div>
            </div>

            <div style={navyCard}>
              <div
                style={{
                  marginBottom: 16,
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#cbd5e1",
                }}
              >
                What this scans
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 24,
                  fontSize: 18,
                  lineHeight: 1.9,
                  color: "rgba(255,255,255,0.95)",
                }}
              >
                <li>Country operating exposure</li>
                <li>Industry sensitivity</li>
                <li>Logistics complexity</li>
                <li>Event-linked disruption risk</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section style={scanWrap}>
        <div style={scannerCard}>
          <div style={scannerHead}>
            <div>
              <div
                style={{
                  marginBottom: 10,
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#94a3b8",
                }}
              >
                Scanner
              </div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 52,
                  lineHeight: 1,
                  fontWeight: 700,
                  color: "#0f172a",
                  letterSpacing: "-0.03em",
                }}
              >
                Run Risk Scan
              </h2>
            </div>

            <div
              style={{
                fontSize: 20,
                lineHeight: 1.7,
                color: "#64748b",
              }}
            >
              Enter a company, country, and industry to generate an initial supply chain
              exposure scan.
            </div>
          </div>

          <div style={inputGrid}>
            <div>
              <label style={labelStyle}>Company Name</label>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Test Battery Co"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. name@company.com"
                style={inputStyle}
              />
            </div>
          </div>

          <div style={inputGrid}>
            <div>
              <label style={labelStyle}>Country</label>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. India"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Industry</label>
              <input
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Battery"
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#94a3b8",
                marginBottom: 10,
              }}
            >
              Popular Countries
            </div>
            <div style={chipWrap}>
              {popularCountries.map((item) => (
                <button key={item} onClick={() => setCountry(item)} style={chipStyle}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#94a3b8",
                marginBottom: 10,
              }}
            >
              Popular Industries
            </div>
            <div style={chipWrap}>
              {popularIndustries.map((item) => (
                <button key={item} onClick={() => setIndustry(item)} style={chipStyle}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div
              style={{
                marginTop: 24,
                borderRadius: 20,
                padding: "14px 18px",
                border: "1px solid #fecaca",
                background: "#fef2f2",
                color: "#b91c1c",
                fontSize: 15,
              }}
            >
              {error}
            </div>
          )}

          <div style={{ marginTop: 28, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={handleScan}
              disabled={loading}
              style={{
                ...primaryBtn,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Running..." : "Run Free Risk Scan"}
            </button>

            <a href="/sample-riskatlas-report.pdf" target="_blank" style={secondaryBtn}>
              Sample Report Preview
            </a>
          </div>

          {scanResult && (
            <div
              style={{
                marginTop: 36,
                borderRadius: 32,
                background: "#ffffff",
                padding: 36,
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
              }}
            >
              <div
                style={{
                  marginBottom: 10,
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#94a3b8",
                }}
              >
                Initial Exposure Result
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr",
                  gap: 28,
                  alignItems: "start",
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 40,
                      lineHeight: 1.05,
                      fontWeight: 700,
                      color: "#0f172a",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    Exposure Score Preview
                  </h3>

                  <p
                    style={{
                      marginTop: 16,
                      maxWidth: 760,
                      fontSize: 18,
                      lineHeight: 1.7,
                      color: "#64748b",
                    }}
                  >
                    This free scan gives you an initial view of structural exposure. Unlock
                    the full PDF report for strategic interpretation and action guidance.
                  </p>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                      gap: 18,
                      marginTop: 24,
                    }}
                  >
                    <div
                      style={{
                        borderRadius: 24,
                        background: "#f5f6f7",
                        padding: 24,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "#94a3b8",
                        }}
                      >
                        Score
                      </div>
                      <div
                        style={{
                          marginTop: 14,
                          fontSize: 52,
                          lineHeight: 1,
                          fontWeight: 700,
                          color: scoreTone,
                        }}
                      >
                        {scanResult.analysis.score}
                      </div>
                    </div>

                    <div
                      style={{
                        borderRadius: 24,
                        background: "#f5f6f7",
                        padding: 24,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "#94a3b8",
                        }}
                      >
                        Grade
                      </div>
                      <div
                        style={{
                          marginTop: 14,
                          fontSize: 52,
                          lineHeight: 1,
                          fontWeight: 700,
                          color: "#0f172a",
                        }}
                      >
                        {scanResult.analysis.grade}
                      </div>
                    </div>

                    <div
                      style={{
                        borderRadius: 24,
                        background: "#f5f6f7",
                        padding: 24,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "#94a3b8",
                        }}
                      >
                        Exposure
                      </div>
                      <div
                        style={{
                          marginTop: 14,
                          fontSize: 38,
                          lineHeight: 1.1,
                          fontWeight: 700,
                          color: "#0f172a",
                        }}
                      >
                        {scanResult.analysis.exposure_level}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 24,
                      borderRadius: 24,
                      background: "#f5f6f7",
                      padding: 24,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#94a3b8",
                        marginBottom: 10,
                      }}
                    >
                      Scan Interpretation
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 17,
                        lineHeight: 1.8,
                        color: "#334155",
                      }}
                    >
                      {scanResult.analysis.summary}
                    </p>
                  </div>
                </div>

                <div style={navyCard}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#cbd5e1",
                      marginBottom: 12,
                    }}
                  >
                    Full Report Unlock
                  </div>

                  <h4
                    style={{
                      margin: 0,
                      fontSize: 34,
                      lineHeight: 1.15,
                      fontWeight: 700,
                      color: "#ffffff",
                    }}
                  >
                    Structured PDF delivery
                  </h4>

                  <p
                    style={{
                      marginTop: 16,
                      fontSize: 18,
                      lineHeight: 1.8,
                      color: "rgba(255,255,255,0.84)",
                    }}
                  >
                    Unlock the full consulting-style report with score breakdown, structural
                    risk signals, and strategic actions.
                  </p>

                  <div style={{ marginTop: 28 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#cbd5e1",
                      }}
                    >
                      Price
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 52,
                        lineHeight: 1,
                        fontWeight: 700,
                        color: "#ffffff",
                      }}
                    >
                      A$49
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleUnlockReport}
                    disabled={unlocking}
                    style={{
                      marginTop: 28,
                      width: "100%",
                      borderRadius: 999,
                      border: "none",
                      background: "#ffffff",
                      color: "#0f172a",
                      padding: "16px 20px",
                      fontSize: 18,
                      fontWeight: 800,
                      cursor: unlocking ? "not-allowed" : "pointer",
                      opacity: unlocking ? 0.7 : 1,
                    }}
                  >
                    {unlocking ? "Redirecting..." : "Unlock Full Report"}
                  </button>

                  <div
                    style={{
                      marginTop: 18,
                      fontSize: 14,
                      lineHeight: 1.8,
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    Includes structured PDF output, score interpretation, and secure
                    download delivery.
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
