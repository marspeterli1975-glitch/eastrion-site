export default function AboutPage() {
  return (
    <div className="container">
      <section className="page-hero">
        <div className="kicker">About</div>
        <h1>Supply chain infrastructure with a practical execution bias.</h1>
        <p>
          Eastrion is the operating brand of Shanghai Eastrion Information Science
          &amp; Technology Co., Ltd, focused on helping SMEs navigate global sourcing,
          operational coordination and supply chain risk.
        </p>
      </section>

      <section className="section-grid-2">
        <div className="card">
          <h3>Our positioning</h3>
          <p>
            We are not positioned as a generic trading intermediary. Our role is to
            help clients structure sourcing, improve execution discipline and build
            clearer visibility into supply chain performance and risk.
          </p>
        </div>
        <div className="card">
          <h3>Our approach</h3>
          <p>
            We operate through an expert-led model supported by specialist partners
            across sourcing, logistics, quality and cross-border execution.
          </p>
        </div>
      </section>

      <section className="section-grid-2 section">
        <div className="card">
          <h3>What matters to us</h3>
          <ul className="list">
            <li>Commercial practicality over theoretical complexity</li>
            <li>Clearer coordination across cost, quality and time</li>
            <li>More disciplined communication of supply chain risk</li>
          </ul>
        </div>
        <div className="card">
          <h3>How we are evolving</h3>
          <p>
            Our long-term direction is to combine supply chain execution capability
            with a stronger risk intelligence layer, including the development of
            RiskAtlas as a structured product module.
          </p>
        </div>
      </section>
    </div>
  );
}