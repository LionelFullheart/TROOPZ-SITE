import { ProductZoomImage } from "@/components/ProductZoomImage";
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
          <ProductZoomImage src={product.image} alt={product.name} priority />
          {product.gallery?.length ? (
            <div className="detail-gallery">
              {product.gallery.map((image, index) => (
                <ProductZoomImage
                  key={image}
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  thumbnail
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="detail-copy">
          <p className="eyebrow">Featured Product</p>
          <h1>{product.name}</h1>
          <p className="detail-price">
            {product.price != null ? `$${product.price} USD` : product.priceLabel}
          </p>
          <p className="lead">{product.description}</p>
          <p className="section-copy">{product.details}</p>
          <p className="coming-soon-note">
            Available sizes: {product.availableSizes.join(", ")}.
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
