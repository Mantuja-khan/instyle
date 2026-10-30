import { ArrowRight } from "lucide-react";
import { trending } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { Reveal } from "@/components/Reveal";

export function Trending() {
  return (
    <section id="trending" className="scroll-mt-20 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:py-20">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-2xl font-medium tracking-[0.08em] text-foreground uppercase sm:text-3xl">
              Trending Now
            </h2>
            <a
              href="#new-arrivals"
              className="group inline-flex items-center gap-2 text-[11px] font-semibold tracking-label text-foreground uppercase"
            >
              <span className="border-b border-foreground/30 pb-0.5 transition-colors group-hover:border-foreground">
                View All
              </span>
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 sm:gap-x-7 lg:grid-cols-4">
          {trending.map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <ProductCard product={p} aspect="aspect-square" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
