import Link from "next/link";
import SectionIntro from "../components/SectionIntro";

export default function HomePage() {
  return (
    <div className="page-shell">
      <section className="hero-grid">
        <div className="hero-main card">
          <div className="eyebrow-pill">Global Supply Chain Infrastructure</div>

          <h1 className="hero-title">
            Building resilient supply chains across sourcing, operations and
            risk.
          </h1>

          <p className="hero-copy">
            Eastrion helps businesses improve sourcing efficiency, operational
            coordination and supply chain visibility through practical execution
            and structured risk intelligence.
          </p>

          <div className="hero-actions">
            <Link href="/solutions" className="btn btn-primary">
              Explore Solutions
            </Link>
            <Link href="/products" className="btn btn-secondary">
              Discover RiskAtlas
            </Link>
          </div>
        </div>

        <div className="hero-side card">
          <div className="side-block">
            <div className="side-label">Operating model</div>
            <h3>Expert-led, partner-enabled, execution-focused.</h3>
            <p>
              We work through a flexible model supported by specialist partners
              across sourcing, logistics, quality and cross-border execution.
            </p>
          </div>

          <div className="side-block">
            <div className="side-label">Core lens</div>
            <h3>Cost · Quality · Time · Risk</h3>
          </div>

          <div className="side-block">
            <div className="side-label">Primary focus</div>
            <h3>SME supply chain performance</h3>
          </div>

          <div className="side-block">
            <div className="side-label">Product module</div>
            <h3>RiskAtlas</h3>
          </div>
        </div>
      </section>

      <SectionIntro
        eyebrow="What we solve"
        title="From fragmented execution to structured visibility."
        description="We help businesses reduce sourcing friction, improve operating discipline and communicate supply chain risk in a more structured way."
      />

      <section className="three-col-grid">
        <div className="card">
          <div className="section-kicker">Supply Chain Infrastructure</div>
          <h3>Sourcing and coordination</h3>
          <p>
            Build more resilient supplier and execution flows across sourcing,
            quality, logistics and delivery.
          </p>
        </div>

        <div className="card">
          <div className="section-kicker">Industrial Capability</div>
          <h3>Execution with industrial context</h3>
          <p>
            Support projects that require more than trading activity, including
            structured supplier evaluation and cross-border coordination.
          </p>
        </div>

        <div className="card">
          <div className="section-kicker">Risk Intelligence</div>
          <h3>Visibility before escalation</h3>
          <p>
            Translate fragmented signals into clearer views of supplier,
            logistics and macro risk exposure.
          </p>
        </div>
      </section>

      <SectionIntro
        eyebrow="Our architecture"
        title="Execution first. Intelligence second. Product third."
        description="The Eastrion model starts from real-world supply chain execution, builds structured capability across sourcing and industry, and extends into risk intelligence through RiskAtlas."
      />

      <section className="three-col-grid">
        <div className="card">
          <div className="section-kicker">01</div>
          <h3>Supply chain execution</h3>
          <p>
            Practical coordination across suppliers, logistics, lead time,
            quality and delivery.
          </p>
        </div>

        <div className="card">
          <div className="section-kicker">02</div>
          <h3>Structured intelligence</h3>
          <p>
            A clearer operating view built from sourcing signals, execution
            friction and risk exposure.
          </p>
        </div>

        <div className="card">
          <div className="section-kicker">03</div>
          <h3>RiskAtlas product layer</h3>
          <p>
            A product module designed to turn fragmented risk inputs into more
            structured outputs for business use.
          </p>
        </div>
      </section>

      <SectionIntro
        eyebrow="RiskAtlas"
        title="A product module built on top of supply chain reality."
        description="RiskAtlas is positioned as the intelligence layer of the Eastrion model — not as a standalone abstraction, but as a structured extension of real supply chain execution."
      />

      <section className="three-col-grid">
        <div className="card">
          <div className="section-kicker">Use case</div>
          <h3>Supplier risk</h3>
          <p>
            Identify potential weaknesses across supplier structure, delivery
            discipline and operating reliability.
          </p>
        </div>

        <div className="card">
          <div className="section-kicker">Use case</div>
          <h3>Logistics and route risk</h3>
          <p>
            Build clearer visibility into transport disruption, corridor
            exposure and coordination pressure.
          </p>
        </div>

        <div className="card">
          <div className="section-kicker">Use case</div>
          <h3>Cross-border operating risk</h3>
          <p>
            Communicate macro, policy and execution-related risks in a more
            usable format for SMEs.
          </p>
        </div>
      </section>

      <section
        className="card"
        style={{
          marginTop: "32px",
          padding: "36px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div className="section-kicker">Next step</div>
          <h3
            style={{
              margin: "0 0 10px",
              fontSize: "32px",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            Explore the product direction behind RiskAtlas.
          </h3>
          <p
            style={{
              margin: 0,
              color: "var(--muted)",
              fontSize: "16px",
              lineHeight: 1.7,
              maxWidth: "760px",
            }}
          >
            Start with the product overview today. The interactive risk scan
            experience can be added in the next phase.
          </p>
        </div>

        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <Link href="/products" className="btn btn-primary">
            View RiskAtlas
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Contact Eastrion
          </Link>
        </div>
      </section>
    </div>
  );
}
