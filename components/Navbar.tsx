import Link from "next/link";

export default function Navbar() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            textDecoration: "none",
            color: "#0f172a",
            minWidth: "fit-content",
          }}
        >
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #0f2357 0%, #3aa39f 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "18px",
              fontWeight: 700,
              boxShadow: "0 8px 24px rgba(15, 35, 87, 0.18)",
              flexShrink: 0,
            }}
          >
            E
          </div>

          <div style={{ lineHeight: 1.05 }}>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-0.02em",
              }}
            >
              Eastrion
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#94a3b8",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginTop: "2px",
              }}
            >
              Global Supply Chain Infrastructure
            </div>
          </div>
        </Link>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            flexWrap: "wrap",
            justifyContent: "center",
            flex: 1,
            minWidth: "280px",
          }}
        >
          <Link href="/" style={navLinkStyle}>
            Home
          </Link>
          <Link href="/why-eastrion" style={navLinkStyle}>
          Why Eastrion
          </Link>
          <Link href="/solutions" style={navLinkStyle}>
            Services
          </Link>
          <Link href="/riskatlas" style={navLinkStyle}>
            RiskAtlas
          </Link>
          <Link href="/contact" style={navLinkStyle}>
            Contact
          </Link>
        </nav>

        <div style={{ minWidth: "fit-content" }}>
          <Link
            href="/riskatlas"
            style={{
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
              whiteSpace: "nowrap",
            }}
          >
            Start Risk Assessment
          </Link>
        </div>
      </div>
    </header>
  );
}

const navLinkStyle = {
  color: "#475569",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: 500,
  whiteSpace: "nowrap" as const,
};