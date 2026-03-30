export default function TermsPage() {
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
          Terms of Service
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
          These Terms of Service govern access to and use of RiskAtlas, related
          paid reports, and supporting services provided by Eastrion.
        </p>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>1. Service scope</h2>
          <p style={textStyle}>
            RiskAtlas is a supply chain risk intelligence and decision-support
            tool. It is designed to help users structure exposure across
            supplier, route, execution, and operating contexts. Eastrion may
            also provide supporting services related to sourcing, coordination,
            execution planning, or other commercially relevant follow-up work.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>2. Informational and analytical use only</h2>
          <p style={textStyle}>
            RiskAtlas outputs, reports, scans, advisory language, scoring, and
            related materials are provided for analytical and informational
            purposes only. They do not constitute legal, financial, tax,
            investment, engineering, or operational advice.
          </p>
          <p style={textStyle}>
            Users remain solely responsible for their own business, contractual,
            procurement, logistics, compliance, financial, and commercial
            decisions.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>3. No guarantee of outcomes</h2>
          <p style={textStyle}>
            Eastrion does not guarantee any particular commercial outcome,
            shipment result, operating improvement, delivery performance, risk
            reduction, or financial result arising from the use of RiskAtlas or
            related services.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>4. Paid access and digital delivery</h2>
          <p style={textStyle}>
            Paid purchases unlock access to specified digital content, report
            layers, or browser-based product features associated with the
            selected plan. Delivery may occur through browser access, unlocked
            report views, digital files, or other online methods depending on
            the current product configuration.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>5. Refund policy</h2>
          <p style={textStyle}>
            Due to the digital and immediately accessible nature of RiskAtlas
            reports and paid content, payments are generally non-refundable once
            access has been granted or the product has been unlocked.
          </p>
          <p style={textStyle}>
            If you experience a technical access issue, billing error, or
            duplicate payment, please contact Eastrion within 7 days of purchase
            so the issue can be reviewed.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>6. User responsibilities</h2>
          <p style={textStyle}>
            Users agree to provide accurate information where required, use the
            service lawfully, and refrain from abusing, reverse engineering,
            misusing, or interfering with the normal operation of the website,
            checkout flow, or report delivery system.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>7. Intellectual property</h2>
          <p style={textStyle}>
            Unless otherwise stated, RiskAtlas, Eastrion branding, website
            content, framework language, report structures, visual design, and
            written materials remain the intellectual property of Eastrion or
            its licensors. Purchase does not transfer ownership of underlying
            intellectual property.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>8. Service changes</h2>
          <p style={textStyle}>
            Eastrion may update, improve, suspend, revise, or discontinue parts
            of the website, product logic, report structure, pricing, feature
            access, or service configuration at any time, with or without prior
            notice.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>9. Limitation of liability</h2>
          <p style={textStyle}>
            To the maximum extent permitted by law, Eastrion shall not be liable
            for indirect, incidental, consequential, special, or punitive
            damages, or for loss of profit, business interruption, shipment
            disruption, contractual loss, opportunity loss, or procurement loss
            arising from use of the service.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>10. Contact</h2>
          <p style={textStyle}>
            For billing, technical, or service-related questions, please contact:
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