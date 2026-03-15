import Link from "next/link";

export default function SolutionsPage() {
  return (
    <main className="content-page">
      <section className="content-hero">
        <div className="content-shell">
          <p className="content-eyebrow">Solutions</p>
          <h1 className="content-title">
            Structured supply chain support for global SMEs.
          </h1>
          <p className="content-subtitle">
            Eastrion supports sourcing, trade execution, coordination and structured risk visibility
            across cross-border operations.
          </p>

          <div className="content-actions">
            <Link href="/riskatlas" className="btn btn-primary">
              Run Risk Scan
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact Eastrion
            </Link>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="content-shell">
          <div className="content-grid three">
            <div className="content-card">
              <span className="content-kicker">Module 01</span>
              <h3>Risk Exposure Scanning</h3>
              <p>
                Initial country-industry-logistics-event exposure screening through the RiskAtlas framework.
              </p>
            </div>

            <div className="content-card">
              <span className="content-kicker">Module 02</span>
              <h3>Sourcing Support</h3>
              <p>
                Supplier discovery, qualification framing and structured execution support for global SME trade activity.
              </p>
            </div>

            <div className="content-card">
              <span className="content-kicker">Module 03</span>
              <h3>Operational Coordination</h3>
              <p>
                Practical support for cross-border shipment coordination, documentation awareness and execution alignment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="content-shell">
          <div className="content-feature">
            <div>
              <span className="content-kicker">How to use this</span>
              <h2>Start with visibility, then deepen the workflow.</h2>
              <p>
                A typical engagement can begin with a lightweight exposure scan, then move toward more
                detailed sourcing review, corridor discussion, execution planning or tailored assessment.
              </p>
            </div>

            <div className="content-bullets">
              <div className="bullet-card">
                <strong>Early stage</strong>
                <p>Use RiskAtlas to frame where the main exposure may be concentrated.</p>
              </div>
              <div className="bullet-card">
                <strong>Middle stage</strong>
                <p>Clarify supplier assumptions, route dependencies and execution friction points.</p>
              </div>
              <div className="bullet-card">
                <strong>Next step</strong>
                <p>Move into tailored discussion with Eastrion where corridor or supplier detail matters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
