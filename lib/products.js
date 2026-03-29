// Replace these mock items with real jackets when you're ready.
// Update image paths to files in /public/products.
export const products = [
  {
    slug: "troopz-utility-jacket",
    name: "TROOPZ Utility Jacket",
    price: 120,
    description:
      "A clean everyday shell with utility pockets, structured lines, and an easy streetwear fit.",
    details:
      "Designed as a lightweight go-to layer for daily wear, this piece keeps the TROOPZ mark front and center while leaving room for future production refinements.",
    image: "/products/utility-jacket.svg",
    availableSizes: ["S", "M", "L", "XL"],
    featured: true,
  },
  {
    slug: "troopz-field-jacket",
    name: "TROOPZ Field Jacket",
    price: 145,
    description:
      "A field-inspired jacket with durable styling, clean trims, and a confident, layered look.",
    details:
      "Built as a stronger outer layer in the collection, this jacket carries the military-streetwear tone that anchors the TROOPZ brand direction.",
    image: "/products/field-jacket.svg",
    availableSizes: ["M", "L", "XL", "XXL"],
    featured: true,
  },
  {
    slug: "troopz-signature-camo-jacket",
    name: "TROOPZ Signature Camo Jacket",
    price: 165,
    description:
      "A statement camo outerwear piece made to stand out in the first TROOPZ jacket lineup.",
    details:
      "This signature concept rounds out the initial offering and signals where the brand can expand with more drops, colors, and coordinated pieces.",
    image: "/products/signature-camo-jacket.svg",
    availableSizes: ["S", "M", "L"],
    featured: true,
  },
];

export function getProducts() {
  return products;
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}
