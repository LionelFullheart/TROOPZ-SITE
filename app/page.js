import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <main>
      <section className="content-section collection-section">
        <div className="shell collection-showcase">
          <div className="napalm-banner">
            <div className="napalm-banner-copy">
              <p className="eyebrow">Napalm Collection</p>
              <h2>The Napalm Collection is here.</h2>
              <p className="section-copy">
                Slides, hoodie, and denim jacket built to stand out as one bold collection.
              </p>
              <div className="button-row">
                <Link href="/shop" className="button">
                  Shop Collection
                </Link>
                <Link href="/contact" className="button-secondary">
                  Contact TROOPZ
                </Link>
              </div>
            </div>
          </div>

          <div className="collection-toolbar">
            <p className="collection-title">Featured products</p>
            <Link href="/shop" className="text-link">
              View all
            </Link>
          </div>

          <div className="home-product-grid" aria-label="Napalm collection product carousel">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                useViewer={product.slug === "napalm-slides" && product.viewer?.enabled}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
