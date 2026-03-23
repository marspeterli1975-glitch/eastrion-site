import Link from "next/link";

export default function ProductsPage() {
  return (
    <main className="content-page">
      <section className="content-hero">
        <div className="content-shell">
          <p className="content-eyebrow">Business Scope</p>
          <h1 className="content-title">
            Products, project support and supply chain execution scope.
          </h1>
          <p className="content-subtitle">
            This page is not a catalog-only page. It should explain the types of products,
            projects and business support areas Eastrion can cover across sourcing and execution.
          </p>

          <div className="content-actions">
            <Link href="/contact" className="btn btn-primary">
              Discuss a Requirement
            </Link>
            <Link href="/riskatlas" className="btn btn-secondary">
              Try RiskAtlas
            </Link>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="content-shell">
          <div className="content-grid three">
            <div className="content-card">
              <span className="content-kicker">Industrial Components</span>
              <h3>Project-linked sourcing</h3>
              <p>
                Support for industrial components, engineering-related procurement and supplier-side
                coordination where execution discipline matters.
              </p>
            </div>

            <div className="content-card">
              <span className="content-kicker">Filtration & Materials</span>
              <h3>Specialized product support</h3>
              <p>
                Selected filtration-related, process-related and industrial material categories
                that require structured supplier communication and technical alignment.
              </p>
            </div>

            <div className="content-card">
              <span className="content-kicker">Cross-border Execution</span>
              <h3>From quotation to movement</h3>
              <p>
                Not only product matching, but also coordination around documentation, supplier follow-up,
                shipment execution and risk visibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="content-shell">
          <div className="content-feature">
            <div>
              <span className="content-kicker">How to read this page</span>
              <h2>Business range, not a static catalog.</h2>
              <p>
                The purpose of this section is to show clients the practical range of business support
                Eastrion can cover, especially where sourcing, execution and risk communication overlap.
              </p>
            </div>

            <div className="content-bullets">
              <div className="bullet-card">
                <strong>Products</strong>
                <p>Component and material categories that require practical commercial follow-through.</p>
              </div>
              <div className="bullet-card">
                <strong>Projects</strong>
                <p>Situations where the supply side must align with timing, technical detail and execution expectations.</p>
              </div>
              <div className="bullet-card">
                <strong>Support layer</strong>
                <p>RiskAtlas can serve as the structured front-end scan before deeper supplier or corridor work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
