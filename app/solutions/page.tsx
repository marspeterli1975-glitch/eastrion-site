import Link from "next/link";

export default function SolutionsPage() {
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
          padding: "64px 24px 36px",
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
          Solutions
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
          Structured supply chain support for global SMEs.
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
          Eastrion supports sourcing, trade execution, coordination and structured
          risk visibility across cross-border operations.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            marginTop: "28px",
          }}
        >
          <Link href="/riskatlas" style={primaryBtn}>
            Start Risk Assessment
          </Link>

          <Link href="/contact" style={secondaryBtn}>
            Contact Eastrion
          </Link>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px 44px",
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
            <div style={labelStyle}>Module 01</div>
            <h3 style={cardTitleStyle}>Risk Exposure Scanning</h3>
            <p style={cardTextStyle}>
              Initial country-industry-logistics-event exposure screening through
              the RiskAtlas framework.
            </p>
            <div style={{ marginTop: "22px" }}>
              <Link href="/riskatlas" style={linkCyan}>
                Enter RiskAtlas →
              </Link>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={labelStyle}>Module 02</div>
            <h3 style={cardTitleStyle}>Sourcing Support</h3>
            <p style={cardTextStyle}>
              Supplier discovery, qualification framing and structured execution
              support for global SME trade activity.
            </p>
            <div style={{ marginTop: "22px" }}>
              <Link href="/contact" style={linkEmerald}>
                Contact Eastrion →
              </Link>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={labelStyle}>Module 03</div>
            <h3 style={cardTitleStyle}>Operational Coordination</h3>
            <p style={cardTextStyle}>
              Practical support for cross-border shipment coordination,
              documentation awareness and execution alignment.
            </p>
            <div style={{ marginTop: "22px" }}>
              <Link href="/contact" style={linkAmber}>
                Contact Eastrion →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px 72px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "28px",
            alignItems: "start",
          }}
        >
          <div>
            <div style={labelStyle}>How to engage</div>
            <h2
              style={{
                fontSize: "44px",
                lineHeight: 1.15,
                fontWeight: 650,
                margin: "12px 0 18px",
                letterSpacing: "-0.03em",
              }}
            >
              Start with visibility, then deepen the workflow.
            </h2>
            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.9,
                color: "#475569",
                margin: 0,
              }}
            >
              A typical engagement can begin with a lightweight exposure scan,
              then move toward more detailed sourcing review, corridor discussion,
              execution planning or tailored assessment.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: "18px",
            }}
          >
            <div style={infoBoxStyle}>
              <div style={infoTitleStyle}>Early stage</div>
              <div style={infoTextStyle}>
                Use RiskAtlas to frame where the main exposure may be concentrated.
              </div>
            </div>

            <div style={infoBoxStyle}>
              <div style={infoTitleStyle}>Middle stage</div>
              <div style={infoTextStyle}>
                Clarify supplier assumptions, route dependencies and execution
                friction points.
              </div>
            </div>

            <div style={infoBoxStyle}>
              <div style={infoTitleStyle}>Next step</div>
              <div style={infoTextStyle}>
                Move into tailored discussion with Eastrion where corridor or
                supplier detail matters.
              </div>
            </div>
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

const infoBoxStyle = {
  background: "rgba(255,255,255,0.72)",
  borderRadius: "28px",
  padding: "24px 24px 22px",
  border: "1px solid rgba(15, 23, 42, 0.05)",
};

const infoTitleStyle = {
  fontSize: "20px",
  fontWeight: 700,
  color: "#0f172a",
  marginBottom: "10px",
};

const infoTextStyle = {
  fontSize: "16px",
  lineHeight: 1.8,
  color: "#64748b",
};

const linkCyan = {
  color: "#6ee7ff",
  fontWeight: 700,
  fontSize: "16px",
  textDecoration: "none",
};

const linkEmerald = {
  color: "#86efac",
  fontWeight: 700,
  fontSize: "16px",
  textDecoration: "none",
};

const linkAmber = {
  color: "#fcd34d",
  fontWeight: 700,
  fontSize: "16px",
  textDecoration: "none",
};