import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductPurchaseForm } from "@/components/ProductPurchaseForm";
import { getProductBySlug, getProducts } from "@/lib/products";

export function generateStaticParams() {
  return getProducts().map((product) => ({
    slug: product.slug,
  }));
}

export function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product Not Found | TROOPZ",
    };
  }

  return {
    title: `${product.name} | TROOPZ`,
    description: product.description,
  };
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="page-section">
      <div className="shell product-detail-grid">
        <div className="detail-image-card">
          <Image
            src={product.image}
            alt={product.name}
            width={960}
            height={960}
            className="detail-image"
            priority
          />
        </div>

        <div className="detail-copy">
          <p className="eyebrow">TROOPZ Product</p>
          <h1>{product.name}</h1>
          <p className="detail-price">${product.price}</p>
          <p className="lead">{product.description}</p>
          <p className="section-copy">{product.details}</p>
          <p className="coming-soon-note">
            More TROOPZ products are coming soon as the jacket line expands.
          </p>

          <ProductPurchaseForm product={product} />

          <Link href="/contact" className="text-link">
            Need help before ordering? Contact TROOPZ.
          </Link>
        </div>
      </div>
    </main>
  );
}
