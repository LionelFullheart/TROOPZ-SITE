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
  {
    slug: "la-capone-tee",
    name: "TROOPZ LA Capone Tee",
    price: 68,
    priceLabel: "$68 USD",
    category: "Tee",
    description:
      "A statement graphic tee from the LA Capone capsule, built to carry the collection's tribute energy.",
    details:
      "The LA Capone Tee is a premium graphic capsule piece available in black, red, and Kelly green. Built on a heavyweight oversized blank, it brings the tribute energy of the collection into the most accessible everyday format.",
    image: "/products/la-capone-tee-black-front.png",
    gallery: [
      "/products/la-capone-tee-black-front.png",
      "/products/la-capone-tee-black-back.png",
      "/products/la-capone-tee-green-front.png",
      "/products/la-capone-tee-red-front.png",
    ],
    availableSizes: ["Small", "Medium", "Large", "XL", "XXL"],
    featured: false,
    shopVisible: true,
  },
  {
    slug: "la-capone-hoodie",
    name: "TROOPZ LA Capone Hoodie",
    price: 160,
    priceLabel: "$160 USD",
    category: "Hoodie",
    description:
      "A heavyweight hooded sweatshirt from the LA Capone capsule with tribute graphics and multiple colorways.",
    details:
      "The LA Capone Hoodie is a heavyweight fleece statement piece offered in grey and black. With the oversized fit and large front portrait hit, it carries the capsule's tribute language into a daily wearable layer.",
    image: "/products/la-capone-hoodie-grey-front.png",
    gallery: [
      "/products/la-capone-hoodie-grey-front.png",
      "/products/la-capone-hoodie-grey-back.png",
      "/products/la-capone-hoodie-black-front.png",
      "/products/la-capone-hoodie-black-back.png",
    ],
    availableSizes: ["Small", "Medium", "Large", "XL", "XXL"],
    featured: false,
    shopVisible: true,
  },
  {
    slug: "la-capone-varsity",
    name: "TROOPZ LA Capone Varsity",
    price: 398,
    priceLabel: "$398 USD",
    category: "Varsity",
    description:
      "A capsule varsity jacket honoring LA Capone, previewed in multiple colorways ahead of the release.",
    details:
      "The LA Capone Varsity is the hero collectible of the capsule, offered in red and black body options with white sleeves. It leads the drop with collector-grade energy, embroidered tribute detailing, and a classic varsity fit.",
    image: "/products/la-capone-varsity-red-front.png",
    gallery: [
      "/products/la-capone-varsity-red-front.png",
      "/products/la-capone-varsity-red-back.png",
      "/products/la-capone-varsity-black-front.png",
      "/products/la-capone-varsity-black-back.png",
    ],
    availableSizes: ["Small", "Medium", "Large", "XL", "XXL"],
    featured: false,
    shopVisible: true,
  },
];

export function getProducts() {
  return products;
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getShopProducts() {
  return products.filter((product) => product.shopVisible !== false);
}

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}
