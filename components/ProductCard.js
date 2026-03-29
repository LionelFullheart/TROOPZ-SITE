import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Image
          src={product.image}
          alt={product.name}
          width={720}
          height={720}
          className="product-image"
        />
      </div>
      <div className="product-copy">
        <p className="product-label">TROOPZ {product.category || "Product"}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-meta">
          <span>{product.price != null ? `$${product.price} USD` : product.priceLabel}</span>
          <Link href={`/products/${product.slug}`} className="button button-green">
            View Product
          </Link>
        </div>
      </div>
    </article>
  );
}
