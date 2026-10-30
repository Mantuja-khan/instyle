import { ArrowRight } from "lucide-react";
import promoAccessories from "@/assets/promo-accessories.jpg";
import promoEditorial from "@/assets/promo-editorial.jpg";
import promoSale from "@/assets/promo-sale.jpg";

export function PromoCards() {
  return (
    <section id="accessories" className="scroll-mt-20 bg-background">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 pb-6 sm:px-10 lg:grid-cols-3">
        {/* Accessories */}
        <a
          href="#trending"
          className="group grid grid-cols-[1.15fr_1fr] overflow-hidden bg-terracotta sm:min-h-[280px]"
        >
          <div className="flex min-w-0 flex-col justify-center p-6 sm:p-8">
            <h3 className="font-display text-2xl leading-snug font-medium text-accent-foreground">
              Accessories That Complete the Look
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-accent-foreground/85">
              Elevate your style with our curated picks.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold tracking-label text-accent-foreground uppercase">
              <span className="border-b border-accent-foreground/40 pb-0.5 transition-colors group-hover:border-accent-foreground">
                Shop Accessories
              </span>
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </div>
          <div className="overflow-hidden">
            <img
              src={promoAccessories}
              alt="Black leather tote and tortoiseshell sunglasses on a terracotta background"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </a>

        {/* Editorial */}
        <a
          id="journal"
          href="#new-arrivals"
          className="group grid scroll-mt-20 grid-cols-[1.15fr_1fr] overflow-hidden border border-border bg-card sm:min-h-[280px]"
        >
          <div className="flex min-w-0 flex-col justify-center p-6 sm:p-8">
            <h3 className="font-display text-2xl leading-snug font-medium text-foreground">
              Editorial Fashion Stories
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
              Inspiration, trends & timeless style advice.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold tracking-label text-foreground uppercase">
              <span className="border-b border-foreground/30 pb-0.5 transition-colors group-hover:border-foreground">
                Read the Journal
              </span>
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </div>
          <div className="overflow-hidden">
            <img
              src={promoEditorial}
              alt="Woman in a tailored beige suit walking in warm sunlight"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </a>

        {/* Limited time offers with image like editorial stories */}
        <a
          href="#sale"
          id="sale"
          className="group relative grid scroll-mt-20 grid-cols-[1.15fr_1fr] overflow-hidden border border-border bg-[#202719] text-[#F4EFE5] sm:min-h-[280px]"
        >
          <div className="relative z-10 flex min-w-0 flex-col justify-center p-6 sm:p-8">
            <span className="inline-block self-start bg-[#B7955B] px-2 py-0.5 text-[10px] font-semibold tracking-wider text-black uppercase mb-2">
              Save 30%
            </span>
            <h3 className="font-display text-2xl leading-snug font-medium text-white">
              Limited Time Offers
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[#F4EFE5]/80">
              Enjoy up to 30% off selected runway styles.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold tracking-label text-[#B7955B] uppercase">
              <span className="border-b border-[#B7955B]/50 pb-0.5 transition-colors group-hover:border-[#B7955B]">
                Shop the Sale
              </span>
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </div>
          <div className="relative overflow-hidden">
            <img
              src={promoSale}
              alt="High-end fashion model in elegant trench coat for limited time sale promotion"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Elegant overlay badge */}
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#202719] px-2.5 py-1 text-center shadow-lg border border-[#B7955B]/40">
              <span className="block text-[8px] font-bold tracking-widest uppercase text-[#B7955B]">Up To</span>
              <span className="block font-display text-base font-bold leading-tight">30% OFF</span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
