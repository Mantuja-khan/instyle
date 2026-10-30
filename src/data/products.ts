import hero from "@/assets/hero.jpg";
import collectionCityMinimalist from "@/assets/collection-city-minimalist.jpg";
import collectionWeekendEscape from "@/assets/collection-weekend-escape.jpg";
import collectionPowerEdit from "@/assets/collection-power-edit.jpg";
import collectionSunsetHues from "@/assets/collection-sunset-hues.jpg";
import arrivalLinenShirt from "@/assets/arrival-linen-shirt.jpg";
import arrivalWideLegPants from "@/assets/arrival-wide-leg-pants.jpg";
import arrivalSatinSlipDress from "@/assets/arrival-satin-slip-dress.jpg";
import arrivalRibbedKnitTop from "@/assets/arrival-ribbed-knit-top.jpg";
import trendOversizedBlazer from "@/assets/trend-oversized-blazer.jpg";
import trendPleatedSkirt from "@/assets/trend-pleated-skirt.jpg";

import heelMain from "@/assets/heel-main.jpg";
import heelSide from "@/assets/heel-side.jpg";
import heelBack from "@/assets/heel-back.jpg";
import heelWorn from "@/assets/heel-worn.jpg";
import heelDetail from "@/assets/heel-detail.jpg";

import champagneOrganzaSharara from "@/assets/champagne-organza-sharara.png";
import shararaSide from "@/assets/sharara-side.jpg";
import shararaBack from "@/assets/sharara-back.jpg";
import shararaDetail from "@/assets/sharara-detail.jpg";
import shararaModel from "@/assets/sharara-model.jpg";

import floralBohoTunicDress from "@/assets/floral-boho-tunic-dress.png";
import tunicSide from "@/assets/tunic-side.jpg";
import tunicBack from "@/assets/tunic-back.jpg";
import tunicDetail from "@/assets/tunic-detail.jpg";
import tunicModel from "@/assets/tunic-model.jpg";

import indigoEmbroideredVyshyvanka from "@/assets/indigo-embroidered-vyshyvanka.png";
import vyshyvankaSide from "@/assets/vyshyvanka-side.jpg";
import vyshyvankaBack from "@/assets/vyshyvanka-back.jpg";
import vyshyvankaDetail from "@/assets/vyshyvanka-detail.jpg";
import vyshyvankaModel from "@/assets/vyshyvanka-model.jpg";

import crossoverRibbedKnitDress from "@/assets/crossover-ribbed-knit-dress.png";
import crossoverDetail from "@/assets/crossover-ribbed-knit-dress-detail.jpg";
import crossoverFabric from "@/assets/crossover-ribbed-knit-dress-fabric.jpg";
import crossoverHem from "@/assets/crossover-ribbed-knit-dress-hem.jpg";
import crossoverAngle from "@/assets/crossover-ribbed-knit-dress-angle.jpg";

import ruchedChiffonSleeveDress from "@/assets/ruched-chiffon-sleeve-dress.png";
import ruchedDetail from "@/assets/ruched-chiffon-sleeve-dress-detail.jpg";
import ruchedFabric from "@/assets/ruched-chiffon-sleeve-dress-fabric.jpg";
import ruchedHem from "@/assets/ruched-chiffon-sleeve-dress-hem.jpg";
import ruchedAngle from "@/assets/ruched-chiffon-sleeve-dress-angle.jpg";

import linenDetail from "@/assets/arrival-linen-shirt-detail.jpg";
import linenFabric from "@/assets/arrival-linen-shirt-fabric.jpg";
import linenHem from "@/assets/arrival-linen-shirt-hem.jpg";
import linenAngle from "@/assets/arrival-linen-shirt-angle.jpg";

import pantsDetail from "@/assets/arrival-wide-leg-pants-detail.jpg";
import pantsFabric from "@/assets/arrival-wide-leg-pants-fabric.jpg";
import pantsHem from "@/assets/arrival-wide-leg-pants-hem.jpg";
import pantsAngle from "@/assets/arrival-wide-leg-pants-angle.jpg";

import satinDetail from "@/assets/arrival-satin-slip-dress-detail.jpg";
import satinFabric from "@/assets/arrival-satin-slip-dress-fabric.jpg";
import satinHem from "@/assets/arrival-satin-slip-dress-hem.jpg";
import satinAngle from "@/assets/arrival-satin-slip-dress-angle.jpg";

import topDetail from "@/assets/arrival-ribbed-knit-top-detail.jpg";
import topFabric from "@/assets/arrival-ribbed-knit-top-fabric.jpg";
import topHem from "@/assets/arrival-ribbed-knit-top-hem.jpg";
import topAngle from "@/assets/arrival-ribbed-knit-top-angle.jpg";

import blazerDetail from "@/assets/trend-oversized-blazer-detail.jpg";
import blazerFabric from "@/assets/trend-oversized-blazer-fabric.jpg";
import blazerHem from "@/assets/trend-oversized-blazer-hem.jpg";
import blazerAngle from "@/assets/trend-oversized-blazer-angle.jpg";

import skirtDetail from "@/assets/trend-pleated-skirt-detail.jpg";
import skirtFabric from "@/assets/trend-pleated-skirt-fabric.jpg";
import skirtHem from "@/assets/trend-pleated-skirt-hem.jpg";
import skirtAngle from "@/assets/trend-pleated-skirt-angle.jpg";

export const heroImage = hero;

export const collections = [
  {
    name: "City Minimalist",
    tagline: "Clean. Modern. Timeless.",
    image: collectionCityMinimalist,
  },
  {
    name: "Weekend Escape",
    tagline: "Relaxed pieces for effortless days.",
    image: collectionWeekendEscape,
  },
  {
    name: "Power Edit",
    tagline: "Tailored looks that empower.",
    image: collectionPowerEdit,
  },
  {
    name: "Sunset Hues",
    tagline: "Warm tones for golden hours.",
    image: collectionSunsetHues,
  },
];

export type ProductColor = {
  name: string;
  hex: string;
  inStock?: boolean;
};

export type ProductReview = {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  rating?: number;
  reviewsCount?: number;
  description?: string;
  colors?: ProductColor[];
  sizes?: string[];
  sku?: string;
  tags: string[];
  specifications?: Record<string, string>;
  reviews?: ProductReview[];
};

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

export const elegantHighHeels: Product = {
  id: "elegant-high-heels",
  name: "Elegant High Heels",
  price: 6999,
  originalPrice: 9999,
  image: heelMain,
  images: [heelMain, heelSide, heelBack, heelWorn, heelDetail],
  category: "Shoes",
  rating: 4.8,
  reviewsCount: 245,
  description:
    "Sculpted to perfection with an elongated pointed toe and statuesque stiletto silhouette. Crafted in Italy from mirror-sheen patent calfskin, finished with cushioned memory arch support for effortless elegance that commands every room.",
  colors: [
    { name: "Nude", hex: "#D8B89C", inStock: true },
    { name: "Black", hex: "#111111", inStock: true },
    { name: "Crimson", hex: "#A51D24", inStock: true },
    { name: "Navy", hex: "#1B263B", inStock: true },
  ],
  sizes: ["5", "6", "7", "8", "9", "10"],
  sku: "SHOE-ELEGANT-NUDE",
  tags: ["Women", "Shoes", "Heels", "Fashion", "office"],
  specifications: {
    Material: "100% Genuine Italian Patent Calfskin",
    "Heel Height": "95mm / 3.75 inches",
    Sole: "Smooth Natural Leather with Non-Slip Rubber Grip Island",
    Insole: "Contoured High-Density Memory Foam with Kidskin Lining",
    Origin: "Handcrafted in Florence, Italy",
    Care: "Wipe gently with a soft dry cloth; avoid direct contact with alcohol or oils",
  },
  reviews: [
    {
      id: "rev-1",
      author: "Priya Sharma",
      rating: 5,
      date: "October 18, 2026",
      title: "Absolute perfection — so comfortable for stilettos!",
      comment:
        "Wore these for an evening gala and received compliments all night. The nude shade matches beautifully with both western gowns and ethnic silks. The cushioned insole makes a huge difference.",
      verified: true,
    },
    {
      id: "rev-2",
      author: "Ananya Mehta",
      rating: 5,
      date: "October 12, 2026",
      title: "Extremely chic and flattering silhouette",
      comment:
        "The Italian leather finish is immaculate. True to size (I wear a 7 US / 38 EU). The heel height gives the most statuesque posture without straining the balls of your feet.",
      verified: true,
    },
    {
      id: "rev-3",
      author: "Rhea Kapoor",
      rating: 4,
      date: "September 29, 2026",
      title: "Stunning craftsmanship and packaging",
      comment:
        "High quality patent finish with a lovely subtle sheen. It arrived in a bespoke dust bag and rigid luxury box. Fits snug at first but breaks in quickly.",
      verified: true,
    },
  ],
};

export const champagneOrganzaShararaProduct: Product = {
  id: "champagne-organza-sharara",
  name: "Champagne Organza Peplum Sharara Set",
  price: 8499,
  originalPrice: 11999,
  image: champagneOrganzaSharara,
  images: [champagneOrganzaSharara, shararaSide, shararaBack, shararaDetail, shararaModel],
  category: "Ethnic & Fusion",
  rating: 4.9,
  reviewsCount: 186,
  description:
    "A breathtaking flared silhouette cut from luminous tissue organza. Features a multi-tiered gathered peplum kurti, expansive pleated sharara trousers, and a fluid sheer dupatta bordered with delicate scallop embroidery.",
  colors: [
    { name: "Champagne Blush", hex: "#E6D2B5", inStock: true },
    { name: "Rose Quartz", hex: "#E8C5C8", inStock: true },
    { name: "Sage Mist", hex: "#B4C2A8", inStock: true },
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  sku: "ETH-SHARARA-CHAMP",
  tags: ["date-night", "wedding", "festive", "neutral", "Dresses", "Ethnic"],
  specifications: {
    Material: "Pure Tissue Silk-Organza with Butter Crepe Lining",
    "Set Includes": "Peplum Kurti, Flared Sharara Pants & Scalloped Dupatta",
    Neckline: "Sculpted V-Neckline with Fine Piping",
    Workmanship: "Hand-finished Scallop Zari Floral Border",
    Origin: "Handcrafted in Lucknow, India",
    Care: "Dry clean only; store folded inside breathable muslin cloth",
  },
  reviews: [
    {
      id: "rev-sharara-1",
      author: "Kavita Singhal",
      rating: 5,
      date: "October 20, 2026",
      title: "Dreamy flare and ethereal movement!",
      comment:
        "The organza tissue catches the light like pure gold dust. The flare on the sharara is royal and regal, yet incredibly lightweight to dance in all evening.",
      verified: true,
    },
  ],
};

export const floralBohoTunicDressProduct: Product = {
  id: "floral-boho-tunic-dress",
  name: "Botanical Embroidered Boho Tunic Dress",
  price: 3699,
  originalPrice: 4899,
  image: floralBohoTunicDress,
  images: [floralBohoTunicDress, tunicSide, tunicBack, tunicDetail, tunicModel],
  category: "Dresses",
  rating: 4.8,
  reviewsCount: 142,
  description:
    "Airy natural unbleached linen-cotton blend tunic dress detailed with blooming peony cross-stitch embroidery along the voluminous peasant sleeves and scalloped hem. Finished with playful contrast tassels at the split neckline.",
  colors: [
    { name: "Natural Ecru", hex: "#E7DEC8", inStock: true },
    { name: "Warm Terracotta", hex: "#C76B4E", inStock: true },
    { name: "Olive Tint", hex: "#89966A", inStock: true },
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  sku: "DRS-BOHO-TUNIC-NAT",
  tags: ["weekend", "travel", "neutral", "Dresses"],
  specifications: {
    Material: "70% Organic Flax Linen, 30% Combed Cotton",
    Embroidery: "Multicolor Silk-Thread Floral Cross-Stitch",
    Sleeves: "Three-Quarter Balloon Sleeves with Hand-Knotted Tassels",
    Silhouette: "Relaxed A-Line Tunic with Drop Shoulders",
    Origin: "Handcrafted in Jaipur, India",
    Care: "Gentle machine wash cold or dry clean for best longevity",
  },
  reviews: [
    {
      id: "rev-tunic-1",
      author: "Sneha Nair",
      rating: 5,
      date: "October 15, 2026",
      title: "The prettiest day dress for resort holidays!",
      comment:
        "Breathable, lightweight, and the pink floral embroidery pops so vibrantly against the natural oat linen. Highly recommend!",
      verified: true,
    },
  ],
};

export const indigoEmbroideredVyshyvankaProduct: Product = {
  id: "indigo-embroidered-vyshyvanka",
  name: "Indigo Embroidered Linen Vyshyvanka Dress",
  price: 5499,
  originalPrice: 7499,
  image: indigoEmbroideredVyshyvanka,
  images: [indigoEmbroideredVyshyvanka, vyshyvankaSide, vyshyvankaBack, vyshyvankaDetail, vyshyvankaModel],
  category: "Dresses",
  rating: 4.9,
  reviewsCount: 210,
  description:
    "An artisanal heirloom statement cut from pure white European flax linen. Showcases rich cobalt and midnight indigo geometric heritage needlework across grand bishop sleeves, framed with plush fringe trim and braided tasseled tie belts.",
  colors: [
    { name: "Cobalt Blue", hex: "#254E70", inStock: true },
    { name: "Monochrome Noir", hex: "#111111", inStock: true },
    { name: "Emerald Pine", hex: "#2A4D3B", inStock: true },
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  sku: "DRS-VYSHY-INDIGO",
  tags: ["date-night", "travel", "weekend", "Dresses"],
  specifications: {
    Material: "100% Pre-Washed European Flax Linen",
    "Sleeve Type": "Dramatic Sculpted Bishop Sleeves with Smocked Cuffs",
    Closure: "Split Keyhole Neckline with Hand-Braided Ombré Tassels",
    Belt: "Matching Detachable Embroidered Tie Sash",
    Origin: "Artisanal Atelier Heritage Collection",
    Care: "Dry clean recommended to preserve artisanal threadwork",
  },
  reviews: [
    {
      id: "rev-vyshy-1",
      author: "Aditi Rao",
      rating: 5,
      date: "October 19, 2026",
      title: "Looks like haute couture straight off a runway!",
      comment:
        "The density of the blue embroidery is unbelievable. The drape of the linen is thick yet so fluid. A real head-turner.",
      verified: true,
    },
  ],
};

export const crossoverRibbedKnitDressProduct: Product = {
  id: "crossover-ribbed-knit-dress",
  name: "Ribbed Crossover Knit Sweater Dress",
  price: 3999,
  originalPrice: 5299,
  image: crossoverRibbedKnitDress,
  images: [crossoverRibbedKnitDress, crossoverDetail, crossoverFabric, crossoverHem, crossoverAngle],
  category: "Dresses",
  rating: 4.7,
  reviewsCount: 119,
  description:
    "Sculpted architectural knitwear at its finest. Spun from ultra-soft fine-ribbed yarn with a surplice wrap-front crossover bodice, suspended camisole straps, and elegant blouson balloon sleeves that taper into elongated ribbed cuffs.",
  colors: [
    { name: "Mocha Taupe", hex: "#9E8B83", inStock: true },
    { name: "Heather Cream", hex: "#E8E3D9", inStock: true },
    { name: "Midnight Onyx", hex: "#1A1A1A", inStock: true },
  ],
  sizes: ["XS", "S", "M", "L"],
  sku: "DRS-WRAP-KNIT-TAUPE",
  tags: ["office", "neutral", "weekend", "date-night", "Dresses"],
  specifications: {
    Material: "55% Viscose, 28% Polyester, 17% Polyamide Ultra-Soft Knit",
    Fit: "Contoured Bodycon Skirt with Draped Wrap Bodice",
    Neckline: "Surplice Wrap with Delicate Camisole Straps",
    Origin: "Imported Luxury Knitwear",
    Care: "Hand wash cold, reshape and dry flat; do not hang",
  },
  reviews: [
    {
      id: "rev-knit-1",
      author: "Tara Sen",
      rating: 5,
      date: "October 14, 2026",
      title: "Flattering, cozy, and effortlessly sexy",
      comment:
        "The cold-shoulder crossover detail looks very sophisticated. The knit is thick enough that it smooths everything out without feeling heavy.",
      verified: true,
    },
  ],
};

export const ruchedChiffonSleeveDressProduct: Product = {
  id: "ruched-chiffon-sleeve-dress",
  name: "Ivory Ruched Chiffon Sleeve Mini Dress",
  price: 4299,
  originalPrice: 5999,
  image: ruchedChiffonSleeveDress,
  images: [ruchedChiffonSleeveDress, ruchedDetail, ruchedFabric, ruchedHem, ruchedAngle],
  category: "Dresses",
  rating: 4.8,
  reviewsCount: 167,
  description:
    "Architectural ruched bodycon mini dress designed with a modern square neckline and dramatic floating semi-sheer chiffon bishop sleeves. Expertly horizontal ruched for an hourglass contour that transitions seamlessly to dinner & cocktail soirees.",
  colors: [
    { name: "Ivory Pearl", hex: "#F7F6F2", inStock: true },
    { name: "Champagne Blush", hex: "#EADDC8", inStock: true },
    { name: "Classic Noir", hex: "#111111", inStock: true },
  ],
  sizes: ["XS", "S", "M", "L"],
  sku: "DRS-RUCHED-IVORY",
  tags: ["date-night", "party", "neutral", "Dresses"],
  specifications: {
    Material: "Structured Ribbed Crepe Body with Airy Chiffon Sleeves",
    Neckline: "Wide Architectural Square Neckline",
    "Sleeve Style": "Gathered Billowing Balloon Sleeves with Elasticated Wrists",
    Silhouette: "Bodycon Mini with Figure-Contouring Horizontal Ruching",
    Origin: "Designed in Paris, Hand-Finished",
    Care: "Dry clean only to maintain ruched structure",
  },
  reviews: [
    {
      id: "rev-ruched-1",
      author: "Zoya Malik",
      rating: 5,
      date: "October 22, 2026",
      title: "Insanely flattering fit!",
      comment:
        "The sleeves are pure poetry in motion! The ruching forgives everything while creating an enviable waistline. Received endless compliments.",
      verified: true,
    },
  ],
};

export const newArrivals: Product[] = [
  champagneOrganzaShararaProduct,
  indigoEmbroideredVyshyvankaProduct,
  floralBohoTunicDressProduct,
  ruchedChiffonSleeveDressProduct,
  crossoverRibbedKnitDressProduct,
  {
    id: "linen-shirt",
    name: "Linen Relaxed Shirt",
    price: 2999,
    originalPrice: 3999,
    image: arrivalLinenShirt,
    images: [arrivalLinenShirt, linenDetail, linenFabric, linenHem, linenAngle],
    category: "Tops",
    rating: 4.7,
    reviewsCount: 118,
    description:
      "Crafted from 100% organic French linen, pre-washed for effortless softness and an airy drape that only gets better with time.",
    colors: [
      { name: "Ecru", hex: "#E8E2D5", inStock: true },
      { name: "Sage", hex: "#89966A", inStock: true },
      { name: "Terracotta", hex: "#C76B4E", inStock: true },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    sku: "TOP-LINEN-ECRU",
    tags: ["neutral", "weekend", "travel", "Tops"],
  },
  {
    id: "wide-leg-pants",
    name: "Flowy Wide-Leg Pants",
    price: 3499,
    originalPrice: 4499,
    image: arrivalWideLegPants,
    images: [arrivalWideLegPants, pantsDetail, pantsFabric, pantsHem, pantsAngle],
    category: "Pants",
    rating: 4.9,
    reviewsCount: 184,
    description:
      "Fluid, pleated trousers cut from lightweight twill. Designed with a clean waistband and relaxed leg for desk-to-dinner sophistication.",
    colors: [
      { name: "Cream", hex: "#F3EFE6", inStock: true },
      { name: "Espresso", hex: "#2E2421", inStock: true },
    ],
    sizes: ["26", "28", "30", "32", "34"],
    sku: "BTM-WIDE-CREAM",
    tags: ["neutral", "office", "travel", "Pants"],
  },
  {
    id: "satin-slip-dress",
    name: "Satin Slip Dress",
    price: 4499,
    originalPrice: 5999,
    image: arrivalSatinSlipDress,
    images: [arrivalSatinSlipDress, satinDetail, satinFabric, satinHem, satinAngle],
    category: "Dresses",
    rating: 4.8,
    reviewsCount: 96,
    description:
      "A luminous bias-cut slip dress featuring adjustable skinny straps and a liquid drape that glides over curves with understated luxury.",
    colors: [
      { name: "Champagne", hex: "#EADDC8", inStock: true },
      { name: "Emerald", hex: "#234D3D", inStock: true },
      { name: "Midnight", hex: "#161B2E", inStock: true },
    ],
    sizes: ["XS", "S", "M", "L"],
    sku: "DRS-SLIP-CHAMP",
    tags: ["date-night", "Dresses"],
  },
];

export const trending: Product[] = [
  elegantHighHeels,
  champagneOrganzaShararaProduct,
  indigoEmbroideredVyshyvankaProduct,
  ruchedChiffonSleeveDressProduct,
  crossoverRibbedKnitDressProduct,
  floralBohoTunicDressProduct,
  {
    id: "oversized-blazer",
    name: "Oversized Blazer",
    price: 5999,
    originalPrice: 7999,
    image: trendOversizedBlazer,
    images: [trendOversizedBlazer, blazerDetail, blazerFabric, blazerHem, blazerAngle],
    category: "Outerwear",
    rating: 4.9,
    reviewsCount: 162,
    description:
      "Sharp tailored shoulder pads meet a relaxed modern silhouette. Crafted from a structured wool-blend weave with horn buttons.",
    colors: [
      { name: "Camel", hex: "#C49A6C", inStock: true },
      { name: "Charcoal", hex: "#3A3D40", inStock: true },
    ],
    sizes: ["XS", "S", "M", "L"],
    sku: "OUT-BLAZER-CAMEL",
    tags: ["office", "neutral", "Outerwear"],
  },
  {
    id: "pleated-skirt",
    name: "Pleated Midi Skirt",
    price: 2899,
    originalPrice: 3899,
    image: trendPleatedSkirt,
    images: [trendPleatedSkirt, skirtDetail, skirtFabric, skirtHem, skirtAngle],
    category: "Skirts",
    rating: 4.7,
    reviewsCount: 75,
    description:
      "Crisp knife pleats that catch the light with every step. Elasticated internal waistband offers seamless all-day ease.",
    colors: [
      { name: "Olive", hex: "#636F52", inStock: true },
      { name: "Sand", hex: "#D9CFBC", inStock: true },
    ],
    sizes: ["XS", "S", "M", "L"],
    sku: "SKT-PLEAT-OLIVE",
    tags: ["weekend", "date-night", "Skirts"],
  },
];

export const styleTabs: { label: string; tag: string }[] = [
  { label: "Neutral Palette", tag: "neutral" },
  { label: "Date Night", tag: "date-night" },
  { label: "Weekend Vibes", tag: "weekend" },
  { label: "Office Ready", tag: "office" },
  { label: "Travel Essentials", tag: "travel" },
];

export const catalog: Product[] = [
  ...newArrivals,
  ...trending.filter((t) => !newArrivals.some((n) => n.id === t.id)),
];

export function getProductById(id: string): Product | undefined {
  return catalog.find((p) => p.id === id);
}

export function getRelatedProducts(currentId: string, limit = 4): Product[] {
  const current = getProductById(currentId);
  if (!current) return catalog.slice(0, limit);

  // Match by category or tags, fallback to catalog
  const filtered = catalog.filter((p) => p.id !== currentId);
  const byCategory = filtered.filter((p) => p.category === current.category);
  const others = filtered.filter((p) => p.category !== current.category);

  return [...byCategory, ...others].slice(0, limit);
}
