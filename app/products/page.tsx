import Link from "next/link";
import SectionIntro from "../../components/SectionIntro";

export default function ProductsPage() {
  return (
    <div className="page-shell">

      <SectionIntro
        eyebrow="Product"
        title="RiskAtlas"
        description="RiskAtlas is the intelligence layer of the Eastrion model — designed to translate fragmented supply chain signals into structured risk visibility."
      />

      <section className="three-col-grid">

        <div className="card">
          <div className="section-kicker">Risk Layer</div>
          <h3>Supplier Risk</h3>
          <p>
            Evaluate supplier exposure across delivery discipline, structural
            reliability and supply concentration.
          </p>
        </div>

        <div className="card">
          <div className="section-kicker">Logistics Layer</div>
          <h3>Route Risk</h3>
          <p>
            Identify logistics vulnerabilities across corridors, ports and
            transport infrastructure.
          </p>
        </div>

        <div className="card">
          <div className="section-kicker">Macro Layer</div>
          <h3>Policy & Geopolitical Risk</h3>
          <p>
            Monitor policy changes, macro exposure and geopolitical pressure
            affecting supply chain stability.
          </p>
        </div>

      </section>

      <SectionIntro
        eyebrow="Risk Scan"
        title="Run a simulated supply chain risk scan."
        description="This demo illustrates how RiskAtlas converts real-world supply chain signals into a structured risk score."
      />

      <section
        className="card"
        style={{
          padding: "36px 32px",
          marginTop: "24px"
        }}
      >

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "24px"
          }}
        >

          <input
            placeholder="Supplier country"
            style={{
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid var(--line)",
              minWidth: "220px"
            }}
          />

          <input
            placeholder="Industry"
            style={{
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid var(--line)",
              minWidth: "220px"
            }}
          />

          <button className="btn btn-primary">
            Run Risk Scan
          </button>

        </div>

        <div
          style={{
            padding: "18px",
            background: "rgba(15,23,42,0.03)",
            borderRadius: "14px",
            fontSize: "15px",
            lineHeight: 1.7
          }}
        >
          <strong>Sample Output</strong>
          <br />
          Risk Score: <strong>B (Moderate Exposure)</strong>
          <br />
          Key signals: supplier concentration, corridor congestion,
          regulatory volatility.
        </div>

      </section>

      <section
        className="card"
        style={{
          marginTop: "32px",
          padding: "36px 32px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px"
        }}
      >

        <div>

          <div className="section-kicker">Next step</div>

          <h3
            style={{
              fontSize: "32px",
              margin: "0 0 10px"
            }}
          >
            Integrate RiskAtlas into your supply chain workflow.
          </h3>

          <p
            style={{
              color: "var(--muted)",
              maxWidth: "720px"
            }}
          >
            The next phase connects RiskAtlas with real supply chain data
            sources and automated risk signals.
          </p>

        </div>

        <div style={{display:"flex",gap:"12px"}}>

          <Link href="/" className="btn btn-secondary">
            Back to homepage
          </Link>

          <Link href="/contact" className="btn btn-primary">
            Contact Eastrion
          </Link>

        </div>

      </section>

    </div>
  );
}
