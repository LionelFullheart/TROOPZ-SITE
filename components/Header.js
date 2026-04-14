import Link from "next/link";
import Image from "next/image";
import { CartLink } from "@/components/CartLink";
import { SpecimenInfo } from "@/components/SpecimenInfo";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell nav-shell">
        <Link href="/" className="brand" aria-label="TROOPZ home">
          <Image
            src="/logo.png"
            alt="TROOPZ logo"
            width={88}
            height={88}
            className="brand-logo"
            priority
          />
          <div>
            <div className="brand-name">TROOPZ</div>
            <div className="brand-tag">Streetwear outerwear</div>
          </div>
        </Link>

        <div className="header-meta-nav">
          <SpecimenInfo />
          <nav className="site-nav">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <CartLink />
            <Link href="/about">Brand</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
