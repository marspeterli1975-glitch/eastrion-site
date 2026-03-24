import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        background: "linear-gradient(180deg, #0b1220 0%, #0f172a 100%)",
        color: "white",
        padding: "80px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "56px",
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: "24px",
          }}
        >
          Start with RiskAtlas,
          <br />
          then expand into real supply chain execution.
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#94a3b8",
            maxWidth: "720px",
            lineHeight: 1.7,
            marginBottom: "40px",
          }}
        >
          RiskAtlas is the entry layer of Eastrion’s supply chain intelligence
          model. Identify risk exposure across supplier, route and country
          before moving into execution.
        </p>

        {/* CTA 区（统一版） */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <Link href="/riskatlas" style={primaryBtn}>
            Run Free Risk Scan
          </Link>

          <Link href="/riskatlas/pricing" style={secondaryBtn}>
            View Pricing
          </Link>

          <Link href="/contact" style={ghostBtn}>
            Contact Eastrion
          </Link>
        </div>
      </div>
    </main>
  );
}

const primaryBtn = {
  padding: "14px 28px",
  borderRadius: "999px",
  background: "linear-gradient(135deg, #0f2357 0%, #3aa39f 100%)",
  color: "white",
  fontWeight: 700,
  textDecoration: "none",
};

const secondaryBtn = {
  padding: "14px 28px",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "white",
  fontWeight: 600,
  textDecoration: "none",
};

const ghostBtn = {
  padding: "14px 28px",
  borderRadius: "999px",
  color: "#94a3b8",
  textDecoration: "none",
};