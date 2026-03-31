import Link from "next/link";
import { FloatingItemViewer } from "@/components/FloatingItemViewer";

export function FloatingProductStage({ product }) {
  return (
    <section className="floating-stage">
      <div className="floating-stage-scene">
        <div className="floating-stage-scene-glow" />
        <div className="floating-stage-label">Troopz Floating Product Stage</div>
        <FloatingItemViewer product={product} className="floating-stage-viewer" />
      </div>

      <div className="floating-stage-copy">
        <p className="eyebrow">Featured Object</p>
        <h2>{product.name}</h2>
        <p className="floating-stage-subtitle">
          {product.viewer?.subtitle || "Floating digital fashion item"}
        </p>
        <p className="detail-price">
          {product.price != null ? `$${product.price} USD` : product.priceLabel}
        </p>
        <p className="section-copy">{product.details}</p>

        <div className="item-meta-grid">
          <div>
            <span>Item Type</span>
            <strong>{product.viewer?.itemType || product.category}</strong>
          </div>
          <div>
            <span>Edition</span>
            <strong>{product.viewer?.edition || "Core"}</strong>
          </div>
          <div>
            <span>Drop</span>
            <strong>{product.viewer?.drop || "Current"}</strong>
          </div>
        </div>

        <div className="button-row">
          <Link href={`/products/${product.slug}`} className="button">
            View Item
          </Link>
          <Link href="/shop" className="button-secondary">
            Shop Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
