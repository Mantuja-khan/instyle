import { useState, useEffect } from "react";
import { X, Ruler, Check } from "lucide-react";
import type { Product } from "@/data/products";

type SizeCategory = "dresses" | "tops" | "pants" | "outerwear" | "shoes";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  selectedSize?: string;
}

function getInitialCategory(product?: Product): SizeCategory {
  if (!product) return "dresses";
  const cat = (product.category || "").toLowerCase();
  const tags = (product.tags || []).map((t) => t.toLowerCase());

  if (cat.includes("shoe") || tags.includes("shoes") || tags.includes("heels")) {
    return "shoes";
  }
  if (cat.includes("outerwear") || tags.includes("outerwear") || product.name.toLowerCase().includes("blazer")) {
    return "outerwear";
  }
  if (cat.includes("pant") || cat.includes("skirt") || tags.includes("pants") || tags.includes("skirts")) {
    return "pants";
  }
  if (cat.includes("top") || cat.includes("shirt") || tags.includes("tops")) {
    return "tops";
  }
  return "dresses";
}

export function SizeGuideModal({
  isOpen,
  onClose,
  product,
  selectedSize,
}: SizeGuideModalProps) {
  const [activeCategory, setActiveCategory] = useState<SizeCategory>("dresses");
  const [unit, setUnit] = useState<"in" | "cm">("in");

  useEffect(() => {
    if (isOpen) {
      setActiveCategory(getInitialCategory(product));
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 animate-fade-up overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl border border-border bg-white text-[#18181b] p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close size guide"
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-terracotta">
          <Ruler size={15} />
          <span>OFFICIAL SIZE & FIT GUIDE</span>
        </div>
        <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground uppercase">
          {activeCategory === "shoes"
            ? "Footwear Sizing Chart"
            : activeCategory === "dresses"
              ? "Dresses & Ethnic Wear Size Guide"
              : activeCategory === "tops"
                ? "Tops & Shirts Size Guide"
                : activeCategory === "pants"
                  ? "Trousers & Bottoms Size Guide"
                  : "Outerwear & Blazers Size Guide"}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {product?.name ? `Tailored specifically for ${product.name}. ` : ""}
          Compare standards and body measurements for the perfect tailored silhouette.
        </p>

        {/* Category Selector Tabs */}
        <div className="mt-5 flex flex-wrap gap-1.5 border-b border-border pb-3">
          {[
            { id: "dresses", label: "Dresses & Ethnic" },
            { id: "tops", label: "Tops & Shirts" },
            { id: "pants", label: "Pants & Skirts" },
            { id: "outerwear", label: "Blazers & Suiting" },
            { id: "shoes", label: "Shoes & Heels" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as SizeCategory)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeCategory === cat.id
                  ? "bg-[#202719] text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Unit Toggle (for apparel) */}
        {activeCategory !== "shoes" && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Measurements shown in {unit === "in" ? "Inches (in)" : "Centimeters (cm)"}:
            </span>
            <div className="flex items-center gap-1 border border-border p-0.5 rounded bg-muted/40 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setUnit("in")}
                className={`px-2.5 py-1 rounded transition-colors ${
                  unit === "in" ? "bg-white text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                IN
              </button>
              <button
                type="button"
                onClick={() => setUnit("cm")}
                className={`px-2.5 py-1 rounded transition-colors ${
                  unit === "cm" ? "bg-white text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                CM
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Size Table */}
        <div className="mt-3.5 border border-border overflow-x-auto text-xs">
          {activeCategory === "shoes" && (
            <table className="w-full text-center">
              <thead className="bg-[#f4f4f5] text-foreground font-semibold">
                <tr>
                  <th className="py-2.5 px-3">US SIZE</th>
                  <th className="py-2.5 px-3">UK</th>
                  <th className="py-2.5 px-3">EU</th>
                  <th className="py-2.5 px-3">FOOT LENGTH (IN)</th>
                  <th className="py-2.5 px-3">FOOT LENGTH (CM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { us: "5", uk: "2.5", eu: "35", in: "8.65\"", cm: "22.0 cm" },
                  { us: "6", uk: "3.5", eu: "36", in: "9.00\"", cm: "22.9 cm" },
                  { us: "7", uk: "4.5", eu: "37.5", in: "9.35\"", cm: "23.8 cm" },
                  { us: "8", uk: "5.5", eu: "38.5", in: "9.70\"", cm: "24.6 cm" },
                  { us: "9", uk: "6.5", eu: "40", in: "10.00\"", cm: "25.4 cm" },
                  { us: "10", uk: "7.5", eu: "41", in: "10.30\"", cm: "26.2 cm" },
                ].map((row) => {
                  const isMatch = selectedSize === row.us;
                  return (
                    <tr
                      key={row.us}
                      className={isMatch ? "bg-[#B7955B]/15 font-semibold text-foreground" : "hover:bg-muted/40"}
                    >
                      <td className="py-2 px-3 flex items-center justify-center gap-1">
                        {isMatch && <Check size={12} className="text-terracotta" />}
                        <span>US {row.us}</span>
                      </td>
                      <td className="py-2 px-3">{row.uk}</td>
                      <td className="py-2 px-3">{row.eu}</td>
                      <td className="py-2 px-3">{row.in}</td>
                      <td className="py-2 px-3">{row.cm}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {activeCategory === "dresses" && (
            <table className="w-full text-center">
              <thead className="bg-[#f4f4f5] text-foreground font-semibold">
                <tr>
                  <th className="py-2.5 px-3">SIZE</th>
                  <th className="py-2.5 px-3">US SIZE</th>
                  <th className="py-2.5 px-3">BUST</th>
                  <th className="py-2.5 px-3">WAIST</th>
                  <th className="py-2.5 px-3">HIPS</th>
                  <th className="py-2.5 px-3">LENGTH</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  {
                    size: "XS",
                    us: "0-2",
                    bust: unit === "in" ? "32\"" : "81 cm",
                    waist: unit === "in" ? "25\"" : "64 cm",
                    hips: unit === "in" ? "35\"" : "89 cm",
                    len: unit === "in" ? "44\"" : "112 cm",
                  },
                  {
                    size: "S",
                    us: "4-6",
                    bust: unit === "in" ? "34\"" : "86 cm",
                    waist: unit === "in" ? "27\"" : "69 cm",
                    hips: unit === "in" ? "37\"" : "94 cm",
                    len: unit === "in" ? "44.5\"" : "113 cm",
                  },
                  {
                    size: "M",
                    us: "8-10",
                    bust: unit === "in" ? "36\"" : "91 cm",
                    waist: unit === "in" ? "29\"" : "74 cm",
                    hips: unit === "in" ? "39\"" : "99 cm",
                    len: unit === "in" ? "45\"" : "114 cm",
                  },
                  {
                    size: "L",
                    us: "12-14",
                    bust: unit === "in" ? "38\"" : "97 cm",
                    waist: unit === "in" ? "31\"" : "79 cm",
                    hips: unit === "in" ? "41\"" : "104 cm",
                    len: unit === "in" ? "45.5\"" : "116 cm",
                  },
                  {
                    size: "XL",
                    us: "16",
                    bust: unit === "in" ? "40\"" : "102 cm",
                    waist: unit === "in" ? "33\"" : "84 cm",
                    hips: unit === "in" ? "43\"" : "109 cm",
                    len: unit === "in" ? "46\"" : "117 cm",
                  },
                ].map((row) => {
                  const isMatch = selectedSize === row.size;
                  return (
                    <tr
                      key={row.size}
                      className={isMatch ? "bg-[#B7955B]/15 font-semibold text-foreground" : "hover:bg-muted/40"}
                    >
                      <td className="py-2 px-3 font-semibold flex items-center justify-center gap-1">
                        {isMatch && <Check size={12} className="text-terracotta" />}
                        <span>{row.size}</span>
                      </td>
                      <td className="py-2 px-3">{row.us}</td>
                      <td className="py-2 px-3">{row.bust}</td>
                      <td className="py-2 px-3">{row.waist}</td>
                      <td className="py-2 px-3">{row.hips}</td>
                      <td className="py-2 px-3">{row.len}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {activeCategory === "tops" && (
            <table className="w-full text-center">
              <thead className="bg-[#f4f4f5] text-foreground font-semibold">
                <tr>
                  <th className="py-2.5 px-3">SIZE</th>
                  <th className="py-2.5 px-3">US SIZE</th>
                  <th className="py-2.5 px-3">BUST / CHEST</th>
                  <th className="py-2.5 px-3">SHOULDER</th>
                  <th className="py-2.5 px-3">SLEEVE</th>
                  <th className="py-2.5 px-3">LENGTH</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  {
                    size: "XS",
                    us: "0-2",
                    bust: unit === "in" ? "33\"" : "84 cm",
                    shoulder: unit === "in" ? "14.5\"" : "37 cm",
                    sleeve: unit === "in" ? "23\"" : "58 cm",
                    len: unit === "in" ? "25\"" : "63 cm",
                  },
                  {
                    size: "S",
                    us: "4-6",
                    bust: unit === "in" ? "35\"" : "89 cm",
                    shoulder: unit === "in" ? "15.0\"" : "38 cm",
                    sleeve: unit === "in" ? "23.5\"" : "60 cm",
                    len: unit === "in" ? "25.5\"" : "65 cm",
                  },
                  {
                    size: "M",
                    us: "8-10",
                    bust: unit === "in" ? "37\"" : "94 cm",
                    shoulder: unit === "in" ? "15.5\"" : "39 cm",
                    sleeve: unit === "in" ? "24\"" : "61 cm",
                    len: unit === "in" ? "26\"" : "66 cm",
                  },
                  {
                    size: "L",
                    us: "12-14",
                    bust: unit === "in" ? "39\"" : "99 cm",
                    shoulder: unit === "in" ? "16.0\"" : "41 cm",
                    sleeve: unit === "in" ? "24.5\"" : "62 cm",
                    len: unit === "in" ? "26.5\"" : "67 cm",
                  },
                  {
                    size: "XL",
                    us: "16",
                    bust: unit === "in" ? "41\"" : "104 cm",
                    shoulder: unit === "in" ? "16.5\"" : "42 cm",
                    sleeve: unit === "in" ? "25\"" : "64 cm",
                    len: unit === "in" ? "27\"" : "69 cm",
                  },
                ].map((row) => {
                  const isMatch = selectedSize === row.size;
                  return (
                    <tr
                      key={row.size}
                      className={isMatch ? "bg-[#B7955B]/15 font-semibold text-foreground" : "hover:bg-muted/40"}
                    >
                      <td className="py-2 px-3 font-semibold flex items-center justify-center gap-1">
                        {isMatch && <Check size={12} className="text-terracotta" />}
                        <span>{row.size}</span>
                      </td>
                      <td className="py-2 px-3">{row.us}</td>
                      <td className="py-2 px-3">{row.bust}</td>
                      <td className="py-2 px-3">{row.shoulder}</td>
                      <td className="py-2 px-3">{row.sleeve}</td>
                      <td className="py-2 px-3">{row.len}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {activeCategory === "pants" && (
            <table className="w-full text-center">
              <thead className="bg-[#f4f4f5] text-foreground font-semibold">
                <tr>
                  <th className="py-2.5 px-3">WAIST SIZE</th>
                  <th className="py-2.5 px-3">EQUIVALENT</th>
                  <th className="py-2.5 px-3">NATURAL WAIST</th>
                  <th className="py-2.5 px-3">LOW HIP</th>
                  <th className="py-2.5 px-3">INSEAM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  {
                    waistSize: "26",
                    equiv: "XS (US 0-2)",
                    waist: unit === "in" ? "26\"" : "66 cm",
                    hip: unit === "in" ? "36\"" : "91 cm",
                    inseam: unit === "in" ? "31\"" : "79 cm",
                  },
                  {
                    waistSize: "28",
                    equiv: "S (US 4-6)",
                    waist: unit === "in" ? "28\"" : "71 cm",
                    hip: unit === "in" ? "38\"" : "96 cm",
                    inseam: unit === "in" ? "31.5\"" : "80 cm",
                  },
                  {
                    waistSize: "30",
                    equiv: "M (US 8-10)",
                    waist: unit === "in" ? "30\"" : "76 cm",
                    hip: unit === "in" ? "40\"" : "102 cm",
                    inseam: unit === "in" ? "32\"" : "81 cm",
                  },
                  {
                    waistSize: "32",
                    equiv: "L (US 12-14)",
                    waist: unit === "in" ? "32\"" : "81 cm",
                    hip: unit === "in" ? "42\"" : "107 cm",
                    inseam: unit === "in" ? "32\"" : "81 cm",
                  },
                  {
                    waistSize: "34",
                    equiv: "XL (US 16)",
                    waist: unit === "in" ? "34\"" : "86 cm",
                    hip: unit === "in" ? "44\"" : "112 cm",
                    inseam: unit === "in" ? "32.5\"" : "83 cm",
                  },
                ].map((row) => {
                  const isMatch = selectedSize === row.waistSize || selectedSize === row.equiv.split(" ")[0];
                  return (
                    <tr
                      key={row.waistSize}
                      className={isMatch ? "bg-[#B7955B]/15 font-semibold text-foreground" : "hover:bg-muted/40"}
                    >
                      <td className="py-2 px-3 font-semibold flex items-center justify-center gap-1">
                        {isMatch && <Check size={12} className="text-terracotta" />}
                        <span>{row.waistSize}</span>
                      </td>
                      <td className="py-2 px-3">{row.equiv}</td>
                      <td className="py-2 px-3">{row.waist}</td>
                      <td className="py-2 px-3">{row.hip}</td>
                      <td className="py-2 px-3">{row.inseam}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {activeCategory === "outerwear" && (
            <table className="w-full text-center">
              <thead className="bg-[#f4f4f5] text-foreground font-semibold">
                <tr>
                  <th className="py-2.5 px-3">SIZE</th>
                  <th className="py-2.5 px-3">US FIT</th>
                  <th className="py-2.5 px-3">CHEST</th>
                  <th className="py-2.5 px-3">SHOULDER</th>
                  <th className="py-2.5 px-3">SLEEVE</th>
                  <th className="py-2.5 px-3">TOTAL LENGTH</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  {
                    size: "XS",
                    us: "0-2",
                    chest: unit === "in" ? "36\"" : "91 cm",
                    shoulder: unit === "in" ? "16.5\"" : "42 cm",
                    sleeve: unit === "in" ? "24\"" : "61 cm",
                    len: unit === "in" ? "29\"" : "74 cm",
                  },
                  {
                    size: "S",
                    us: "4-6",
                    chest: unit === "in" ? "38\"" : "96 cm",
                    shoulder: unit === "in" ? "17.0\"" : "43 cm",
                    sleeve: unit === "in" ? "24.5\"" : "62 cm",
                    len: unit === "in" ? "29.5\"" : "75 cm",
                  },
                  {
                    size: "M",
                    us: "8-10",
                    chest: unit === "in" ? "40\"" : "102 cm",
                    shoulder: unit === "in" ? "17.5\"" : "44 cm",
                    sleeve: unit === "in" ? "25\"" : "63 cm",
                    len: unit === "in" ? "30\"" : "76 cm",
                  },
                  {
                    size: "L",
                    us: "12-14",
                    chest: unit === "in" ? "42\"" : "107 cm",
                    shoulder: unit === "in" ? "18.0\"" : "46 cm",
                    sleeve: unit === "in" ? "25.5\"" : "65 cm",
                    len: unit === "in" ? "30.5\"" : "77 cm",
                  },
                ].map((row) => {
                  const isMatch = selectedSize === row.size;
                  return (
                    <tr
                      key={row.size}
                      className={isMatch ? "bg-[#B7955B]/15 font-semibold text-foreground" : "hover:bg-muted/40"}
                    >
                      <td className="py-2 px-3 font-semibold flex items-center justify-center gap-1">
                        {isMatch && <Check size={12} className="text-terracotta" />}
                        <span>{row.size}</span>
                      </td>
                      <td className="py-2 px-3">{row.us}</td>
                      <td className="py-2 px-3">{row.chest}</td>
                      <td className="py-2 px-3">{row.shoulder}</td>
                      <td className="py-2 px-3">{row.sleeve}</td>
                      <td className="py-2 px-3">{row.len}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Fit Advice & Tips */}
        <div className="mt-4 rounded-sm bg-muted/60 p-3.5 text-xs text-muted-foreground border-l-2 border-terracotta">
          <p className="font-semibold text-foreground uppercase tracking-wide text-[11px]">
            Fit Note:
          </p>
          <p className="mt-0.5">
            {activeCategory === "shoes" &&
              "Our pointed-toe stilettos run true to size. If you have wider feet or sit between standard sizes, we recommend sizing up half a size."}
            {activeCategory === "dresses" &&
              "Designed with a fluid silhouette and delicate waist definition. Order your usual size; if between sizes, choose based on your bust measurement."}
            {activeCategory === "tops" &&
              "Cut for a contemporary relaxed drape. For an oversized editorial look, order your standard size. For a tailored fit, consider sizing down."}
            {activeCategory === "pants" &&
              "High-rise waistband sits cleanly at the natural waist. Measure the narrowest point of your torso for the best waist contour."}
            {activeCategory === "outerwear" &&
              "Structured shoulders with an easy straight body. Ample room is engineered in to comfortably layer over knitwear."}
          </p>
        </div>

        {/* How to Measure Quick Instructions */}
        <div className="mt-4 border-t border-border pt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
            How to Measure
          </h4>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-muted-foreground">
            <div className="p-2 border border-border/60 rounded">
              <span className="font-semibold text-foreground block">1. Bust / Chest:</span>
              Measure around the fullest part of your chest, keeping the tape level.
            </div>
            <div className="p-2 border border-border/60 rounded">
              <span className="font-semibold text-foreground block">2. Natural Waist:</span>
              Measure around the narrowest point above your belly button.
            </div>
            <div className="p-2 border border-border/60 rounded">
              <span className="font-semibold text-foreground block">3. Hips / Length:</span>
              Stand feet together and measure around the widest part of your hips.
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full bg-[#202719] py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-black transition-colors"
        >
          CONFIRM & CLOSE
        </button>
      </div>
    </div>
  );
}
