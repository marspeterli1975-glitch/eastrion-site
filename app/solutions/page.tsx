export default function SolutionsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="panel page-hero-card">
            <div className="eyebrow">Solutions</div>
            <h1 className="page-title">Solutions designed around execution, not presentation alone.</h1>
            <p className="page-subtitle">
              Our solutions architecture follows three connected pillars: global sourcing, supply chain operations and
              risk intelligence. The objective is to make supply chain decisions more coherent, practical and easier to
              communicate.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container card-grid">
          <div className="panel info-card">
            <h3>Global Sourcing</h3>
            <p>
              Structured supplier discovery and selection support for businesses that need better front-end sourcing
              decisions before committing time and capital.
            </p>
            <ul>
              <li>Supplier identification</li>
              <li>Filtration logic</li>
              <li>Capability comparison</li>
              <li>Commercial screening support</li>
            </ul>
          </div>
          <div className="panel info-card">
            <h3>Supply Chain Operations</h3>
            <p>
              Practical support across coordination, logistics planning, packaging handoff and execution structure for
              cross-border trade and industrial project flows.
            </p>
            <ul>
              <li>Execution coordination</li>
              <li>Project and delivery logic</li>
              <li>Operational problem framing</li>
              <li>Cross-border handoff visibility</li>
            </ul>
          </div>
          <div className="panel info-card">
            <h3>Risk Intelligence</h3>
            <p>
              Structured identification and communication of supplier, logistics and external exposure, with a pathway
              toward RiskAtlas-based workflows.
            </p>
            <ul>
              <li>Risk framing</li>
              <li>Scoring structure</li>
              <li>Reporting and communication</li>
              <li>Decision support preparation</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
