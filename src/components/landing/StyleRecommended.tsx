import { useState } from "react";
import { catalog, styleTabs } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

export function StyleRecommended() {
  const [active, setActive] = useState(styleTabs[0]?.label ?? "Neutral Palette");
  const activeTag = styleTabs.find((t) => t.label === active)?.tag ?? "neutral";
  const picks = catalog.filter((p) => p.tags.includes(activeTag)).slice(0, 4);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 pt-4 pb-16 sm:px-10 lg:pb-24">
        <h2 className="font-display text-2xl font-medium tracking-[0.08em] text-foreground uppercase sm:text-3xl">
          Style Recommended for You
        </h2>

        <div
          className="mt-6 flex flex-wrap gap-3"
          role="tablist"
          aria-label="Style recommendations"
        >
          {styleTabs.map((tab) => (
            <button
              key={tab.label}
              type="button"
              role="tab"
              aria-selected={active === tab.label}
              onClick={() => setActive(tab.label)}
              className={cn(
                "border px-5 py-2.5 text-xs font-medium tracking-wide transition-colors",
                active === tab.label
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-9 grid grid-cols-2 gap-x-5 gap-y-9 sm:gap-x-7 lg:grid-cols-4">
          {picks.map((p) => (
            <ProductCard key={`${activeTag}-${p.id}`} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
