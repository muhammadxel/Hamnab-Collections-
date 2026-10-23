/**
 * HAMNAB COLLECTIONS - Official Product Catalog
 * Currency: Nigerian Naira (₦)
 * All sample items can be modified, removed, or expanded below.
 */

const PRODUCTS = [
  // --- ABAYAS ---
  {
    id: "ab-001",
    name: "Cocoa Pleated Belted Abaya",
    category: "abayas",
    price: 38500,
    image: "abaya-1.jpeg", // <-- Updated here
    description: "Warm cocoa abaya with a pleated front, subtle beaded trim and a wrap belt that defines the waist.",
    sizes: ["52", "54", "56", "58", "60"],
    colors: ["Jet Black", "Midnight Navy"],
    inStock: true,
    isCustomOrder: false,
    featured: true
  },
  {
    id: "ab-002",
    name: "Noir Golden Garden Abaya",
    category: "abayas",
    price: 49000,
    image: "abaya-2.jpg",
    description: "Black open abaya with rich gold floral embroidery running down the front panels and sleeves.",
    sizes: ["54", "56", "58"],
    colors: ["Black & Gold", "Cream & Bronze"],
    inStock: true,
    isCustomOrder: true,
    featured: true
  },
  {
    id: "ab-003",
    name: "Onyx Diamond Sleeve Abaya",
    category: "abayas",
    price: 19000,
    image: "abaya-3.jpg",
    description: "Classic black zip-front abaya with sparkling diamond-shaped stone detail along the sleeves.",
    sizes: ["54", "56", "58"],
    colors: ["Black & Gold", "Cream & Bronze"],
    inStock: true,
    isCustomOrder: true,
    featured: true
  },
  {
    id: "ab-004",
    name: "Noir Caramel Ruffle Abaya",
    category: "abayas",
    price: 19000,
    image: "abaya-4.jpeg",
    description: "Classic black zip-front abaya with sparkling diamond-shaped stone detail along the sleeves.",
    sizes: ["54", "56", "58"],
    colors: ["Black & Gold", "Cream & Bronze"],
    inStock: true,
    isCustomOrder: true,
    featured: true
  },
  {
    id: "ab-005",
    name: "Olive Beaded Droplet Abaya",
    category: "abayas",
    price: 19000,
    image: "abaya-5.jpeg",
    description: "Olive-green V-neck abaya with delicate beaded droplet motifs and beaded sleeve and hem edges.",
    sizes: ["54", "56", "58"],
    colors: ["Black & Gold", "Cream & Bronze"],
    inStock: true,
    isCustomOrder: true,
    featured: true
  },
  {
    id: "ab-006",
    name: "Sage Satin Regal Abaya",
    category: "abayas",
    price: 19000,
    image: "abaya-6.jpeg",
    description: "Glossy sage satin abaya with a gold embroidered band and contrast green sleeves and neckline.",
    sizes: ["54", "56", "58"],
    colors: ["Black & Gold", "Cream & Bronze"],
    inStock: true,
    isCustomOrder: true,
    featured: true
  },
  {
    id: "ab-007",
    name: "Aqua Rose Panel Abaya",
    category: "abayas",
    price: 19000,
    image: "abaya-7.jpeg",
    description: "Bright aqua abaya with a bold red rose print panel on the centre and sleeves.",
    sizes: ["54", "56", "58"],
    colors: ["Black & Gold", "Cream & Bronze"],
    inStock: true,
    isCustomOrder: true,
    featured: true
  },
  {
    id: "ab-008",
    name: "Sunset Palm Kimono Abaya",
    category: "abayas",
    price: 19000,
    image: "abaya-8.jpeg",
    description: "Open kimono-style abaya in burnt orange and black with a striking palm tree print.",
    sizes: ["54", "56", "58"],
    colors: ["Black & Gold", "Cream & Bronze"],
    inStock: true,
    isCustomOrder: true,
    featured: true
  },
  {
    id: "ab-009",
    name: "Noir Orchid Lace Abaya",
    category: "abayas",
    price: 19000,
    image: "abaya-9.jpeg",
    description: "Black abaya with a tassel neckline and an orchid lace panel flowing into sheer lace sleeves.",
    sizes: ["54", "56", "58"],
    colors: ["Black & Gold", "Cream & Bronze"],
    inStock: true,
    isCustomOrder: true,
    featured: true
  },
  {
    id: "ab-010",
    name: "Saffron Starlight Embroidered Abaya",
    category: "abayas",
    price: 19000,
    image: "abaya-10.jpeg",
    description: "Golden-yellow V-neck abaya with fine tonal star and curved embroidery on the front.",
    sizes: ["54", "56", "58"],
    colors: ["Black & Gold", "Cream & Bronze"],
    inStock: true,
    isCustomOrder: true,
    featured: true
  },
  {
    id: "ab-011",
    name: "Ivory Noir Bloom Abaya",
    category: "abayas",
    price: 19000,
    image: "abaya-11.jpeg",
    description: "Cream abaya with a hand-beaded black floral design and bold black bands on the sleeves.",
    sizes: ["54", "56", "58"],
    colors: ["Black & Gold", "Cream & Bronze"],
    inStock: true,
    isCustomOrder: true,
    featured: true
  },
  {
    id: "ab-012",
    name: "Pearl Lace Garland Abaya",
    category: "abayas",
    price: 19000,
    image: "abaya-12.jpeg",
    description: "Crisp white abaya decorated with black lace floral appliqué along the hem and sleeves.",
    sizes: ["54", "56", "58"],
    colors: ["Black & Gold", "Cream & Bronze"],
    inStock: true,
    isCustomOrder: true,
    featured: true
  },
  {
    id: "ab-013",
    name: "Emerald Rose Panel Abaya",
    category: "abayas",
    price: 19000,
    image: "abaya-13.jpeg",
    description: "Deep emerald green abaya with a black and red rose print panel down the centre and sleeves.",
    sizes: ["54", "56", "58"],
    colors: ["Black & Gold", "Cream & Bronze"],
    inStock: true,
    isCustomOrder: true,
    featured: true
  },
  {
    id: "ab-014",
    name: "Noir Gilded Stripe Abaya",
    category: "abayas",
    price: 19000,
    image: "abaya-14.jpeg",
    description: "Black open abaya with textured gold-toned stripes, worn over a champagne satin inner.",
    sizes: ["54", "56", "58"],
    colors: ["Black & Gold", "Cream & Bronze"],
    inStock: true,
    isCustomOrder: true,
    featured: true
  },
  {
    id: "ab-015",
    name: "Noir Sand Panel Abaya",
    category: "abayas",
    price: 19000,
    image: "abaya-15.jpeg",
    description: "Black abaya with sand-beige side panels and sleeve stripes for a modern, balanced look.",
    sizes: ["54", "56", "58"],
    colors: ["Black & Gold", "Cream & Bronze"],
    inStock: true,
    isCustomOrder: true,
    featured: true
  },
  {
    id: "ab-016",
    name: "Cinnamon Gold Lace Abaya",
    category: "abayas",
    price: 19000,
    image: "abaya-16.jpeg",
    description: "Rich cinnamon-brown abaya with gold lace appliqué sweeping down one side and across the sleeves.",
    sizes: ["54", "56", "58"],
    colors: ["Black & Gold", "Cream & Bronze"],
    inStock: true,
    isCustomOrder: true,
    featured: true
  },
  {
    id: "ab-017",
    name: "Midnight Chiffon Open Abaya",
    category: "abayas",
    price: 19000,
    image: "abaya-17.jpeg",
    description: "Flowing navy chiffon open-front abaya with a soft draped panel and wide, relaxed sleeves.",
    sizes: ["54", "56", "58"],
    colors: ["Black & Gold", "Cream & Bronze"],
    inStock: true,
    isCustomOrder: true,
    featured: true
  },

  // --- HIJABS ---
  {
    id: "hj-001",
    name: "Luxury Premium Chiffon Hijab",
    category: "hijabs",
    price: 6500,
    image: "hijab-1.jpg",
    description: "Baby hijab Chiffon that drapes effortlessly for both casual and occasion wear.",
    sizes: ["Standard (180cm x 75cm)"],
    colors: ["Soft Nude", "Olive Green", "Dusty Rose", "Onyx Black"],
    inStock: true,
    isCustomOrder: false,
    featured: true
  },
  {
    id: "hj-002",
    name: "Ribbed Modal Everyday Jersey Hijab",
    category: "hijabs",
    price: 5500,
    image: "hijab-2.jpg",
    description: "Jersey fabric providing a secure, all-day comfort hijab.",
    sizes: ["Standard"],
    colors: ["Mocha", "Charcoal", "Sage", "Taupe"],
    inStock: true,
    isCustomOrder: false,
    featured: false
  },

  // --- JALAB / JALLAB ---
  {
    id: "jl-001",
    name: "Handcrafted Moroccan Cut Jalab",
    category: "jalab",
    price: 12000,
    image: "jalbab-1.jpg",
    description: "Simple fabric Jalbab.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Ivory White", "Sky Blue", "Maroon"],
    inStock: true,
    isCustomOrder: true,
    featured: true
  },

  // --- VEILS & CAPS ---
  {
    id: "vc-001",
    name: "Silk-Touch Shimmer Veil & Undercap Set",
    category: "veils-caps",
    price: 9500,
    image: "veil-1.jpeg",
    description: "Complete matching set consisting of an ultra-soft bamboo tie-back undercap and sheer organza veil.",
    sizes: ["Free Size"],
    colors: ["Champagne Gold", "Blush Pink", "Pure White"],
    inStock: true,
    isCustomOrder: false,
    featured: false
  },

  // --- SHOES ---
  {
    id: "sh-001",
    name: "Pointed Low-Block Mule Sandals",
    category: "shoes",
    price: 24000,
    image: "shoe-1.jpeg", // <-- Updated here
    description: "Comfort-cushioned faux leather mules with an elegant 2-inch block heel, ideal for prayer-friendly slip-on ease.",
    sizes: ["38", "39", "40", "41", "42"],
    colors: ["Tan Nude", "Ebony Black"],
    inStock: true,
    isCustomOrder: false,
    featured: true
  },
  {
    id: "sh-002",
    name: "Pointed Low-Block Mule Sandals",
    category: "shoes",
    price: 24000,
    image: "bag-1.jpeg", // <-- Updated here
    description: "Simple Handbag",
    sizes: ["38", "39", "40", "41", "42"],
    colors: ["Tan Nude", "Ebony Black"],
    inStock: true,
    isCustomOrder: false,
    featured: true
  },

  // --- JEWELLERY ---
  {
    id: "jw-001",
    name: "Gold-Plated Stainless Steel Ayatul Kursi Cuff",
    category: "jewellery",
    price: 14500,
    image: "jewellery-1.jpg",
    description: "Tarnish-free 18k gold-dipped calligraphy cuff bracelet. Waterproof and hypoallergenic.",
    sizes: ["Adjustable"],
    colors: ["18k Gold", "Rose Gold", "Silver"],
    inStock: true,
    isCustomOrder: false,
    featured: true
  },

  // --- PERFUMES ---
  {
    id: "pf-001",
    name: "Oud Royale Extrait de Parfum (50ml)",
    category: "perfumes",
    price: 26000,
    image: "perfume-1.jpeg",
    description: "A rich, long-lasting oriental fragrance featuring notes of Cambodian Oud, Amber resin, and Damascus Rose.",
    sizes: ["50ml Bottle"],
    colors: ["Original"],
    inStock: true,
    isCustomOrder: false,
    featured: true
  }
];
