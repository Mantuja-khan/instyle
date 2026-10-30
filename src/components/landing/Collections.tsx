import { ArrowRight } from "lucide-react";
import { collections } from "@/data/products";
import { Reveal } from "@/components/Reveal";

export function Collections() {
  return (
    <section id="collections" className="scroll-mt-20 bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-10 sm:py-16 lg:grid-cols-[260px_1fr] lg:gap-14 lg:py-24">
        <Reveal className="flex flex-col justify-center text-center sm:text-left">
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl leading-tight font-medium tracking-[0.08em] text-cream uppercase">
            Curated
            <span className="sm:hidden"> </span>
            <br className="hidden sm:inline" />
            Collections
          </h2>
          <p className="mx-auto sm:mx-0 mt-2 sm:mt-4 max-w-[240px] text-xs sm:text-sm leading-relaxed text-cream/80 hidden xs:block">
            Handpicked looks for every mood, occasion, and season.
          </p>
          <a
            href="#trending"
            className="group mt-4 sm:mt-7 inline-flex items-center justify-center sm:justify-start gap-2 text-[11px] font-semibold tracking-label text-cream uppercase"
          >
            <span className="border-b border-cream/50 pb-0.5 transition-colors group-hover:border-cream">
              View All Collections
            </span>
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </Reveal>

        {/* Collections items: 4 across in a single row on all screen sizes, extra compact on small screens so all fit */}
        <div className="grid grid-cols-4 gap-2 xs:gap-3 sm:gap-6 lg:gap-8 items-start">
          {collections.map((c, i) => (
            <Reveal
              key={c.name}
              delay={i * 80}
              className="w-full"
            >
              <a href="#new-arrivals" className="group block text-center">
                <div className="mx-auto w-full max-w-[90px] xs:max-w-[115px] sm:max-w-none overflow-hidden rounded-t-full bg-sage-soft shadow-xs transition-transform duration-500 group-hover:scale-105">
                  <img
                    src={c.image}
                    alt={`${c.name} collection`}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
                {/* Main Content Title - Compact on small screen */}
                <h3 className="mt-2 sm:mt-4 text-[9px] xs:text-[10px] sm:text-[12px] font-semibold tracking-wider sm:tracking-label text-cream uppercase leading-tight">
                  {c.name}
                </h3>
                {/* Tagline hidden on small screens, visible on md and up */}
                <p className="mx-auto mt-1 max-w-[180px] text-xs leading-relaxed text-cream/70 hidden md:block">
                  {c.tagline}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
