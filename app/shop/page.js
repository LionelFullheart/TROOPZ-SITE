import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/products";

export const metadata = {
  title: "Shop | TROOPZ",
  description: "Shop TROOPZ products.",
};

export default function ShopPage() {
  const products = getProducts();

  return (
    <main className="page-section">
      <div className="shell">
        <div className="page-header">
          <p className="eyebrow">Shop</p>
          <h1>TROOPZ Products</h1>
          <p className="lead">
            The first live product drop is here now, with more TROOPZ releases ready to
            follow as the store grows.
          </p>
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
