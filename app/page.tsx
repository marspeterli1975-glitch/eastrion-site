import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container">
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">Global Supply Chain Infrastructure</div>
            <h1>Building resilient supply chains across sourcing, operations and risk.</h1>
            <p>
              Eastrion helps businesses improve sourcing efficiency, operational
              coordination and supply chain visibility through practical execution
              and structured risk intelligence.
            </p>
            <div className="hero-actions">
              <Link href="/solutions" className="button-primary">Explore Solutions</Link>
              <Link href="/products" className="button-secondary">Discover RiskAtlas</Link>
            </div>
          </div>

          <div className="hero-panel">
            <div>
              <div className="kicker">Operating model</div>
              <h3>Expert-led, partner-enabled, execution-focused.</h3>
              <p>
                We work through a flexible model supported by specialist partners
                across sourcing, logistics, quality and cross-border execution.
              </p>
            </div>

            <div>
              <div className="metric">
                <div className="metric-label">Core lens</div>
                <div className="metric-value">Cost · Quality · Time · Risk</div>
              </div>
              <div className="metric">
                <div className="metric-label">Primary focus</div>
                <div className="metric-value">SME supply chain performance</div>
              </div>
              <div className="metric">
                <div className="metric-label">Product module</div>
                <div className="metric-value">RiskAtlas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-copy">
          <div className="kicker">What we solve</div>
          <h2>The challenge is no longer cost alone. It is coordination, visibility and risk.</h2>
          <p className="section-intro">
            Many growing businesses do not fail because they lack products. They
            struggle because supply decisions, supplier execution, logistics
            coordination and external risk are not managed as one integrated system.
          </p>
        </div>

        <div className="card-grid-3">
          <div className="card">
            <h3>Fragmented sourcing decisions</h3>
            <p>
              Supplier selection often happens without enough structure, comparability
              or follow-through.
            </p>
          </div>
          <div className="card">
            <h3>Inconsistent execution quality</h3>
            <p>
              Commercial plans weaken when product quality, lead times and delivery
              coordination drift apart.
            </p>
          </div>
          <div className="card">
            <h3>Limited risk visibility</h3>
            <p>
              Most SMEs still rely on informal judgement instead of structured
              supply chain risk communication.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-copy">
          <div className="kicker">Our solutions</div>
          <h2>Three integrated solution pillars.</h2>
        </div>

        <div className="section-grid-3">
          <div className="solution-card">
            <h3>Global Sourcing</h3>
            <p>
              Supplier scouting, qualification, RFQ coordination, comparative review
              and early-stage quality alignment.
            </p>
          </div>
          <div className="solution-card">
            <h3>Supply Chain Operations</h3>
            <p>
              Execution support across purchasing coordination, logistics alignment,
              fulfillment planning and operational follow-through.
            </p>
          </div>
          <div className="solution-card">
            <h3>Risk Intelligence</h3>
            <p>
              Structured identification, scoring and communication of supply chain
              exposure through a more disciplined decision framework.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-copy">
          <div className="kicker">Selected industry experience</div>
          <h2>Capability informed by real operating contexts.</h2>
        </div>

        <div className="section-grid-3">
          <div className="industry-card">
            <h3>Industrial Components</h3>
            <p>
              Including bearings, machinery-related components and selected industrial
              supply categories.
            </p>
          </div>
          <div className="industry-card">
            <h3>Automotive Aftermarket</h3>
            <p>
              Category development, supplier coordination and cross-border execution
              in selected aftermarket programs.
            </p>
          </div>
          <div className="industry-card">
            <h3>Hardware &amp; Tools</h3>
            <p>
              Sourcing and fulfillment support for practical, specification-driven
              product categories.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="info-block">
          <div className="kicker">From execution to intelligence</div>
          <h2>RiskAtlas turns operating patterns into structured risk visibility.</h2>
          <p>
            Years of supply chain execution generate recurring signals. RiskAtlas is
            designed to convert those signals into a more structured way to identify,
            score and communicate supply chain risk.
          </p>
          <div className="hero-actions">
            <Link href="/products" className="button-primary">View Product</Link>
            <Link href="/contact" className="button-secondary">Request Beta Access</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-copy">
          <div className="kicker">How we work</div>
          <h2>A disciplined operating model, not a generic sourcing pitch.</h2>
        </div>

        <div className="section-grid-2">
          <div className="card">
            <h3>1. Problem framing</h3>
            <p>
              We define the commercial problem before discussing vendors, products
              or routes.
            </p>
          </div>
          <div className="card">
            <h3>2. Assessment</h3>
            <p>
              We review supply structure, execution dependencies and operational risk
              exposure.
            </p>
          </div>
          <div className="card">
            <h3>3. Structured solution design</h3>
            <p>
              We align sourcing, operations and risk communication into one clearer
              decision path.
            </p>
          </div>
          <div className="card">
            <h3>4. Execution support</h3>
            <p>
              We support implementation with practical coordination rather than
              presentation-only advice.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-panel">
        <div>
          <div className="kicker">Next step</div>
          <h2>Build better visibility before you scale execution.</h2>
          <p>
            Start with the solution structure. Then move into risk intelligence.
          </p>
        </div>
        <div className="hero-actions">
          <Link href="/contact" className="button-primary">Talk to Us</Link>
          <Link href="/products" className="button-secondary">Try RiskAtlas</Link>
        </div>
      </section>
    </div>
  );
}