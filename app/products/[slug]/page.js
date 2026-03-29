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

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

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

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="page-section">
      <div className="shell product-detail-grid">
        <div className="detail-media">
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
          {product.gallery?.length ? (
            <div className="detail-gallery">
              {product.gallery.map((image, index) => (
                <div className="detail-gallery-card" key={image}>
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    width={400}
                    height={400}
                    className="detail-gallery-image"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="detail-copy">
          <p className="eyebrow">TROOPZ Product</p>
          <h1>{product.name}</h1>
          <p className="detail-price">
            {product.price != null ? `$${product.price}` : product.priceLabel}
          </p>
          <p className="lead">{product.description}</p>
          <p className="section-copy">{product.details}</p>
          <p className="coming-soon-note">
            Available now in men's sizes 5 through 13.
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
