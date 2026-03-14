import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="brand">
          <Image
            src="/eastrion-logo.png"
            alt="Eastrion logo"
            width={40}
            height={40}
            className="brand-mark"
          />
          <div className="brand-copy">
            <div className="brand-title">Eastrion</div>
            <div className="brand-subtitle">
              Global Supply Chain Infrastructure
            </div>
          </div>
        </Link>

        <nav className="nav">
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/solutions">Solutions</Link>
            <Link href="/products">RiskAtlas</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <Link href="/products" className="cta-button">
            Try RiskAtlas
          </Link>
        </nav>
      </div>
    </header>
  );
}
