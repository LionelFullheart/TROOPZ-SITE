// Replace these mock items with real products when you're ready.
// Update image paths to files in /public/products.
export const products = [
  {
    slug: "napalm-slides",
    name: "TROOPZ Napalm Slides",
    price: 100,
    priceLabel: "$100",
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
    availableSizes: ["5", "6", "7", "8", "9", "10", "11", "12", "13"],
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
