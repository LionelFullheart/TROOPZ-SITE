import { ProductCard } from "@/components/ProductCard";
import { getShopProducts } from "@/lib/products";

export const metadata = {
  title: "Shop | TROOPZ",
  description: "Shop TROOPZ products.",
};

export default function ShopPage() {
  const products = getShopProducts();

  return (
    <main className="page-section">
      <div className="shell">
        <div className="page-header">
          <p className="eyebrow">Shop</p>
          <h1>Featured products</h1>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
