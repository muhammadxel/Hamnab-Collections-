/**
 * HAMNAB COLLECTIONS - Official Product Catalog
 * Currency: Nigerian Naira (₦)
 * All sample items can be modified, removed, or expanded below.
 */

const PRODUCTS = [
  // --- ABAYAS ---
  {
    id: "ab-001",
    name: "Classic Emirati Black Abaya",
    category: "abayas",
    price: 38500,
    image: "abaya-1.jpeg", // <-- Updated here
    description: "Tailored with breathable Nida fabric, featuring subtle sleeve cuff detailing and a clean modest silhouette.",
    sizes: ["52", "54", "56", "58", "60"],
    colors: ["Jet Black", "Midnight Navy"],
    inStock: true,
    isCustomOrder: false,
    featured: true
  },
  {
    id: "ab-002",
    name: "Royal Gold Embroidered Bisht Abaya",
    category: "abayas",
    price: 49000,
    image: "abaya-2.jpg",
    description: "Premium ceremonial abaya finished with delicate gold zari embroidery along the front lapels.",
    sizes: ["54", "56", "58"],
    colors: ["Black & Gold", "Cream & Bronze"],
    inStock: true,
    isCustomOrder: true,
    featured: true
  },
  {
    id: "ab-003",
    name: "Royal Gold Embroidered Bisht Abaya",
    category: "abayas",
    price: 19000,
    image: "abaya-3.jpg",
    description: "Diamond Embellished Abaya.",
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
