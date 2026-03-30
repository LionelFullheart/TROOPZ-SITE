import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";
import { site } from "@/lib/site";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <main>
      <section className="hero-section">
        <div className="shell hero-grid">
          <div>
            <p className="eyebrow">Official TROOPZ Website</p>
            <h1>{site.heroTitle}</h1>
            <p className="lead">{site.heroCopy}</p>
            <div className="button-row">
              <Link href="/shop" className="button">
                Shop Now
              </Link>
              <Link href="/about" className="button-secondary">
                Explore the Brand
              </Link>
            </div>
          </div>

          <div className="hero-panel">
            <p className="hero-panel-label">Active Drop</p>
            <h2>Napalm Slides, hoodie, and denim jacket available now.</h2>
            <p>
              TROOPZ is live with real product photography, direct contact options,
              and a growing product lineup customers can shop right now.
            </p>
            <div className="status-list">
              <span>Brand mark visible</span>
              <span>Products presented</span>
              <span>Contact and order intent live</span>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section collection-section">
        <div className="shell collection-showcase">
          <div className="napalm-banner">
            <div className="napalm-banner-copy">
              <p className="eyebrow">Napalm Collection</p>
              <h2>The Napalm Collection is here.</h2>
              <p className="section-copy">
                Slides, hoodie, and denim jacket built to stand out as one bold collection.
              </p>
            </div>
          </div>

          <div className="home-product-grid" aria-label="Napalm collection product carousel">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="shell activity-panel">
          <div>
            <p className="eyebrow">Brand In Motion</p>
            <h2>TROOPZ is active, product-led, and ready to grow.</h2>
          </div>
          <div className="activity-grid">
            <article>
              <strong>Focused assortment</strong>
              <p>Starting with real slides, a hoodie, and a jacket keeps the launch simple and believable.</p>
            </article>
            <article>
              <strong>Direct-to-customer flow</strong>
              <p>Customers can shop, inquire, and buy without extra platform overhead.</p>
            </article>
            <article>
              <strong>Deploy-ready structure</strong>
              <p>Built for GitHub and Vercel so the site can go live fast.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="shell cta-panel">
          <div>
            <p className="eyebrow">Order / Contact</p>
            <h2>Need sizing help, direct ordering, or a custom inquiry?</h2>
            <p>{site.orderNote}</p>
          </div>
          <Link href="/contact" className="button">
            Contact TROOPZ
          </Link>
        </div>
      </section>
    </main>
  );
}
