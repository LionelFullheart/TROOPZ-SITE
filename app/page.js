import { CollectionBanner } from "@/components/CollectionBanner";
import { DropProductCard } from "@/components/DropProductCard";
import { getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const napalmProducts = featuredProducts.map((product) => ({
    type: `TROOPZ ${product.category}`,
    name: product.name.replace("TROOPZ ", ""),
    price: product.price != null ? `$${product.price} USD` : product.priceLabel,
    image: product.image,
    href: `/products/${product.slug}`,
  }));

  const collections = [
    {
      key: "capone",
      theme: "capone",
      dropLabel: "Drop 02",
      title: "LA Capone",
      releaseLabel: "Released:",
      releaseValue: "June 4, 2026",
      description:
        "A tribute. The LA Capone Collection honors legacy and impact with pieces that speak louder than words.",
      materials: "Premium Cotton / Heavyweight Fleece",
      products: [
        {
          type: "TROOPZ Tee",
          name: "LA Capone Tee",
          price: "Coming Soon",
          image: "/products/la-capone-tee-front.png",
          href: "/products/la-capone-tee",
        },
        {
          type: "TROOPZ Hoodie",
          name: "LA Capone Hoodie",
          price: "Coming Soon",
          image: "/products/la-capone-hoodie-front.png",
          href: "/products/la-capone-hoodie",
        },
        {
          type: "TROOPZ Varsity",
          name: "LA Capone Varsity",
          price: "Coming Soon",
          image: "/products/la-capone-varsity-front.png",
          href: "/products/la-capone-varsity",
        },
      ],
    },
    {
      key: "napalm",
      theme: "napalm",
      dropLabel: "Drop 01",
      title: "Napalm",
      releaseLabel: "Released:",
      releaseValue: "April 29, 2026",
      description:
        "The Napalm Collection is a full set built with intention. Each piece features our signature flame print and is designed to stand out as one unified drop.",
      materials: "400 GSM Cotton / Premium Denim",
      products: napalmProducts,
    },
  ];

  return (
    <main>
      <section className="content-section drop-homepage">
        <div className="shell drop-homepage-shell">
          {collections.map((collection) => (
            <section className="drop-collection-block" key={collection.key}>
              <CollectionBanner
                dropLabel={collection.dropLabel}
                title={collection.title}
                releaseLabel={collection.releaseLabel}
                releaseValue={collection.releaseValue}
                description={collection.description}
                materials={collection.materials}
                theme={collection.theme}
                ctaLabel={collection.ctaLabel}
                ctaHref={collection.ctaHref}
              />
              {collection.products.length ? (
                <div className="drop-product-grid" aria-label={`${collection.title} products`}>
                  {collection.products.map((product) => (
                    <DropProductCard
                      key={`${collection.key}-${product.name}`}
                      type={product.type}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      href={product.href}
                      state={product.state}
                      placeholderVariant={product.placeholderVariant}
                    />
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
