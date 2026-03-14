export default function ContactPage() {
  return (
    <div className="container">
      <section className="page-hero">
        <div className="kicker">Contact</div>
        <h1>Start the conversation from the business problem.</h1>
        <p>
          We are open to discussions around sourcing structure, execution support,
          risk intelligence and selected category opportunities.
        </p>
      </section>

      <section className="section-grid-2">
        <div className="card">
          <h3>Business enquiries</h3>
          <p>
            Shanghai Eastrion Information Science &amp; Technology Co., Ltd
          </p>
          <p>
            Email: peter.li@eastrion.com
          </p>
          <p>
            Shanghai, China
          </p>
        </div>
        <div className="card">
          <h3>Suggested discussion topics</h3>
          <ul className="list">
            <li>Supplier and sourcing structure</li>
            <li>Industrial components and bearings</li>
            <li>Operational coordination and logistics</li>
            <li>RiskAtlas beta and risk intelligence</li>
          </ul>
        </div>
      </section>
    </div>
  );
}