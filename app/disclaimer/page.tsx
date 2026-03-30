export default function DisclaimerPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#0f172a",
      }}
    >
      <section
        style={{
          maxWidth: "980px",
          margin: "0 auto",
          padding: "56px 24px 80px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#94a3b8",
            fontWeight: 700,
            marginBottom: "18px",
          }}
        >
          Legal
        </div>

        <h1
          style={{
            fontSize: "56px",
            lineHeight: 1.08,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            margin: 0,
            maxWidth: "860px",
          }}
        >
          Disclaimer
        </h1>

        <p
          style={{
            marginTop: "18px",
            fontSize: "16px",
            lineHeight: 1.85,
            color: "#475569",
            maxWidth: "860px",
          }}
        >
          This disclaimer applies to RiskAtlas, related reports, website content,
          and supporting services provided by Eastrion.
        </p>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>1. Informational use only</h2>
          <p style={textStyle}>
            All information, analysis, reports, scans, advisory language, and
            related outputs are provided for informational and analytical
            purposes only.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>2. No professional advice</h2>
          <p style={textStyle}>
            Nothing on this website or in RiskAtlas outputs constitutes legal,
            financial, tax, investment, engineering, logistics, or operational
            advice.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>3. No guarantee of outcome</h2>
          <p style={textStyle}>
            Eastrion does not guarantee any specific business result, shipment
            outcome, risk reduction, cost improvement, supplier performance,
            delivery result, or financial return.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>4. User responsibility</h2>
          <p style={textStyle}>
            Users remain solely responsible for their own commercial,
            contractual, sourcing, logistics, compliance, and operating
            decisions.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>5. Limitation of liability</h2>
          <p style={textStyle}>
            To the maximum extent permitted by law, Eastrion shall not be liable
            for any direct, indirect, incidental, consequential, or special loss
            arising from the use of this site, RiskAtlas, or related materials.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>6. Contact</h2>
          <p style={textStyle}>
            For questions regarding this disclaimer, please contact:
          </p>
          <p style={textStyle}>
            Email:{" "}
            <a href="mailto:peter.li@eastrion.com" style={linkStyle}>
              peter.li@eastrion.com
            </a>
          </p>
        </div>

        <div
          style={{
            marginTop: "36px",
            paddingTop: "18px",
            borderTop: "1px solid rgba(15, 23, 42, 0.08)",
            fontSize: "14px",
            color: "#64748b",
          }}
        >
          Last updated: March 2026
        </div>
      </section>
    </main>
  );
}

const sectionStyle = {
  marginTop: "32px",
};

const headingStyle = {
  fontSize: "24px",
  lineHeight: 1.25,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  margin: "0 0 12px",
};

const textStyle = {
  fontSize: "16px",
  lineHeight: 1.85,
  color: "#475569",
  margin: "0 0 12px",
};

const linkStyle = {
  color: "#0f766e",
  textDecoration: "none",
};