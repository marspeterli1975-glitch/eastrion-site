import Link from "next/link";
import SectionIntro from "@/components/SectionIntro";

export default function HomePage() {
  return (
    <main>
      <section className="hero hero-enhanced">
        <div className="hero-aura hero-aura-left" />
        <div className="hero-aura hero-aura-right" />
        <div className="container hero-grid">
          <div className="panel hero-main hero-main-enhanced">
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

          <div className="panel hero-side hero-side-enhanced">
            <div className="mini-card mini-card-accent">
              <div className="mini-label">Operating model</div>
              <h3 className="mini-title">Expert-led, partner-enabled, execution-focused.</h3>
              <p className="mini-text">
                We work through a flexible model supported by specialist partners across sourcing, quality,
                logistics and cross-border execution.
              </p>
            </div>
            <div className="signal-card">
              <div className="signal-row">
                <span className="signal-dot signal-green" />
                <span>Supply chain infrastructure</span>
              </div>
              <div className="signal-row">
                <span className="signal-dot signal-blue" />
                <span>Industrial capability</span>
              </div>
              <div className="signal-row">
                <span className="signal-dot signal-dark" />
                <span>Risk intelligence</span>
              </div>
            </div>
            <div className="mini-card mini-card-dark">
              <div className="mini-label mini-label-dark">Product module</div>
              <p className="mini-title small">RiskAtlas</p>
              <p className="mini-text mini-text-dark">
                Structured score logic, clearer reporting and a stronger bridge between execution and risk.
              </p>
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
            <div className="panel info-card photo-card sourcing-photo">
              <div className="card-overlay">
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
            </div>
            <div className="panel info-card photo-card operations-photo">
              <div className="card-overlay">
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
            </div>
            <div className="panel info-card photo-card risk-photo">
              <div className="card-overlay">
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
        </div>
      </section>

      <section className="section">
        <div className="container architecture-shell">
          <SectionIntro
            kicker="Our architecture"
            title="A cleaner operating logic from execution to intelligence"
            text="We position Eastrion as a supply chain infrastructure business with a practical execution bias. Risk intelligence is not detached from operations. It is layered on top of execution experience and then productised through RiskAtlas."
          />
          <div className="architecture-grid">
            <div className="panel architecture-card">
              <span className="architecture-step">01</span>
              <h3>Supply Chain Infrastructure</h3>
              <p>Front-end sourcing, supplier selection, operational handoff and coordination design.</p>
            </div>
            <div className="architecture-arrow">→</div>
            <div className="panel architecture-card">
              <span className="architecture-step">02</span>
              <h3>Industrial Capability</h3>
              <p>Application understanding across industrial components, automotive aftermarket and tools.</p>
            </div>
            <div className="architecture-arrow">→</div>
            <div className="panel architecture-card architecture-accent">
              <span className="architecture-step">03</span>
              <h3>Risk Intelligence</h3>
              <p>Clearer framing of supplier, country, logistics and operating exposure.</p>
            </div>
            <div className="architecture-arrow">→</div>
            <div className="panel architecture-card architecture-dark">
              <span className="architecture-step">04</span>
              <h3>RiskAtlas</h3>
              <p>Structured product layer for score logic, reporting and future workflow expansion.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container highlight enhanced-highlight">
          <div className="panel highlight-main highlight-main-visual">
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
          <div className="panel highlight-side riskatlas-panel">
            <div className="kicker kicker-bright">RiskAtlas</div>
            <h2>From supply chain execution to risk intelligence</h2>
            <p className="section-text section-text-dark" style={{ marginTop: 14 }}>
              RiskAtlas is not positioned as a detached software story. It is the flagship product module emerging
              from execution experience in sourcing, operations and cross-border coordination.
            </p>
            <div className="riskatlas-mockup">
              <div className="mockup-line" />
              <div className="mockup-line short" />
              <div className="mockup-score">81</div>
              <div className="mockup-chip">Structured risk score</div>
            </div>
            <ul className="bullet-list bullet-list-bright" style={{ marginTop: 18 }}>
              <li>Supply chain risk framing</li>
              <li>Structured score logic</li>
              <li>Clearer management communication</li>
              <li>Pathway to future digital workflows</li>
            </ul>
            <div className="hero-actions" style={{ marginTop: 18 }}>
              <Link href="/products" className="button-primary button-green">
                View Product
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container highlight">
          <div className="panel callout callout-soft">
            <div>
              <div className="kicker">How we work</div>
              <h3>We prefer clear framing over inflated positioning.</h3>
              <p>
                Eastrion is presented as expert-led and partner-enabled. This keeps the brand credible, flexible and
                scalable without overstating organisational size or fixed global infrastructure.
              </p>
            </div>
          </div>
          <div className="panel callout callout-soft">
            <div>
              <div className="kicker">Next step</div>
              <h3>Build better visibility before scaling execution.</h3>
              <p>
                The immediate purpose of the website is not only to look credible. It is to create a cleaner commercial
                narrative and a better entry point into future products, especially RiskAtlas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
