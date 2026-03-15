import Link from "next/link";
import SectionIntro from "../components/SectionIntro";
import RiskScanner from "../components/RiskScanner";

export default function HomePage() {
  return (
    <div className="page-shell">

      {/* HERO */}

      <section className="hero-grid">
        <div className="hero-main card">

          <div className="eyebrow-pill">
            Global Supply Chain Infrastructure
          </div>

          <h1 className="hero-title">
            Building resilient supply chains across sourcing, operations and risk.
          </h1>

          <p className="hero-copy">
            Eastrion helps businesses improve sourcing efficiency,
            operational coordination and supply chain visibility through
            practical execution and structured risk intelligence.
          </p>

          <div className="hero-actions">
           <Link href="/riskatlas">Run Risk Scan</Link>
              Explore Solutions
            </Link>

            <Link href="/products" className="btn btn-secondary">
              Explore RiskAtlas
            </Link>
          </div>
        </div>


        {/* HERO SIDE */}

        <div className="hero-side card">

          <div className="side-block">
            <div className="side-label">Operating model</div>

            <h3>Expert-led, partner-enabled, execution-focused.</h3>

            <p>
              We work through a flexible model supported by specialist
              partners across sourcing, logistics, quality and
              cross-border execution.
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



      {/* WHY EASTRION */}

      <SectionIntro
        eyebrow="Why Eastrion"
        title="A supply chain platform direction, not just a company profile."
        description="Eastrion is positioned as a supply chain infrastructure and risk intelligence business with a product pathway. The website is designed to communicate that evolution clearly."
      />



      {/* THREE BLOCKS */}

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
            Support cross-border projects that require structured
            evaluation, operating discipline and commercial practicality.
          </p>
        </div>


        <div className="card">
          <div className="section-kicker">Intelligence</div>
          <h3>Structured risk visibility</h3>
          <p>
            Convert fragmented supply chain signals into clearer operating
            views that businesses can actually use.
          </p>
        </div>

      </section>



      {/* ARCHITECTURE */}

      <SectionIntro
        eyebrow="Platform Architecture"
        title="Execution first. Intelligence second. Product third."
        description="The Eastrion model starts from real supply chain execution, builds structured capability across sourcing and industrial coordination, and then extends into RiskAtlas as the product intelligence layer."
      />



      {/* ARCHITECTURE BLOCKS */}

      <section className="three-col-grid">

        <div className="card">
          <div className="section-kicker">01</div>
          <h3>Supply chain execution</h3>
          <p>
            Practical coordination across suppliers, lead time,
            logistics, quality and delivery.
          </p>
        </div>


        <div className="card">
          <div className="section-kicker">02</div>
          <h3>Structured intelligence</h3>
          <p>
            A clearer operating view built from sourcing signals,
            execution friction and risk exposure.
          </p>
        </div>


        <div className="card">
          <div className="section-kicker">03</div>
          <h3>RiskAtlas product layer</h3>
          <p>
            A product direction designed to turn fragmented risk inputs
            into structured outputs for business use.
          </p>
        </div>

      </section>



      {/* DEMO INTRO */}

      <SectionIntro
        eyebrow="RiskAtlas Demo"
        title="Run a quick supply chain risk scan."
        description="Enter supplier country and industry to simulate how RiskAtlas can structure supply chain exposure."
      />



      {/* DEMO TOOL */}

      <section className="card" style={{ marginTop: "24px", padding: "36px" }}>
        <RiskScanner />
      </section>



      {/* CTA */}

      <section
        className="card"
        style={{
          marginTop: "32px",
          padding: "36px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap"
        }}
      >

        <div>
          <div className="section-kicker">Next step</div>

          <h3
            style={{
              margin: "0 0 10px",
              fontSize: "32px",
              lineHeight: 1.05
            }}
          >
            Explore the product direction behind RiskAtlas.
          </h3>

          <p style={{ color: "var(--muted)" }}>
            Start with the product overview today. The interactive risk
            scan experience can be connected to your future risk API.
          </p>
        </div>


        <div style={{ display: "flex", gap: "12px" }}>

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
