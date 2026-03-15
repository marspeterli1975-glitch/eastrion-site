import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-eyebrow">Eastrion — Global Supply Chain Infrastructure</p>

          <h1 className="hero-title">
            Building resilient supply chains across sourcing, operations and risk.
          </h1>

          <p className="hero-copy">
            Eastrion helps businesses improve sourcing efficiency, operational
            coordination and supply chain visibility through practical execution
            and structured risk intelligence.
          </p>

          <div className="hero-actions">
            <Link href="/riskatlas" className="btn btn-primary">
              Run Risk Scan
            </Link>

            <Link href="/solutions" className="btn btn-secondary">
              Explore Solutions
            </Link>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-inner">
          <p className="section-label">What we do</p>
          <h2 className="section-title">Practical supply chain support for global SMEs</h2>
          <p className="section-copy">
            We combine sourcing support, trade execution and structured risk
            scanning to help companies operate with better visibility and stronger
            decision discipline.
          </p>

          <div className="card-grid">
            <div className="info-card">
              <h3>RiskAtlas</h3>
              <p>
                A structured supply chain exposure scanner for country, industry,
                logistics and event-linked risk awareness.
              </p>
              <Link href="/riskatlas" className="text-link">
                Open RiskAtlas →
              </Link>
            </div>

            <div className="info-card">
              <h3>Solutions</h3>
              <p>
                Supply chain coordination, sourcing support and operational
                problem-solving for cross-border business.
              </p>
              <Link href="/solutions" className="text-link">
                View Solutions →
              </Link>
            </div>

            <div className="info-card">
              <h3>Products</h3>
              <p>
                Explore selected industrial and supply-chain related product
                categories supported by Eastrion.
              </p>
              <Link href="/products" className="text-link">
                Browse Products →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
