// Replace these mock items with real products when you're ready.
// Update image paths to files in /public/products.
export const products = [
  {
    slug: "napalm-slides",
    name: "TROOPZ Napalm Slides",
    price: 100,
    priceLabel: "$100 USD",
    category: "Slides",
    description:
      "Bright orange TROOPZ slides with adjustable branded straps and a bold summer-ready look.",
    details:
      "The Napalm Slides are available now in men's sizes 5 through 13. This first footwear drop keeps the TROOPZ mark visible across the straps and gives customers a real product they can inquire about immediately.",
    image: "/products/napalm-slide-1.jpg",
    gallery: [
      "/products/napalm-slide-1.jpg",
      "/products/napalm-slide-2.jpg",
      "/products/napalm-slide-3.jpg",
      "/products/napalm-slide-4.jpg",
    ],
    viewer: {
      enabled: false,
      modelUrl: "",
      textureUrl: "/products/napalm-slide-1.jpg",
      accentColor: "#ff7a1a",
    },
    availableSizes: ["5", "6", "7", "8", "9", "10", "11", "12", "13"],
    featured: true,
  },
  {
    slug: "napalm-hooded-sweatshirt",
    name: "TROOPZ Napalm Hooded Sweatshirt",
    price: 120,
    priceLabel: "$120 USD",
    category: "Hoodie",
    description:
      "An all-cotton zip-up hoodie with full napalm print coverage and a loud statement look.",
    details:
      "The Napalm Hooded Sweatshirt brings the same aggressive flame pattern into apparel form with an all-cotton build, strong color presence, and everyday streetwear fit.",
    image: "/products/napalm-hoodie-1.jpeg",
    gallery: [
      "/products/napalm-hoodie-1.jpeg",
      "/products/napalm-hoodie-2.jpeg",
      "/products/napalm-hoodie-3.jpeg",
    ],
    availableSizes: ["Small", "Medium", "Large", "XL"],
    featured: true,
  },
  {
    slug: "napalm-denim-jacket",
    name: "TROOPZ Napalm Denim Jacket",
    price: 150,
    priceLabel: "$150 USD",
    category: "Jacket",
    description:
      "An all-cotton denim jacket covered in the Napalm flame pattern for a loud signature layer.",
    details:
      "The Napalm Denim Jacket extends the TROOPZ flame print into a bold outerwear piece with all-cotton construction, statement energy, and an easy layer-ready fit.",
    image: "/products/napalm-denim-jacket-1.jpeg",
    gallery: [
      "/products/napalm-denim-jacket-1.jpeg",
      "/products/napalm-denim-jacket-2.jpeg",
      "/products/napalm-denim-jacket-3.jpeg",
    ],
    availableSizes: ["Small", "Medium", "Large", "XL"],
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
