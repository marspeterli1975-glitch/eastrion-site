import Link from "next/link";

export default function ProductsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="panel page-hero-card">
            <div className="eyebrow">Products</div>
            <h1 className="page-title">RiskAtlas is the flagship product module within the Eastrion model.</h1>
            <p className="page-subtitle">
              We do not position RiskAtlas as an isolated software story. We position it as a risk intelligence engine
              emerging from practical supply chain execution and structured around clearer commercial communication.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container highlight">
          <div className="panel highlight-main">
            <div className="kicker">RiskAtlas</div>
            <h2>Supply chain risk intelligence for more structured visibility.</h2>
            <p className="section-text" style={{ marginTop: 14 }}>
              RiskAtlas is designed to help businesses frame and communicate supply chain exposure across supplier,
              logistics, country and external operating risk. The long-term direction is to translate qualitative risk
              judgement into a clearer scoring and reporting system.
            </p>
            <ul className="bullet-list" style={{ marginTop: 18 }}>
              <li>Risk identification</li>
              <li>Structured scoring model</li>
              <li>Comparable output logic</li>
              <li>Report-ready communication</li>
            </ul>
          </div>
          <div className="panel highlight-side">
            <div className="kicker">Current role</div>
            <h2>Flagship module, not the whole company narrative.</h2>
            <p className="section-text" style={{ marginTop: 14 }}>
              Strategically, Eastrion should lead with supply chain infrastructure and let RiskAtlas operate as the
              flagship product. That sequencing improves trust, preserves flexibility and supports future monetisation.
            </p>
            <div className="hero-actions" style={{ marginTop: 18 }}>
              <Link href="https://riskatlas.tech" className="button-primary">
                Visit RiskAtlas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
