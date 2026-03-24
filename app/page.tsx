import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020817",
        color: "#e2e8f0",
      }}
    >
      <section
  style={{
    minHeight: "calc(100vh - 80px)", // ⭐关键
    display: "flex",
    alignItems: "center",

    background:
      "radial-gradient(circle at top right, rgba(37, 99, 235, 0.35), transparent 28%), linear-gradient(135deg, #020817 0%, #031033 52%, #071a3d 100%)",
    borderBottom: "1px solid rgba(148, 163, 184, 0.12)",
  }}
>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "40px 24px 40px",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "42px",
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 18px",
                borderRadius: "999px",
                border: "1px solid rgba(56, 189, 248, 0.28)",
                background: "rgba(14, 116, 144, 0.14)",
                color: "#a5f3fc",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.02em",
                marginBottom: "22px",
              }}
            >
              RiskAtlas · Supply Chain Risk Assessment + Decision Engine
            </div>

            <h1
              style={{
                fontSize: "72px",
                lineHeight: 1.02,
                fontWeight: 800,
                letterSpacing: "-0.05em",
                color: "#f8fafc",
                margin: 0,
                maxWidth: "860px",
              }}
            >
              Turn supply chain uncertainty into a structured, paid risk
              intelligence workflow.
            </h1>

            <p
              style={{
                marginTop: "26px",
                maxWidth: "860px",
                fontSize: "19px",
                lineHeight: 1.8,
                color: "#cbd5e1",
              }}
            >
              RiskAtlas helps importers, exporters, sourcing teams and logistics
              operators quickly identify exposure across supplier, route,
              country and execution layers — starting with an initial
              assessment, then upgrading into a professional decision-ready
              report.
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

              <Link href="/riskatlas/pricing" style={secondaryBtnDark}>
                View Pricing
              </Link>

              <Link href="/contact" style={textBtn}>
                Contact Eastrion
              </Link>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "22px",
              }}
            >
              <div style={chipStyle}>Initial risk signal</div>
              <div style={chipStyle}>Paid report conversion</div>
              <div style={chipStyle}>Execution upgrade path</div>
            </div>
          </div>

          <div
            style={{
              background: "rgba(15, 23, 42, 0.68)",
              border: "1px solid rgba(148, 163, 184, 0.12)",
              borderRadius: "28px",
              padding: "28px",
              boxShadow: "0 24px 60px rgba(2, 8, 23, 0.35)",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#94a3b8",
                marginBottom: "10px",
              }}
            >
              Commercial flow
            </div>

            <h2
              style={{
                fontSize: "28px",
                lineHeight: 1.2,
                fontWeight: 800,
                color: "#f8fafc",
                margin: "0 0 18px",
              }}
            >
              From initial signal to paid action
            </h2>

            <div style={{ display: "grid", gap: "14px" }}>
              <div style={flowCardStyle}>
                <div style={flowTopRowStyle}>
                  <div style={flowStepStyle}>Step 1 · Entry</div>
                  <div style={flowBadgeBlue}>Entry</div>
                </div>
                <div style={flowTitleStyle}>Initial Risk Signal</div>
                <div style={flowTextStyle}>
                  Get a quick initial view of your supply chain exposure and see
                  the structure of your risk report.
                </div>
              </div>

              <div style={flowCardStyle}>
                <div style={flowTopRowStyle}>
                  <div style={flowStepGreenStyle}>Step 2 · US$49</div>
                  <div style={flowBadgeGreen}>Core Offer</div>
                </div>
                <div style={flowTitleStyle}>Unlock Full Report</div>
                <div style={flowTextStyle}>
                  Access score explanation, executive summary, factor breakdown,
                  priority action plan and premium module preview.
                </div>
              </div>

              <div style={flowCardStyle}>
                <div style={flowTopRowStyle}>
                  <div style={flowStepAmberStyle}>Step 3 · US$149</div>
                  <div style={flowBadgeAmber}>Premium</div>
                </div>
                <div style={flowTitleStyle}>Execution Upgrade</div>
                <div style={flowTextStyle}>
                  Go beyond diagnosis with stronger execution guidance,
                  recommended next actions and deeper operational prioritization.
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginTop: "18px",
              }}
            >
              <Link href="/riskatlas/pricing" style={whiteBtn}>
                View Pricing
              </Link>

              <Link href="/riskatlas" style={darkOutlineBtn}>
                Enter RiskAtlas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
          background: "#020817",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "72px 24px 72px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#67e8f9",
              fontWeight: 700,
              marginBottom: "14px",
            }}
          >
            Why Eastrion can do this
          </div>

          <h2
            style={{
              fontSize: "58px",
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#f8fafc",
              margin: 0,
              maxWidth: "980px",
            }}
          >
            Risk intelligence only matters when it is connected to real
            execution.
          </h2>

          <p
            style={{
              marginTop: "22px",
              maxWidth: "980px",
              fontSize: "18px",
              lineHeight: 1.85,
              color: "#cbd5e1",
            }}
          >
            Eastrion is not positioning RiskAtlas as an isolated software
            widget. The product is grounded in real cross-border supply chain
            work, where supplier ambiguity, logistics disruption, corridor
            volatility and execution friction directly affect commercial
            outcomes.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "22px",
              marginTop: "30px",
            }}
          >
            <div style={darkCardStyle}>
              <div style={smallTagBlue}>Industrial context</div>
              <h3 style={darkCardTitleStyle}>Real operating cases</h3>
              <p style={darkCardTextStyle}>
                The framework is informed by practical sourcing, industrial
                equipment, battery recycling and cross-border execution
                scenarios.
              </p>
            </div>

            <div style={darkCardStyle}>
              <div style={smallTagGreen}>Execution lens</div>
              <h3 style={darkCardTitleStyle}>More than theoretical scoring</h3>
              <p style={darkCardTextStyle}>
                Risk is framed through cost, timing, supplier concentration,
                route dependency and commercial exposure — not just abstract
                headlines.
              </p>
            </div>

            <div style={darkCardStyle}>
              <div style={smallTagAmber}>Hybrid model</div>
              <h3 style={darkCardTitleStyle}>Product + service architecture</h3>
              <p style={darkCardTextStyle}>
                RiskAtlas captures attention and structures the problem.
                Eastrion’s services help move qualified opportunities into
                actual execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
          background: "#020817",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "72px 24px 72px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#67e8f9",
              fontWeight: 700,
              marginBottom: "14px",
            }}
          >
            Services
          </div>

          <h2
            style={{
              fontSize: "54px",
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#f8fafc",
              margin: 0,
              maxWidth: "920px",
            }}
          >
            Eastrion supports the workflow beyond the scan.
          </h2>

          <p
            style={{
              marginTop: "22px",
              maxWidth: "980px",
              fontSize: "18px",
              lineHeight: 1.85,
              color: "#cbd5e1",
            }}
          >
            RiskAtlas is the entry point, but not the whole business. For
            qualified cases, Eastrion can continue supporting execution through
            service lines that match your actual commercial needs.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "22px",
              marginTop: "30px",
            }}
          >
            <div style={darkCardStyle}>
              <div style={moduleLabelStyle}>Module 01</div>
              <h3 style={darkCardTitleStyle}>Risk Exposure Scanning</h3>
              <p style={darkCardTextStyle}>
                Initial country-industry-supplier-route exposure framing through
                the RiskAtlas logic and structured reporting pathway.
              </p>
              <div style={{ marginTop: "20px" }}>
                <Link href="/riskatlas" style={linkCyan}>
                  Enter RiskAtlas →
                </Link>
              </div>
            </div>

            <div style={darkCardStyle}>
              <div style={moduleLabelStyle}>Module 02</div>
              <h3 style={darkCardTitleStyle}>Sourcing & Industrial Trade</h3>
              <p style={darkCardTextStyle}>
                Structured support for supplier discovery, industrial product
                matching, technical coordination and project-oriented trade
                opportunities.
              </p>
              <div style={{ marginTop: "20px" }}>
                <Link href="/contact" style={linkGreen}>
                  Contact Eastrion →
                </Link>
              </div>
            </div>

            <div style={darkCardStyle}>
              <div style={moduleLabelStyle}>Module 03</div>
              <h3 style={darkCardTitleStyle}>Logistics & Execution Support</h3>
              <p style={darkCardTextStyle}>
                Cross-border shipment coordination, execution follow-up, planning
                logic and supply chain communication support where corridor risk
                matters.
              </p>
              <div style={{ marginTop: "20px" }}>
                <Link href="/contact" style={linkAmber}>
                  Contact Eastrion →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          background: "#020817",
          padding: "62px 24px 72px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            background:
              "linear-gradient(90deg, rgba(15, 35, 87, 0.35), rgba(8, 145, 178, 0.18), rgba(34, 197, 94, 0.14))",
            border: "1px solid rgba(103, 232, 249, 0.12)",
            borderRadius: "30px",
            padding: "34px",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "28px",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "14px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#67e8f9",
                fontWeight: 700,
                marginBottom: "12px",
              }}
            >
              Start here
            </div>

            <h2
              style={{
                fontSize: "56px",
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#f8fafc",
                margin: 0,
              }}
            >
              Choose the right entry point for your next step.
            </h2>

            <p
              style={{
                marginTop: "18px",
                fontSize: "18px",
                lineHeight: 1.85,
                color: "#dbeafe",
                maxWidth: "820px",
              }}
            >
              Use RiskAtlas if you want a structured starting point for risk
              visibility. Contact Eastrion directly if your case already
              involves sourcing, logistics, industrial products or cross-border
              execution support.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: "14px",
            }}
          >
            <Link href="/riskatlas" style={ctaPrimaryWide}>
              Start Risk Assessment
            </Link>

            <Link href="/riskatlas/pricing" style={ctaDarkWide}>
              View Pricing
            </Link>

            <Link href="/contact" style={ctaGreenWide}>
              Contact Eastrion for Service Support
            </Link>
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
  padding: "16px 30px",
  borderRadius: "999px",
  background: "linear-gradient(135deg, #60d5f2 0%, #6ee7b7 100%)",
  color: "#082f49",
  fontWeight: 800,
  fontSize: "16px",
  textDecoration: "none",
  whiteSpace: "nowrap" as const,
};

const secondaryBtnDark = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px 30px",
  borderRadius: "999px",
  background: "rgba(15, 23, 42, 0.24)",
  border: "1px solid rgba(148, 163, 184, 0.2)",
  color: "#f8fafc",
  fontWeight: 800,
  fontSize: "16px",
  textDecoration: "none",
  whiteSpace: "nowrap" as const,
};

const textBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px 18px",
  color: "#cbd5e1",
  fontWeight: 600,
  fontSize: "16px",
  textDecoration: "none",
  whiteSpace: "nowrap" as const,
};

const chipStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 16px",
  borderRadius: "999px",
  background: "rgba(15, 23, 42, 0.26)",
  border: "1px solid rgba(148, 163, 184, 0.14)",
  color: "#94a3b8",
  fontSize: "14px",
  fontWeight: 500,
};

const flowCardStyle = {
  background: "rgba(2, 6, 23, 0.4)",
  border: "1px solid rgba(148, 163, 184, 0.12)",
  borderRadius: "22px",
  padding: "18px 18px 16px",
};

const flowTopRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  marginBottom: "10px",
};

const flowStepStyle = {
  color: "#67e8f9",
  fontWeight: 700,
  fontSize: "14px",
};

const flowStepGreenStyle = {
  color: "#86efac",
  fontWeight: 700,
  fontSize: "14px",
};

const flowStepAmberStyle = {
  color: "#fcd34d",
  fontWeight: 700,
  fontSize: "14px",
};

const flowBadgeBlue = {
  padding: "6px 12px",
  borderRadius: "999px",
  background: "rgba(14, 165, 233, 0.14)",
  color: "#bae6fd",
  fontSize: "13px",
  fontWeight: 700,
};

const flowBadgeGreen = {
  padding: "6px 12px",
  borderRadius: "999px",
  background: "rgba(34, 197, 94, 0.12)",
  color: "#bbf7d0",
  fontSize: "13px",
  fontWeight: 700,
};

const flowBadgeAmber = {
  padding: "6px 12px",
  borderRadius: "999px",
  background: "rgba(245, 158, 11, 0.12)",
  color: "#fde68a",
  fontSize: "13px",
  fontWeight: 700,
};

const flowTitleStyle = {
  fontSize: "20px",
  fontWeight: 800,
  color: "#f8fafc",
  marginBottom: "8px",
};

const flowTextStyle = {
  fontSize: "16px",
  lineHeight: 1.7,
  color: "#cbd5e1",
};

const whiteBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px 18px",
  borderRadius: "16px",
  background: "#f8fafc",
  color: "#0f172a",
  fontWeight: 800,
  fontSize: "16px",
  textDecoration: "none",
};

const darkOutlineBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px 18px",
  borderRadius: "16px",
  background: "rgba(15, 23, 42, 0.22)",
  border: "1px solid rgba(148, 163, 184, 0.18)",
  color: "#f8fafc",
  fontWeight: 800,
  fontSize: "16px",
  textDecoration: "none",
};

const darkCardStyle = {
  background: "rgba(15, 23, 42, 0.4)",
  border: "1px solid rgba(148, 163, 184, 0.1)",
  borderRadius: "28px",
  padding: "26px",
};

const darkCardTitleStyle = {
  fontSize: "26px",
  lineHeight: 1.2,
  fontWeight: 800,
  color: "#f8fafc",
  margin: "16px 0 14px",
  letterSpacing: "-0.02em",
};

const darkCardTextStyle = {
  fontSize: "17px",
  lineHeight: 1.85,
  color: "#cbd5e1",
  margin: 0,
};

const smallTagBlue = {
  display: "inline-flex",
  padding: "8px 14px",
  borderRadius: "999px",
  background: "rgba(14, 165, 233, 0.12)",
  color: "#bae6fd",
  fontSize: "14px",
  fontWeight: 700,
};

const smallTagGreen = {
  display: "inline-flex",
  padding: "8px 14px",
  borderRadius: "999px",
  background: "rgba(34, 197, 94, 0.12)",
  color: "#bbf7d0",
  fontSize: "14px",
  fontWeight: 700,
};

const smallTagAmber = {
  display: "inline-flex",
  padding: "8px 14px",
  borderRadius: "999px",
  background: "rgba(245, 158, 11, 0.12)",
  color: "#fde68a",
  fontSize: "14px",
  fontWeight: 700,
};

const moduleLabelStyle = {
  fontSize: "14px",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "#94a3b8",
  fontWeight: 700,
};

const linkCyan = {
  color: "#6ee7ff",
  fontWeight: 700,
  fontSize: "16px",
  textDecoration: "none",
};

const linkGreen = {
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

const ctaPrimaryWide = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "18px 22px",
  borderRadius: "18px",
  background: "linear-gradient(135deg, #60d5f2 0%, #6ee7b7 100%)",
  color: "#082f49",
  fontWeight: 800,
  fontSize: "17px",
  textDecoration: "none",
};

const ctaDarkWide = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "18px 22px",
  borderRadius: "18px",
  background: "rgba(15, 23, 42, 0.22)",
  border: "1px solid rgba(148, 163, 184, 0.18)",
  color: "#f8fafc",
  fontWeight: 800,
  fontSize: "17px",
  textDecoration: "none",
};

const ctaGreenWide = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "18px 22px",
  borderRadius: "18px",
  background: "rgba(22, 163, 74, 0.14)",
  border: "1px solid rgba(74, 222, 128, 0.16)",
  color: "#bbf7d0",
  fontWeight: 800,
  fontSize: "17px",
  textDecoration: "none",
};