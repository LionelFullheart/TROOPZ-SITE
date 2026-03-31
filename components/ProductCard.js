import Image from "next/image";
import Link from "next/link";
import { ProductCardViewer } from "@/components/ProductCardViewer";

export function ProductCard({ product, useViewer = false }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link href={`/products/${product.slug}`} className="product-image-link" aria-label={product.name}>
          {useViewer ? (
            <ProductCardViewer product={product} />
          ) : (
            <Image
              src={product.image}
              alt={product.name}
              width={720}
              height={720}
              className="product-image"
            />
          )}
        </Link>
      </div>
      <div className="product-copy">
        <p className="product-label">TROOPZ {product.category || "Product"}</p>
        <h3>{product.name}</h3>
        <div className="product-meta">
          <span>{product.price != null ? `$${product.price} USD` : product.priceLabel}</span>
          <Link href={`/products/${product.slug}`} className="button-secondary product-link">
            View Product
          </Link>
        </div>
      </div>
    </article>
  );
}
