import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="container">
      <section className="page-hero">
        <div className="kicker">Products</div>
        <h1>RiskAtlas is our flagship product module.</h1>
        <p>
          Positioned within Eastrion&apos;s broader supply chain infrastructure model,
          RiskAtlas is designed to help clients move from informal judgement to more
          structured risk visibility.
        </p>
      </section>

      <section className="section-grid-2">
        <div className="card">
          <h3>RiskAtlas</h3>
          <p>
            Supply Chain Risk Intelligence Engine powered by a structured scoring and
            reporting logic. The current phase is focused on practical usability,
            report quality and beta validation.
          </p>
          <div className="hero-actions">
            <Link href="https://riskatlas.tech" className="button-primary">Visit RiskAtlas</Link>
            <Link href="/contact" className="button-secondary">Request Demo</Link>
          </div>
        </div>

        <div className="card">
          <h3>Product role in the business model</h3>
          <ul className="list">
            <li>Turns execution experience into a reusable intelligence layer</li>
            <li>Supports a future consulting + product model</li>
            <li>Creates a bridge from service capability to scalable tools</li>
          </ul>
        </div>
      </section>
    </div>
  );
}