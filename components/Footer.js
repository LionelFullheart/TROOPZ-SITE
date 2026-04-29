import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand-block">
          <Link href="/" className="brand footer-brand" aria-label="TROOPZ home">
            <Image
              src="/logo-white.png"
              alt="TROOPZ logo"
              width={88}
              height={88}
              className="brand-logo footer-logo"
            />
            <div>
              <div className="brand-name">TROOPZ</div>
              <div className="brand-tag">Streetwear outerwear</div>
            </div>
          </Link>
          <p className="footer-copy">© 2026 TROOPZ. All rights reserved.</p>
        </div>

        <div>
          <p className="footer-title">Shop</p>
          <div className="footer-links">
            <Link href="/shop">All Products</Link>
            <Link href="/shop">Hoodies</Link>
            <Link href="/shop">Jackets</Link>
            <Link href="/shop">Slides</Link>
          </div>
        </div>

        <div>
          <p className="footer-title">Company</p>
          <div className="footer-links">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/policies/returns">Returns</Link>
            <Link href="/policies/shipping">Shipping</Link>
          </div>
        </div>

        <div>
          <p className="footer-title">Legal</p>
          <div className="footer-links">
            <Link href="/policies/terms">Terms &amp; Conditions</Link>
            <Link href="/policies/privacy">Privacy Policy</Link>
            <Link href="/policies/shipping">Shipping Policy</Link>
            <Link href="/policies/returns">Refund Policy</Link>
          </div>
        </div>

        <div className="footer-social-block">
          <p className="footer-title">Stay Connected</p>
          <div className="footer-socials" aria-label="TROOPZ social links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              IG
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
              X
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
              TT
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              YT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
