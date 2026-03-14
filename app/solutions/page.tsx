export default function SolutionsPage() {
  return (
    <div className="container">
      <section className="page-hero">
        <div className="kicker">Solutions</div>
        <h1>Structured solutions across sourcing, execution and risk.</h1>
        <p>
          Our solution architecture is designed for SMEs that need better supply
          chain outcomes without building large in-house infrastructure teams.
        </p>
      </section>

      <section className="section-grid-3">
        <div className="solution-card">
          <h3>Global Sourcing</h3>
          <p>
            Supplier identification, qualification support, comparative review and
            sourcing path design for specification-driven categories.
          </p>
        </div>
        <div className="solution-card">
          <h3>Supply Chain Operations</h3>
          <p>
            Cross-functional coordination across purchasing, logistics, fulfillment
            support and delivery follow-through.
          </p>
        </div>
        <div className="solution-card">
          <h3>Risk Intelligence</h3>
          <p>
            A more structured way to identify and communicate sourcing, execution and
            cross-border supply chain exposure.
          </p>
        </div>
      </section>

      <section className="section-grid-2 section">
        <div className="card">
          <h3>Selected focus areas</h3>
          <ul className="list">
            <li>Industrial components and bearing-related categories</li>
            <li>Automotive aftermarket programs</li>
            <li>Hardware and tools</li>
            <li>Cross-border execution support</li>
          </ul>
        </div>
        <div className="card">
          <h3>Typical engagement logic</h3>
          <ul className="list">
            <li>Clarify the business requirement</li>
            <li>Review the supply structure and execution constraints</li>
            <li>Design the operating path</li>
            <li>Support implementation and risk communication</li>
          </ul>
        </div>
      </section>
    </div>
  );
}