import Link from "next/link";

export default function WhyEastrionPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        color: "#0f172a",
      }}
    >
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "64px 24px 32px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#94a3b8",
            fontWeight: 700,
            marginBottom: "20px",
          }}
        >
          Why Eastrion
        </div>

        <h1
          style={{
            fontSize: "76px",
            lineHeight: 1.05,
            fontWeight: 500,
            letterSpacing: "-0.04em",
            margin: 0,
            maxWidth: "1100px",
          }}
        >
          From fragmented execution to structured supply chain visibility.
        </h1>

        <p
          style={{
            marginTop: "28px",
            maxWidth: "920px",
            fontSize: "20px",
            lineHeight: 1.8,
            color: "#475569",
          }}
        >
          Eastrion is positioned as a global supply chain infrastructure and risk
          intelligence partner for SMEs that need stronger sourcing visibility,
          operational coordination and clearer risk signals.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            marginTop: "28px",
          }}
        >
          <Link href="/solutions" style={primaryBtn}>
            Explore Services
          </Link>

          <Link href="/riskatlas" style={secondaryBtn}>
            Enter RiskAtlas
          </Link>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "8px 24px 56px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "20px",
          }}
        >
          <div style={cardStyle}>
            <div style={labelStyle}>Operating model</div>
            <h3 style={cardTitleStyle}>
              Expert-led, partner-enabled, execution-focused
            </h3>
            <p style={cardTextStyle}>
              We work through a flexible model supported by specialist partners
              across sourcing, logistics, quality and cross-border execution.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={labelStyle}>Core lens</div>
            <h3 style={cardTitleStyle}>Cost · Quality · Time · Risk</h3>
            <p style={cardTextStyle}>
              We do not treat supply chain support as a single quotation exercise.
              We frame it through execution quality, operational timing and
              concentrated exposure points.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={labelStyle}>Primary focus</div>
            <h3 style={cardTitleStyle}>SME supply chain performance</h3>
            <p style={cardTextStyle}>
              Our work is most relevant where smaller and mid-sized businesses
              need better structure across suppliers, corridors, execution and
              risk communication.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

const primaryBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 28px",
  borderRadius: "999px",
  background: "linear-gradient(135deg, #0f2357 0%, #3aa39f 100%)",
  color: "white",
  fontWeight: 800,
  fontSize: "16px",
  textDecoration: "none",
  boxShadow: "0 10px 24px rgba(15, 35, 87, 0.18)",
  whiteSpace: "nowrap" as const,
};

const secondaryBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 28px",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.72)",
  color: "#0f172a",
  fontWeight: 800,
  fontSize: "16px",
  textDecoration: "none",
  whiteSpace: "nowrap" as const,
};

const cardStyle = {
  background: "rgba(255,255,255,0.72)",
  borderRadius: "28px",
  padding: "28px",
  border: "1px solid rgba(15, 23, 42, 0.05)",
};

const labelStyle = {
  fontSize: "14px",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "#94a3b8",
  fontWeight: 700,
};

const cardTitleStyle = {
  fontSize: "28px",
  lineHeight: 1.2,
  fontWeight: 500,
  margin: "14px 0 14px",
  letterSpacing: "-0.03em",
};

const cardTextStyle = {
  fontSize: "16px",
  lineHeight: 1.85,
  color: "#64748b",
  margin: 0,
};