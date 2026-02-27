export type Category =
  | "All"
  | "Electronics"
  | "Clothing"
  | "Home & Garden"
  | "Sports"
  | "Beauty";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in dollars
  category: Exclude<Category, "All">;
  emoji: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export const CATEGORIES: Category[] = [
  "All",
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Beauty",
];

export const PRODUCTS: Product[] = [
  {
    id: "elec-1",
    name: "Wireless Noise-Cancelling Headphones",
    description:
      "Premium over-ear headphones with active noise cancellation and 30-hour battery life. Perfect for deep focus or long journeys.",
    price: 89.99,
    category: "Electronics",
    emoji: "🎧",
    rating: 4.7,
    reviewCount: 2341,
    inStock: true,
  },
  {
    id: "elec-2",
    name: "Smart Watch Pro",
    description:
      "Track fitness, receive notifications, and pay contactlessly with this sleek smartwatch. Features GPS and heart-rate monitoring.",
    price: 199.99,
    category: "Electronics",
    emoji: "⌚",
    rating: 4.5,
    reviewCount: 1876,
    inStock: true,
  },
  {
    id: "elec-3",
    name: "Portable Bluetooth Speaker",
    description:
      "360° surround sound in a waterproof, compact design. Plays 12 hours on a single charge — take the party anywhere.",
    price: 49.99,
    category: "Electronics",
    emoji: "🔊",
    rating: 4.6,
    reviewCount: 3102,
    inStock: true,
  },
  {
    id: "cloth-1",
    name: "Premium Cotton T-Shirt",
    description:
      "Crafted from 100% GOTS-certified organic cotton. Relaxed fit with a buttery-soft drape that only gets better with washing.",
    price: 24.99,
    category: "Clothing",
    emoji: "👕",
    rating: 4.4,
    reviewCount: 892,
    inStock: true,
  },
  {
    id: "cloth-2",
    name: "Slim Fit Chinos",
    description:
      "Versatile stretch-cotton chinos that transition effortlessly from desk to dinner. Available in a range of tailored colors.",
    price: 59.99,
    category: "Clothing",
    emoji: "👖",
    rating: 4.3,
    reviewCount: 654,
    inStock: true,
  },
  {
    id: "cloth-3",
    name: "Lightweight Hoodie",
    description:
      "A midseason essential made from French terry fleece. Breathable, slightly cropped, and endlessly wearable.",
    price: 44.99,
    category: "Clothing",
    emoji: "🧥",
    rating: 4.8,
    reviewCount: 1204,
    inStock: true,
  },
  {
    id: "home-1",
    name: "Ceramic Plant Pot Set",
    description:
      "Set of 3 hand-glazed ceramic pots in graduated sizes. Matte finish in warm terracotta tones with drainage holes included.",
    price: 34.99,
    category: "Home & Garden",
    emoji: "🪴",
    rating: 4.9,
    reviewCount: 512,
    inStock: true,
  },
  {
    id: "home-2",
    name: "LED Desk Lamp",
    description:
      "Architect-style lamp with 5 color temperatures and stepless dimming. USB charging port keeps your devices topped up.",
    price: 39.99,
    category: "Home & Garden",
    emoji: "💡",
    rating: 4.5,
    reviewCount: 789,
    inStock: true,
  },
  {
    id: "sport-1",
    name: "Yoga Mat Premium",
    description:
      "6mm thick non-slip mat with alignment lines and a carrying strap. Made from natural tree rubber for superior grip.",
    price: 29.99,
    category: "Sports",
    emoji: "🧘",
    rating: 4.7,
    reviewCount: 1456,
    inStock: true,
  },
  {
    id: "sport-2",
    name: "Resistance Band Set",
    description:
      "Set of 5 latex-free bands in graduated resistance levels (10–50 lb). Includes door anchor and exercise guide.",
    price: 19.99,
    category: "Sports",
    emoji: "💪",
    rating: 4.4,
    reviewCount: 2087,
    inStock: true,
  },
  {
    id: "beauty-1",
    name: "Vitamin C Serum",
    description:
      "20% stabilised Vitamin C with hyaluronic acid and ferulic acid. Brightens, evens skin tone, and defends against free radicals.",
    price: 28.99,
    category: "Beauty",
    emoji: "✨",
    rating: 4.6,
    reviewCount: 3341,
    inStock: true,
  },
  {
    id: "beauty-2",
    name: "Hydrating Face Mask Set",
    description:
      "Pack of 10 sheet masks infused with ceramides, niacinamide, and aloe vera. Revive dull skin in just 15 minutes.",
    price: 22.99,
    category: "Beauty",
    emoji: "🧖",
    rating: 4.5,
    reviewCount: 1789,
    inStock: true,
  },
];
