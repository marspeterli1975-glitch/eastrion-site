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
    </div>
  );
}
