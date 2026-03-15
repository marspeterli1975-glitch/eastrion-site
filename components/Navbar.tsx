import Link from "next/link";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link href="/" className="brand-wrap">
          <div className="brand-mark">⛓</div>
          <div>
            <div className="brand-title">Eastrion</div>
            <div className="brand-subtitle">GLOBAL SUPPLY CHAIN INFRASTRUCTURE</div>
          </div>
        </Link>

        <nav className="main-nav">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/solutions">Solutions</Link>
          <Link href="/riskatlas">RiskAtlas</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="nav-cta">
          <Link href="/riskatlas" className="btn btn-primary">
            Try RiskAtlas
          </Link>
        </div>
      </div>
    </header>
  );
}
