import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="content-shell">
        <div className="footer-grid">
          <div>
            <h3 className="footer-title">Eastrion</h3>
            <p className="footer-copy">
              Global supply chain infrastructure and structured risk intelligence for SMEs
              operating across sourcing, coordination and cross-border execution.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Navigation</h4>
            <div className="footer-links">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/solutions">Solutions</Link>
              <Link href="/riskatlas">RiskAtlas</Link>
              <Link href="/products">Business Scope</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Contact</h4>
            <p className="footer-copy">
              Shanghai Eastrion Information Science &amp; Technology Co., Ltd
              <br />
              Shanghai, China
              <br />
              peter.li@eastrion.com
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© Eastrion. All rights reserved.</span>
          <span>Flagship product: RiskAtlas</span>
        </div>
      </div>
    </footer>
  );
}
