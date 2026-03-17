export default function HomePage() {
  const container = {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "80px 24px",
  } as React.CSSProperties;

  const heroTitle = {
    fontSize: 64,
    fontWeight: 800,
    letterSpacing: "-0.03em",
    color: "#0f172a",
    lineHeight: 1.05,
  } as React.CSSProperties;

  const heroSub = {
    marginTop: 20,
    fontSize: 20,
    color: "#475569",
    lineHeight: 1.7,
    maxWidth: 980,
  } as React.CSSProperties;

  const heroSubStrong = {
    marginTop: 18,
    fontSize: 20,
    color: "#0f172a",
    lineHeight: 1.7,
    fontWeight: 600,
    maxWidth: 920,
  } as React.CSSProperties;

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24,
    marginTop: 60,
  } as React.CSSProperties;

  const card = {
    borderRadius: 24,
    padding: 28,
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 320,
  } as React.CSSProperties;

  const button = {
    marginTop: 20,
    display: "inline-block",
    padding: "12px 20px",
    borderRadius: 999,
    background: "#0f172a",
    color: "#ffffff",
    fontWeight: 700,
    textDecoration: "none",
  } as React.CSSProperties;

  const mutedLabel = {
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#94a3b8",
    marginBottom: 10,
  } as React.CSSProperties;

  return (
    <main style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <section style={container}>
        <h1 style={heroTitle}>
          Eastrion
          <br />
          Supply Chain Intelligence Platform
        </h1>

        <p style={heroSub}>
          Risk, planning, and execution tools for global SMEs operating across sourcing,
          logistics, and cross-border environments.
        </p>

        <p style={heroSubStrong}>Identify hidden risk before it becomes cost.</p>

        <p
          style={{
            marginTop: 10,
            fontSize: 18,
            color: "#64748b",
            lineHeight: 1.7,
            maxWidth: 920,
          }}
        >
          Most supply chain failures are predictable — but ignored.
        </p>

        <div style={grid}>
          <div style={card}>
            <div>
              <h3 style={{ fontSize: 30, margin: 0, color: "#0f172a" }}>RiskAtlas</h3>
              <p
                style={{
                  marginTop: 16,
                  fontSize: 18,
                  lineHeight: 1.7,
                  color: "#334155",
                }}
              >
                Scan supply chain exposure across countries, industries, and logistics
                environments. Identify hidden risks before they become cost.
              </p>
              <p
                style={{
                  marginTop: 12,
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "#64748b",
                  fontWeight: 600,
                }}
              >
                Equivalent to a consulting-grade initial assessment.
              </p>
            </div>
            <a href="/riskatlas" style={button}>
              Run Risk Scan
            </a>
          </div>

          <div style={card}>
            <div>
              <h3 style={{ fontSize: 30, margin: 0, color: "#0f172a" }}>Load Planning</h3>
              <p
                style={{
                  marginTop: 16,
                  fontSize: 18,
                  lineHeight: 1.7,
                  color: "#334155",
                }}
              >
                Optimize container and truck loading based on dimensions, weight, and
                packing logic. Reduce cost and improve efficiency.
              </p>
            </div>
            <a href="/load-planning" style={button}>
              Open Tool
            </a>
          </div>

          <div style={card}>
            <div>
              <h3 style={{ fontSize: 30, margin: 0, color: "#0f172a" }}>QR Tool</h3>
              <p
                style={{
                  marginTop: 16,
                  fontSize: 18,
                  lineHeight: 1.7,
                  color: "#334155",
                }}
              >
                Generate QR codes for shipment tracking, product linking, and operational
                workflows across supply chains.
              </p>
            </div>
            <a href="#" style={button}>
              Coming Soon
            </a>
          </div>
        </div>

        <div style={{ marginTop: 90, maxWidth: 980 }}>
          <h2 style={{ fontSize: 46, margin: 0, color: "#0f172a" }}>Why Eastrion</h2>

          <p
            style={{
              marginTop: 24,
              fontSize: 20,
              lineHeight: 1.8,
              color: "#475569",
            }}
          >
            Eastrion combines structured risk intelligence with practical supply chain
            tools. Our goal is to help SMEs operate with more clarity, resilience, and
            execution confidence in an increasingly fragmented global environment.
          </p>

          <div
            style={{
              marginTop: 28,
              padding: 24,
              borderRadius: 24,
              background: "#ffffff",
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={mutedLabel}>Operational Relevance</div>
            <div
              style={{
                fontSize: 18,
                lineHeight: 1.9,
                color: "#334155",
              }}
            >
              Designed for real supply chain operations:
              <br />
              • Battery recycling
              <br />
              • Industrial equipment
              <br />
              • Cross-border sourcing
              <br />
              • Global logistics execution
              <br />
              • Door-to-door delivery and local support
            </div>
          </div>
        </div>

        <div style={{ marginTop: 60 }}>
          <a href="/riskatlas" style={button}>
            Try RiskAtlas
          </a>
        </div>
      </section>
    </main>
  );
}
