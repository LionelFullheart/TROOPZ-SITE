import Link from "next/link";
import { FloatingItemViewer } from "@/components/FloatingItemViewer";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const featuredStageProduct =
    featuredProducts.find((product) => product.viewer?.enabled) || featuredProducts[0];

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
                <Link href={`/products/${featuredStageProduct.slug}`} className="button">
                  View Item
                </Link>
                <Link href="/shop" className="button-secondary">
                  Shop Collection
                </Link>
              </div>
            </div>

            <div className="napalm-banner-object" aria-label="Floating featured product">
              <FloatingItemViewer product={featuredStageProduct} className="napalm-banner-viewer" />
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
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
