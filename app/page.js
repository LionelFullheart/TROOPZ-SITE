import Link from "next/link";
import { FloatingProductStage } from "@/components/FloatingProductStage";
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
          <FloatingProductStage product={featuredStageProduct} />

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
