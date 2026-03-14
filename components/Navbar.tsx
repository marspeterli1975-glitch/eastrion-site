import Link from "next/link";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand-wrap">
          <span className="brand">Eastrion</span>
          <span className="brand-sub">Global Supply Chain Infrastructure</span>
        </Link>

        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/solutions">Solutions</Link>
          <Link href="/products">Products</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/products" className="button-primary">Try RiskAtlas</Link>
        </nav>
      </div>
    </header>
  );
}