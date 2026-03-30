export default function PrivacyPage() {
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
          Privacy Policy
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
          This Privacy Policy explains how Eastrion collects, uses, and handles
          information in connection with RiskAtlas, related paid reports, and
          supporting services.
        </p>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>1. Information we collect</h2>
          <p style={textStyle}>We may collect the following categories of information:</p>
          <ul style={listStyle}>
            <li>Email address and contact details provided during checkout or communication</li>
            <li>Payment-related session details returned by payment processors</li>
            <li>Business context or problem descriptions voluntarily submitted by users</li>
            <li>Basic technical and usage information needed to deliver site functionality</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>2. How we use information</h2>
          <p style={textStyle}>We use collected information to:</p>
          <ul style={listStyle}>
            <li>Deliver RiskAtlas access, report unlocks, and related service functions</li>
            <li>Verify completed payments and provide support for purchased products</li>
            <li>Respond to customer inquiries and follow-up communication</li>
            <li>Improve product experience, service quality, and operational reliability</li>
            <li>Maintain reasonable records for business, billing, and compliance purposes</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>3. Payments</h2>
          <p style={textStyle}>
            Payments are processed through third-party payment providers such as
            Stripe. Eastrion does not store full card numbers or full payment
            credentials on this website. Payment information is subject to the
            policies and security controls of the payment provider.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>4. Data sharing</h2>
          <p style={textStyle}>
            Eastrion does not sell personal information. Information may be
            shared only where reasonably necessary to operate the service, such
            as with payment providers, hosting services, analytics tools, or
            technical infrastructure providers.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>5. Confidentiality of submitted business information</h2>
          <p style={textStyle}>
            Information voluntarily submitted through email, contact forms, or
            structured business discussions is treated as confidential and used
            only for evaluation, communication, service delivery, or related
            support purposes.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>6. Data retention</h2>
          <p style={textStyle}>
            We retain information only as long as reasonably necessary for
            service delivery, support, payment verification, business records,
            dispute handling, and compliance requirements.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>7. Security</h2>
          <p style={textStyle}>
            Eastrion uses reasonable administrative and technical measures to
            protect information, but no website, browser environment, or online
            transmission method can be guaranteed to be completely secure.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>8. International use</h2>
          <p style={textStyle}>
            Because Eastrion supports international business activity, data may
            be processed across different jurisdictions depending on the hosting,
            payment, or communication infrastructure used to deliver the service.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={headingStyle}>9. Your contact rights</h2>
          <p style={textStyle}>
            If you have questions about your information or would like to request
            correction or deletion where appropriate, please contact Eastrion.
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

const listStyle = {
  margin: "0 0 12px 20px",
  padding: 0,
  color: "#475569",
  fontSize: "16px",
  lineHeight: 1.85,
};

const linkStyle = {
  color: "#0f766e",
  textDecoration: "none",
};