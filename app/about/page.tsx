import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="content-page">
      <section className="content-hero">
        <div className="content-shell">
          <p className="content-eyebrow">About Eastrion</p>
          <h1 className="content-title">
            From fragmented execution to structured supply chain visibility.
          </h1>
          <p className="content-subtitle">
            Eastrion is positioned as a global supply chain infrastructure and risk intelligence
            partner for SMEs that need stronger sourcing visibility, operational coordination,
            and clearer risk signals.
          </p>

          <div className="content-actions">
            <Link href="/solutions" className="btn btn-primary">
              Explore Solutions
            </Link>
            <Link href="/riskatlas" className="btn btn-secondary">
              Discover RiskAtlas
            </Link>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="content-shell">
          <div className="content-grid three">
            <div className="content-card">
              <span className="content-kicker">Operating Model</span>
              <h3>Expert-led, partner-enabled, execution-focused</h3>
              <p>
                We work through a flexible model supported by specialist partners across sourcing,
                logistics, quality and cross-border execution.
              </p>
            </div>

            <div className="content-card">
              <span className="content-kicker">Core Lens</span>
              <h3>Cost · Quality · Time · Risk</h3>
              <p>
                We do not treat supply chain support as a single quotation exercise. We frame it
                through execution quality, operational timing and concentrated exposure points.
              </p>
            </div>

            <div className="content-card">
              <span className="content-kicker">Primary Focus</span>
              <h3>SME supply chain performance</h3>
              <p>
                Our work is most relevant where smaller and mid-sized businesses need better structure
                across suppliers, corridors, execution and risk communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="content-shell">
          <div className="content-feature">
            <div>
              <span className="content-kicker">Product Module</span>
              <h2>RiskAtlas</h2>
              <p>
                RiskAtlas is the structured risk scanning layer inside Eastrion. It is designed to
                convert country, industry, logistics and event-linked signals into a more disciplined
                exposure view for early-stage evaluation.
              </p>
            </div>

            <div className="content-bullets">
              <div className="bullet-card">
                <strong>What it solves</strong>
                <p>It helps clients move from fragmented signals toward a more structured risk conversation.</p>
              </div>
              <div className="bullet-card">
                <strong>What it is not</strong>
                <p>It is not legal advice, investment advice, or a substitute for full due diligence.</p>
              </div>
              <div className="bullet-card">
                <strong>Why it matters</strong>
                <p>It gives SMEs a more credible way to frame exposure before deeper commercial commitments.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
