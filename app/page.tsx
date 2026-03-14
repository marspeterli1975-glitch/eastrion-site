import Link from "next/link";
import SectionIntro from "@/components/SectionIntro";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="panel hero-main">
            <div>
              <div className="eyebrow">Global Supply Chain Infrastructure</div>
              <h1>Global supply chain infrastructure for sourcing, industry and risk intelligence.</h1>
              <p className="hero-copy">
                Eastrion helps businesses improve supply chain performance through sourcing capability,
                industrial execution and structured risk intelligence. We position RiskAtlas as the flagship
                product module within a broader operating model built around resilience, clarity and execution.
              </p>
            </div>
            <div className="hero-actions">
              <Link href="/solutions" className="button-primary">
                Explore Solutions
              </Link>
              <Link href="/products" className="button-secondary">
                Discover RiskAtlas
              </Link>
            </div>
          </div>

          <div className="panel hero-side">
            <div className="mini-card">
              <div className="mini-label">Operating model</div>
              <h3 className="mini-title">Expert-led, partner-enabled, execution-focused.</h3>
              <p className="mini-text">
                We work through a flexible model supported by specialist partners across sourcing, quality and
                cross-border execution.
              </p>
            </div>
            <div className="mini-card">
              <div className="mini-label">Core lens</div>
              <p className="mini-text">Cost · Quality · Time · Risk</p>
            </div>
            <div className="mini-card">
              <div className="mini-label">Primary focus</div>
              <p className="mini-text">SME supply chain performance</p>
            </div>
            <div className="mini-card">
              <div className="mini-label">Product module</div>
              <p className="mini-text">RiskAtlas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro
            kicker="What we solve"
            title="The challenge is no longer cost alone. It is coordination, visibility and risk."
            text="Global supply chains now fail less often because of one isolated issue and more often because of fragmented decisions across sourcing, quality, logistics and external risk. Our positioning is to connect these dimensions into a clearer operating system for business execution."
          />

          <div className="card-grid">
            <div className="panel info-card">
              <h3>Fragmented sourcing decisions</h3>
              <p>
                Businesses often compare price well but compare supplier stability, execution capability and
                expansion risk poorly.
              </p>
              <ul>
                <li>Supplier filtration and shortlist design</li>
                <li>RFQ structure and capability review</li>
                <li>Pre-selection logic before execution scale-up</li>
              </ul>
            </div>
            <div className="panel info-card">
              <h3>Cross-border operating complexity</h3>
              <p>
                Procurement, production timing, packaging, logistics and after-sales coordination usually sit in
                disconnected silos.
              </p>
              <ul>
                <li>Execution visibility across handoffs</li>
                <li>Operational coordination for trade and projects</li>
                <li>Structured communication around delivery risk</li>
              </ul>
            </div>
            <div className="panel info-card">
              <h3>Weak risk communication</h3>
              <p>
                Risk is frequently discussed in qualitative terms only. That makes it difficult to explain,
                prioritise or operationalise.
              </p>
              <ul>
                <li>Structured risk framing</li>
                <li>Comparable scoring logic</li>
                <li>More usable reporting for management discussion</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro
            kicker="Solutions"
            title="Three connected solution pillars"
            text="We do not position the company as a narrow sourcing intermediary. We position Eastrion as a supply chain infrastructure business with three connected pillars: sourcing capability, industrial execution and risk intelligence."
          />

          <div className="card-grid">
            <div className="panel info-card">
              <h3>Global Sourcing</h3>
              <p>
                Supplier discovery, filtration, quotation comparison, capability review and entry path design for
                projects that require disciplined front-end selection.
              </p>
              <ul>
                <li>Supplier scouting</li>
                <li>Factory and capability assessment</li>
                <li>Cost and fit-for-purpose evaluation</li>
              </ul>
            </div>
            <div className="panel info-card">
              <h3>Supply Chain Operations</h3>
              <p>
                Execution support across product development, coordination, packaging, logistics and operational
                handoff where practical delivery matters more than brochure language.
              </p>
              <ul>
                <li>Operational coordination</li>
                <li>3PL and delivery planning support</li>
                <li>Cross-border project execution logic</li>
              </ul>
            </div>
            <div className="panel info-card">
              <h3>Risk Intelligence</h3>
              <p>
                Structured identification, framing and communication of supply chain risk across supplier,
                logistics, country and operating conditions.
              </p>
              <ul>
                <li>Risk visibility</li>
                <li>Scoring and reporting structure</li>
                <li>Pathway toward RiskAtlas workflows</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container highlight">
          <div className="panel highlight-main">
            <div className="kicker">Industry capability</div>
            <h2>Selected experience in industrial components, automotive aftermarket and hardware.</h2>
            <p className="section-text" style={{ marginTop: 14 }}>
              We deliberately present industry capability in a restrained way. The website should not depend on logo
              walls or aggressive claims. Instead, we describe the types of operational environments we understand and
              the kinds of supply chain problems we are built to address.
            </p>
            <div className="metric-grid">
              <div className="metric-card">
                <div className="metric-number">Industrial</div>
                <div className="metric-label">Components and project supply</div>
              </div>
              <div className="metric-card">
                <div className="metric-number">Automotive</div>
                <div className="metric-label">Aftermarket and parts execution</div>
              </div>
              <div className="metric-card">
                <div className="metric-number">Hardware</div>
                <div className="metric-label">Tools and practical trade categories</div>
              </div>
              <div className="metric-card">
                <div className="metric-number">Risk</div>
                <div className="metric-label">Operational exposure framing</div>
              </div>
            </div>
          </div>
          <div className="panel highlight-side">
            <div className="kicker">RiskAtlas</div>
            <h2>From supply chain execution to risk intelligence</h2>
            <p className="section-text" style={{ marginTop: 14 }}>
              RiskAtlas is not positioned as a detached software story. It is presented as the flagship product module
              emerging from execution experience in sourcing, operations and cross-border coordination.
            </p>
            <ul className="bullet-list" style={{ marginTop: 18 }}>
              <li>Supply chain risk framing</li>
              <li>Structured score logic</li>
              <li>Clearer management communication</li>
              <li>Pathway to future digital workflows</li>
            </ul>
            <div className="hero-actions" style={{ marginTop: 18 }}>
              <Link href="/products" className="button-primary">
                View Product
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container highlight">
          <div className="panel callout">
            <div>
              <div className="kicker">How we work</div>
              <h3>We prefer clear framing over inflated positioning.</h3>
              <p>
                Eastrion is presented as expert-led and partner-enabled. This keeps the brand credible, flexible and
                scalable without overstating organisational size or fixed global infrastructure.
              </p>
            </div>
          </div>
          <div className="panel callout">
            <div>
              <div className="kicker">Next step</div>
              <h3>Build better visibility before scaling execution.</h3>
              <p>
                The immediate purpose of the website is not only to look credible. It is to create a cleaner commercial
                path from advisory conversations to product interest and, eventually, to structured RiskAtlas usage.
              </p>
            </div>
            <div className="hero-actions">
              <Link href="/contact" className="button-secondary">
                Contact Eastrion
              </Link>
              <Link href="/products" className="button-primary">
                Try RiskAtlas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
