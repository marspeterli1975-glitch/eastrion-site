import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#f8fafc",
        borderTop: "1px solid rgba(15, 23, 42, 0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "56px 24px 28px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr 1fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "26px",
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: "18px",
                letterSpacing: "-0.02em",
              }}
            >
              Eastrion
            </div>

            <p
              style={{
                margin: 0,
                maxWidth: "420px",
                fontSize: "16px",
                lineHeight: 1.8,
                color: "#64748b",
              }}
            >
              Global supply chain infrastructure and structured risk intelligence
              for SMEs operating across sourcing, coordination and cross-border
              execution.
            </p>
          </div>

          <div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#0f172a",
                marginBottom: "18px",
              }}
            >
              Navigation
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <Link href="/" style={footerLinkStyle}>
                Home
              </Link>
              <Link href="/about" style={footerLinkStyle}>
                Why Eastrion
              </Link>
              <Link href="/solutions" style={footerLinkStyle}>
                Services
              </Link>
              <Link href="/riskatlas" style={footerLinkStyle}>
                RiskAtlas
              </Link>
              <Link href="/contact" style={footerLinkStyle}>
                Contact
              </Link>
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#0f172a",
                marginBottom: "18px",
              }}
            >
              Contact
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#64748b",
              }}
            >
              <div>Shanghai Eastrion Information Science &amp; Technology Co., Ltd</div>
              <div>Shanghai, China</div>
              <div>peter.li@eastrion.com</div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "34px",
            paddingTop: "22px",
            borderTop: "1px solid rgba(15, 23, 42, 0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "#94a3b8",
            }}
          >
            © Eastrion. All rights reserved.
          </div>

          <div
            style={{
              fontSize: "14px",
              color: "#94a3b8",
            }}
          >
            Flagship product: RiskAtlas
          </div>
        </div>
      </div>
    </footer>
  );
}

const footerLinkStyle = {
  color: "#334155",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: 600,
  whiteSpace: "nowrap" as const,
};