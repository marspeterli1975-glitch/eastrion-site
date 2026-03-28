export default function ContactPage() {
  return (
    <main className="content-page">
      <section className="content-hero">
        <div className="content-shell">
          <p className="content-eyebrow">Contact</p>
          <h1 className="content-title">
            Start the conversation with a clearer business problem.
          </h1>
          <p className="content-subtitle">
            Eastrion should be positioned as a commercial and strategic counterpart, not just a quotation
            inbox. The focus is use case fit, operating friction and the next step for engagement.
          </p>
          <p className="content-subtitle" style={{ marginTop: "12px", maxWidth: "980px" }}>
            In 2026, corridor volatility, freight spikes, supplier ambiguity and cross-border execution
            friction can usually be framed more clearly through a structured first discussion. The objective
            is not just to ask a question, but to define the next workable step.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="content-shell">
          <div className="content-grid two">
            <div className="content-card">
              <span className="content-kicker">Typical Discussion Themes</span>
              <ul className="content-list">
                <li>
                  <strong>Supplier sourcing and filtration</strong>
                  <br />
                  Used when supplier quality, credibility or execution fit is still unclear.
                </li>
                <li>
                  <strong>Industrial component and project support</strong>
                  <br />
                  Relevant where technical coordination or project-driven procurement needs more structure.
                </li>
                <li>
                  <strong>Cross-border operational coordination</strong>
                  <br />
                  Best for cases involving routing, documentation, shipment execution or delivery friction.
                </li>
                <li>
                  <strong>Supply chain risk visibility and RiskAtlas</strong>
                  <br />
                  Suitable for early-stage corridor, route, supplier or execution exposure screening.
                </li>
              </ul>
            </div>

            <div className="content-card">
              <span className="content-kicker">Contact Structure</span>
              <ul className="content-list">
                <li>Email: peter.li@eastrion.com</li>
                <li>Company: Shanghai Eastrion Information Science &amp; Technology Co., Ltd</li>
                <li>Location: Shanghai, China</li>
                <li>Flagship product: RiskAtlas</li>
                <li>Expected response: within 24 hours for a first review of your business context</li>
                <li>Best starting input: a short summary of your current supplier, route or execution issue</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="content-shell">
          <div className="content-feature">
            <div>
              <span className="content-kicker">Positioning</span>
              <h2>Eastrion</h2>
              <p>
                Eastrion is the operating brand of Shanghai Eastrion Information Science &amp; Technology Co., Ltd.
                We position the business as a global supply chain infrastructure and risk intelligence partner
                for companies that require stronger sourcing visibility, operational coordination and clearer risk signals.
              </p>
              <p style={{ marginTop: "14px" }}>
                The strongest fit is where a business issue still feels fragmented — supplier uncertainty,
                corridor dependency, execution ambiguity or shipment-level risk — and needs to be translated
                into a clearer commercial next step.
              </p>
            </div>

            <div className="content-bullets">
              <div className="bullet-card">
                <strong>Commercial dialogue</strong>
                <p>
                  Use the first contact to frame a real business problem, not just request a quotation.
                </p>
              </div>
              <div className="bullet-card">
                <strong>Best fit</strong>
                <p>
                  Best fit for cases involving sourcing ambiguity, route dependency, supplier validation or execution-sensitive shipments.
                </p>
              </div>
              <div className="bullet-card">
                <strong>Next step</strong>
                <p>
                  Start with a short email describing your current business context. We can then determine whether RiskAtlas,
                  direct discussion or deeper support is the right next move.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}