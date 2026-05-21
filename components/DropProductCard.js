import Image from "next/image";
import Link from "next/link";

function PlaceholderArt({ variant }) {
  return (
    <div className={`drop-placeholder drop-placeholder-${variant}`}>
      <span className="drop-placeholder-core" />
      {variant === "slides" ? <span className="drop-placeholder-secondary" /> : null}
    </div>
  );
}

export function DropProductCard({
  type,
  name,
  price,
  image,
  href,
  state = "live",
  placeholderVariant = "hoodie",
}) {
  const isComingSoon = state === "coming-soon";
  const Wrapper = href && !isComingSoon ? Link : "div";
  const wrapperProps =
    Wrapper === Link
      ? { href, className: "drop-card-media-link" }
      : { className: "drop-card-media-link" };

  return (
    <article className={`drop-card ${isComingSoon ? "drop-card-soon" : ""}`}>
      <Wrapper {...wrapperProps}>
        <div className="drop-card-media">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={720}
              height={720}
              className="drop-card-image"
            />
          ) : (
            <PlaceholderArt variant={placeholderVariant} />
          )}
        </div>
      </Wrapper>
      <div className="drop-card-copy">
        <p className="drop-card-type">{type}</p>
        <h3>{name}</h3>
        <p className="drop-card-price">{price}</p>
        {href && !isComingSoon ? (
          <Link href={href} className="button-secondary drop-card-cta">
            View Product
          </Link>
        ) : null}
      </div>
    </article>
  );
}
