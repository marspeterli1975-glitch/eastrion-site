import Link from "next/link";
import SectionIntro from "../components/SectionIntro";
import RiskScanner from "../components/RiskScanner";

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
              Explore RiskAtlas
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
            <div className="side-label">Product layer</div>
            <h3>RiskAtlas</h3>
          </div>
        </div>
      </section>

      <SectionIntro
        eyebrow="Why Eastrion"
        title="A supply chain platform direction, not just a company profile."
        description="Eastrion is positioned as a supply chain infrastructure and risk intelligence business with a product pathway. The website is designed to communicate that evolution clearly."
      />

      <section className="three-col-grid">
        <div className="card">
          <div className="section-kicker">Infrastructure</div>
          <h3>Sourcing and coordination</h3>
          <p>
            Build more resilient execution flows across supplier selection,
            quality, logistics and delivery coordination.
          </p>
        </div>

        <div className="card">
          <div className="section-kicker">Capability</div>
          <h3>Industrial context</h3>
          <p>
            Support cross-border projects that require structured evaluation,
            operating discipline and commercial practicality.
          </p>
        </div>

        <div className="card">
          <div className="section-kicker">Intelligence</div>
          <h3>Structured risk visibility</h3>
          <p>
            Convert fragmented supply chain signals into clearer operating views
            that businesses can actually use.
          </p>
        </div>
      </section>

      <SectionIntro
        eyebrow="Platform Architecture"
        title="Execution first. Intelligence second. Product third."
        description="The Eastrion model starts from real supply chain execution, builds structured capability across sourcing and industrial coordination, and then extends into RiskAtlas as the product intelligence layer."
      />

      <section className="three-col-grid">
        <div className="card">
          <div className="section-kicker">01</div>
          <h3>Supply chain execution</h3>
          <p>
            Practical coordination across suppliers, lead time, logistics,
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
            A product direction designed to turn fragmented risk inputs into
            structured outputs for business use.
          </p>
        </div>
      </section>

      <SectionIntro
        eyebrow="What we solve"
        title="From fragmented execution to structured visibility."
        description="We help businesses reduce sourcing friction, improve operating discipline and communicate supply chain risk in a more structured way."
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

      <SectionIntro
        eyebrow="RiskAtlas Demo"
        title="A product entry point for future supply chain risk workflows."
        description="This demo block shows how RiskAtlas can evolve from a static product page into a usable supply chain risk scanning interface."
      />

    <section
  className="card"
  style={{
    marginTop: "24px",
    padding: "36px 32px",
  }}
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1.2fr 1fr",
      gap: "28px",
      alignItems: "start",
    }}
  >
    <div>
      <div className="section-kicker">Demo</div>
      <h3
        style={{
          margin: "0 0 14px",
          fontSize: "34px",
          lineHeight: 1.05,
          letterSpacing: "-0.04em",
        }}
      >
        Run a quick supply chain risk scan
      </h3>
      <p
        style={{
          margin: 0,
          color: "var(--muted)",
          lineHeight: 1.7,
          maxWidth: "700px",
        }}
      >
        Enter a supplier country and industry to simulate how RiskAtlas
        could structure exposure across geopolitical, logistics and
        operational dimensions.
      </p>
    </div>

    <RiskScanner />
  </div>
</section>

      <SectionIntro
        eyebrow="Why it matters"
        title="A website that already behaves like the first layer of a platform."
        description="The long-term value is not just in describing Eastrion. It is in building a front-end structure that can later connect to risk logic, data inputs and product workflows."
      />

      <section className="three-col-grid">
        <div className="card">
          <div className="section-kicker">Business value</div>
          <h3>Clearer communication</h3>
          <p>
            Turn fragmented supply chain signals into outputs that are easier to
            explain inside a real operating environment.
          </p>
        </div>

        <div className="card">
          <div className="section-kicker">Product value</div>
          <h3>Product-led evolution</h3>
          <p>
            Move from a company website toward a RiskAtlas interface that can
            support real scanning and reporting workflows.
          </p>
        </div>

        <div className="card">
          <div className="section-kicker">User value</div>
          <h3>Built for SMEs</h3>
          <p>
            Keep the model practical, explainable and commercially useful for
            cross-border small and mid-sized businesses.
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
            experience can be connected to your future risk API in the next
            phase.
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
