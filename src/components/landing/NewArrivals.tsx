import { newArrivals } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { Reveal } from "@/components/Reveal";

export function NewArrivals() {
  return (
    <section id="new-arrivals" className="scroll-mt-20 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:py-20">
        <Reveal>
          <h2 className="font-display text-2xl font-medium tracking-[0.08em] text-foreground uppercase sm:text-3xl">
            New Arrivals
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-9 sm:gap-x-7 lg:grid-cols-4">
          {newArrivals.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
