import Link from "next/link";

export function CollectionBanner({
  dropLabel,
  title,
  releaseLabel,
  releaseValue,
  description,
  materials,
  theme = "napalm",
  ctaLabel = "View Collection",
  ctaHref = "/shop",
}) {
  return (
    <section className={`collection-banner collection-banner-${theme}`}>
      <div className="collection-banner-inner">
        <div className="collection-banner-left">
          <p className="collection-drop-label">{dropLabel}</p>
          <h2 className="collection-banner-title">{title}</h2>
          <p className="collection-banner-subtitle">Collection</p>
          <p className="collection-banner-release-mobile">{releaseValue}</p>
        </div>

        <div className="collection-banner-right">
          <p className="collection-banner-description">{description}</p>
          <div className="collection-banner-meta">
            <div>
              <span>Materials:</span>
              <strong>{materials}</strong>
            </div>
            <div>
              <span>{releaseLabel}</span>
              <strong>{releaseValue}</strong>
            </div>
          </div>
          <Link href={ctaHref} className="button-secondary collection-banner-cta">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
