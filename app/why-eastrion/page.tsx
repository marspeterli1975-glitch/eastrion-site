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
      {/* ================= Hero ================= */}
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
            fontSize: "72px",
            lineHeight: 1.06,
            fontWeight: 500,
            letterSpacing: "-0.04em",
            margin: 0,
            maxWidth: "1120px",
          }}
        >
          From fragmented execution to structured, decision-ready supply chain visibility.
        </h1>

        <p
          style={{
            marginTop: "28px",
            maxWidth: "980px",
            fontSize: "20px",
            lineHeight: 1.8,
            color: "#475569",
          }}
        >
          Eastrion is positioned as a global supply chain infrastructure and risk
          intelligence partner for SMEs that need stronger sourcing visibility,
          operational coordination, and clearer risk signals before commercial
          exposure turns into execution problems.
        </p>

        <p
          style={{
            marginTop: "12px",
            maxWidth: "980px",
            fontSize: "16px",
            lineHeight: 1.85,
            color: "#64748b",
          }}
        >
          In 2026, volatility across Red Sea routing, Panama Canal constraints,
          regulatory shifts, and corridor-level disruption is reshaping how small
          and mid-sized businesses make sourcing, logistics, and execution
          decisions.
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

      {/* ================= 原有三卡 ================= */}
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
              We operate from Shanghai with China-linked supply chain experience,
              supported by specialist partners across sourcing, logistics, quality,
              and cross-border execution.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={labelStyle}>Core lens</div>
            <h3 style={cardTitleStyle}>Cost · Quality · Time · Risk</h3>
            <p style={cardTextStyle}>
              We do not treat supply chain support as a single quotation exercise.
              We frame it through execution quality, operational timing,
              concentrated exposure points, and commercial downside visibility.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={labelStyle}>Primary focus</div>
            <h3 style={cardTitleStyle}>SME supply chain performance</h3>
            <p style={cardTextStyle}>
              Our work is most relevant where smaller and mid-sized businesses
              need better structure across suppliers, corridors, execution, and
              risk communication before shipment commitments are locked in.
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: "28px",
            maxWidth: "980px",
            padding: "20px 22px",
            borderRadius: "18px",
            background: "rgba(15, 23, 42, 0.04)",
            border: "1px solid rgba(15, 23, 42, 0.06)",
            color: "#475569",
            fontSize: "15px",
            lineHeight: 1.75,
          }}
        >
          <strong style={{ color: "#0f172a" }}>Case snapshot:</strong> A
          China-based battery exporter used Eastrion’s structured framework to
          reduce route-level exposure points from 7 to 2 across Southeast Asia
          execution planning, avoiding an estimated US$9,800 in potential
          logistics loss.
        </div>
      </section>

      {/* ================= VOIF 新增模块 ================= */}
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        <div
          style={{
            marginBottom: "28px",
            maxWidth: "980px",
          }}
        >
          <div style={labelStyle}>Decision framework</div>

          <h2
            style={{
              fontSize: "40px",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              margin: "12px 0",
              lineHeight: 1.2,
            }}
          >
            Vertical Opportunity & Investability Framework
          </h2>

          <p
            style={{
              fontSize: "18px",
              color: "#475569",
              lineHeight: 1.8,
            }}
          >
            Before execution, the primary question is not how to deliver — but
            whether the opportunity itself is structurally sound. This framework
            provides a structured approach to evaluate commercial viability,
            operational feasibility, and exposure conditions in a consistent way.
          </p>

          <p
            style={{
              marginTop: "12px",
              fontSize: "15px",
              color: "#64748b",
              lineHeight: 1.8,
              maxWidth: "940px",
            }}
          >
            Most SMEs begin with RiskAtlas Scan to structure exposure quickly at
            Stage 1–3, then move into deeper execution support when Stage 4–6
            becomes relevant to real shipment, sourcing, or operating decisions.
          </p>
        </div>

        {/* 六阶段 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "20px",
          }}
        >
          {[
            "Define Scope & Context",
            "Value Chain & Stakeholder Mapping",
            "Process Breakdown & Quantification",
            "Pain & Friction Discovery",
            "Prioritization & Validation",
            "Opportunity Window & Hypothesis Solutions",
          ].map((item, index) => (
            <div key={index} style={cardStyle}>
              <div style={labelStyle}>Stage {index + 1}</div>
              <h3 style={cardTitleStyle}>{item}</h3>
            </div>
          ))}
        </div>

        {/* 核心判断语句 */}
        <div
          style={{
            marginTop: "40px",
            padding: "28px",
            background: "#0f172a",
            borderRadius: "20px",
            color: "white",
            fontSize: "20px",
            lineHeight: 1.6,
            maxWidth: "980px",
          }}
        >
          Most failures are not execution failures — but failures in defining the
          right problem.
        </div>

        {/* 引导到 RiskAtlas */}
        <div style={{ marginTop: "24px" }}>
          <div
            style={{
              fontSize: "14px",
              color: "#64748b",
              marginBottom: "12px",
            }}
          >
            Most SMEs start here: free scan first, then structured paid clarity if needed.
          </div>

          <Link href="/riskatlas" style={primaryBtn}>
            Run RiskAtlas Scan → (Free • 30 seconds)
          </Link>
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