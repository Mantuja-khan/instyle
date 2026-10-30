import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import festiveFusionBanner from "@/assets/festive-fusion-banner.jpg";

export function FestiveBanner() {
  return (
    <section className="w-full bg-background py-6 sm:py-10">
      <div className="w-full">
        <div className="group relative overflow-hidden w-full border-y border-border shadow-xs bg-white">
          {/* Banner Container taking full width */}
          <div className="relative min-h-[400px] sm:min-h-[460px] lg:min-h-[520px] w-full flex items-center">
            {/* Background Image */}
            <img
              src={festiveFusionBanner}
              alt="Festive Fusion Collection featuring vibrant traditional Indian ethnic wear"
              className="absolute inset-0 h-full w-full object-cover object-[70%_center] sm:object-[75%_center] lg:object-[80%_center] transition-transform duration-700 group-hover:scale-102"
            />

            {/* Subtle soft white & warm glow gradient on left to ensure maximum readability */}
            <div className="absolute inset-y-0 left-0 w-full sm:w-[65%] lg:w-[50%] bg-gradient-to-r from-white/95 via-white/85 to-transparent pointer-events-none z-10" />

            {/* Interactive Content Overlay on Left */}
            <div className="relative z-20 max-w-xl px-6 py-10 sm:px-12 sm:py-14 lg:px-16 xl:px-24">
              {/* Eyebrow */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#B7955B]">
                <Sparkles size={14} className="text-[#B7955B]" />
                <span>Special Festive Edition</span>
              </div>

              {/* Main Headline */}
              <div className="mt-3">
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#202719] leading-[1.05]">
                  Festive
                </h2>
                <p className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-[#B7955B] -mt-1 sm:-mt-2 font-light">
                  fusion
                </p>
              </div>

              {/* Subtitle / Description */}
              <p className="mt-4 sm:mt-5 max-w-md text-xs sm:text-sm lg:text-base leading-relaxed text-[#202719]/80 font-normal">
                Vibrant Rajasthani splendor meets contemporary style in our exquisite festival
                fashion collection, an opulent celebration of tradition.
              </p>

              {/* Interactive CTA Button */}
              <div className="mt-7 flex items-center gap-4">
                <Link
                  to="/products/$id"
                  params={{ id: "champagne-organza-sharara" }}
                  className="inline-flex items-center gap-2.5 border-2 border-[#202719] bg-[#202719] px-7 py-3 text-xs font-bold tracking-[0.2em] uppercase text-white shadow-sm transition-all hover:bg-transparent hover:text-[#202719] active:scale-95"
                >
                  <span>Shop Now</span>
                  <ArrowRight size={14} />
                </Link>

                <a
                  href="#collections"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#202719] hover:text-[#B7955B] transition-colors underline decoration-border underline-offset-4"
                >
                  <span>Explore Lookbook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
