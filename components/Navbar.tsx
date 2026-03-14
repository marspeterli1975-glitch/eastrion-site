import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/solutions", label: "Solutions" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="container nav-row">
        <Link href="/" className="brand-wrap" aria-label="Eastrion home">
          <span className="brand-name">Eastrion</span>
          <span className="brand-tag">Global Supply Chain Infrastructure</span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="/products" className="nav-cta">
            Try RiskAtlas
          </Link>
        </nav>
      </div>
    </header>
  );
}
