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
  } as React.CSSProperties;

  const heroSub = {
    marginTop: 20,
    fontSize: 20,
    color: "#475569",
    lineHeight: 1.7,
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

  return (
    <main style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <section style={container}>
        {/* Hero */}
        <h1 style={heroTitle}>
          Eastrion
          <br />
          Supply Chain Intelligence Platform
        </h1>

        <p style={heroSub}>
          Risk, planning, and execution tools for global SMEs operating across
          sourcing, logistics, and cross-border environments.
        </p>

        {/* Tools */}
        <div style={grid}>
          {/* RiskAtlas */}
          <div style={card}>
            <h3>RiskAtlas</h3>
            <p>
              Scan supply chain exposure across countries, industries, and
              logistics environments. Identify hidden risks before they become
              cost.
            </p>
            <a href="/riskatlas" style={button}>
              Run Risk Scan
            </a>
          </div>

          {/* Load Planning */}
          <div style={card}>
            <h3>Load Planning</h3>
            <p>
              Optimize container and truck loading based on dimensions, weight,
              and packing logic. Reduce cost and improve efficiency.
            </p>
            <a href="#" style={button}>
              Coming Soon
            </a>
          </div>

          {/* QR Tool */}
          <div style={card}>
            <h3>QR Tool</h3>
            <p>
              Generate QR codes for shipment tracking, product linking, and
              operational workflows across supply chains.
            </p>
            <a href="#" style={button}>
              Coming Soon
            </a>
          </div>
        </div>

        {/* Why */}
        <div style={{ marginTop: 80 }}>
          <h2>Why Eastrion</h2>
          <p style={{ ...heroSub, maxWidth: 700 }}>
            Eastrion combines structured risk intelligence with practical supply
            chain tools. Our goal is to help SMEs operate with more clarity,
            resilience, and execution confidence in an increasingly fragmented
            global environment.
          </p>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 60 }}>
          <a href="/riskatlas" style={button}>
            Try RiskAtlas
          </a>
        </div>
      </section>
    </main>
  );
}
