import Link from "next/link";

export default function HomePage() {
  return (
    <main className="content-page">
      <section className="content-hero">
        <div className="content-shell">
          <p className="content-eyebrow">Eastrion — Global Supply Chain Infrastructure</p>
          <h1 className="content-title">
            Building resilient supply chains across sourcing, operations and risk.
          </h1>
          <p className="content-subtitle">
            Eastrion helps businesses improve sourcing efficiency, operational coordination
            and supply chain visibility through practical execution and structured risk intelligence.
          </p>

          <div className="content-actions">
            <Link href="/riskatlas" className="btn btn-primary">
              Open RiskAtlas
            </Link>
            <Link href="/solutions" className="btn btn-secondary">
              Explore Solutions
            </Link>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="content-shell">
          <div className="content-grid three">
            <div className="content-card">
              <span className="content-kicker">Flagship Product</span>
              <h3>RiskAtlas</h3>
              <p>
                A structured supply chain exposure scanner for country, industry,
                logistics and event-linked risk awareness.
              </p>
              <Link href="/riskatlas" className="text-link">
                Open RiskAtlas →
              </Link>
            </div>

            <div className="content-card">
              <span className="content-kicker">Execution Support</span>
              <h3>Solutions</h3>
              <p>
                Supply chain coordination, sourcing support and operational problem-solving
                for cross-border business.
              </p>
              <Link href="/solutions" className="text-link">
                View Solutions →
              </Link>
            </div>

            <div className="content-card">
              <span className="content-kicker">Positioning</span>
              <h3>What Eastrion does</h3>
              <p>
                We combine sourcing support, trade execution and structured risk scanning
                to help SMEs operate with better visibility and stronger discipline.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="content-shell">
          <div className="content-feature">
            <div>
              <span className="content-kicker">Core Focus</span>
              <h2>Practical supply chain support for global SMEs</h2>
              <p>
                Our operating approach is execution-first. We help clients improve sourcing
                reliability, reduce friction across cross-border coordination, and build a
                clearer understanding of where supply chain exposure is actually concentrated.
              </p>
            </div>

            <div className="content-bullets">
              <div className="bullet-card">
                <strong>Sourcing visibility</strong>
                <p>Clarify supplier screening, execution assumptions and sourcing risk concentration.</p>
              </div>
              <div className="bullet-card">
                <strong>Operational coordination</strong>
                <p>Support structured execution across logistics, documentation and shipment alignment.</p>
              </div>
              <div className="bullet-card">
                <strong>Risk communication</strong>
                <p>Turn fragmented external signals into a more structured risk view through RiskAtlas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
