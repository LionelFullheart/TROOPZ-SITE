import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="footer-title">TROOPZ</p>
          <p className="footer-copy">
            A direct-to-customer jacket brand site built for fast editing,
            real brand presentation, and simple deployment.
          </p>
        </div>

        <div>
          <p className="footer-title">Policies</p>
          <div className="footer-links">
            <Link href="/policies/shipping">Shipping Policy</Link>
            <Link href="/policies/returns">Return Policy</Link>
            <Link href="/policies/privacy">Privacy Policy</Link>
            <Link href="/policies/terms">Terms</Link>
          </div>
        </div>

        <div>
          <p className="footer-title">Contact</p>
          <div className="footer-links">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>{site.phone}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
