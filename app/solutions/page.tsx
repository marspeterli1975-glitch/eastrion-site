import Link from "next/link";

export default function SolutionsPage() {
  return (
    <main className="page-shell">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-eyebrow">Solutions</p>
          <h1 className="hero-title">Structured supply chain support for global SMEs</h1>
          <p className="hero-copy">
            Eastrion supports sourcing, trade execution, coordination and structured
            risk visibility across cross-border operations.
          </p>

          <div className="hero-actions">
            <Link href="/riskatlas" className="btn btn-primary">
              Run Risk Scan
            </Link>

            <Link href="/contact" className="btn btn-secondary">
              Contact Eastrion
            </Link>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-inner">
          <div className="card-grid">
            <div className="info-card">
              <h3>Risk Exposure Scanning</h3>
              <p>
                Initial country-industry-logistics-event exposure screening through
                the RiskAtlas framework.
              </p>
            </div>

            <div className="info-card">
              <h3>Sourcing Support</h3>
              <p>
                Supplier discovery, qualification framing and structured execution support
                for global SME trade activity.
              </p>
            </div>

            <div className="info-card">
              <h3>Operational Coordination</h3>
              <p>
                Practical support for cross-border shipment coordination, documentation
                awareness and execution alignment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
