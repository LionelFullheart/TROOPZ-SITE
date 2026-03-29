import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/products";

export const metadata = {
  title: "Shop | TROOPZ",
  description: "Shop TROOPZ jackets.",
};

export default function ShopPage() {
  const products = getProducts();

  return (
    <main className="page-section">
      <div className="shell">
        <div className="page-header">
          <p className="eyebrow">Shop</p>
          <h1>TROOPZ Jackets</h1>
          <p className="lead">
            A simple first drop built around outerwear, ready for real imagery and
            production inventory later.
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
