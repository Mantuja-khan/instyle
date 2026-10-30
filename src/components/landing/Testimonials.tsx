import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  productName: string;
}

const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Priya Sharma",
    role: "Fashion Consultant",
    location: "Mumbai",
    rating: 5,
    date: "October 18, 2026",
    title: "Absolute perfection — luxurious silhouette & comfort!",
    comment:
      "Wore the Silk Sharara for a Diwali gala and was complimented all night. The organza catches the light like pure gold dust and drape is royal yet feather-light.",
    productName: "Champagne Organza Sharara Set",
  },
  {
    id: "test-2",
    name: "Ananya Mehta",
    role: "Architectural Designer",
    location: "New Delhi",
    rating: 5,
    date: "October 22, 2026",
    title: "Extremely chic and statuesque posture",
    comment:
      "The Italian leather finish on the heels is immaculate. True to size with cushioned arch memory foam that makes 4-inch stilettos effortless for evening dinners.",
    productName: "Elegant Italian Heels",
  },
  {
    id: "test-3",
    name: "Aditi Rao",
    role: "Creative Director",
    location: "Bengaluru",
    rating: 5,
    date: "October 24, 2026",
    title: "Looks like haute couture straight off a runway",
    comment:
      "The density of the cobalt embroidery on the linen vyshyvanka is unbelievable. The drape of the European linen feels heirloom-grade.",
    productName: "Indigo Embroidered Vyshyvanka",
  },
  {
    id: "test-4",
    name: "Sneha Nair",
    role: "Brand Strategist",
    location: "Hyderabad",
    rating: 5,
    date: "October 26, 2026",
    title: "Tailored elegance with an effortless modern vibe",
    comment:
      "The oversized blazer gives the most sharp, confident silhouette without feeling bulky. The horn buttons and internal satin lining speak true luxury.",
    productName: "Tailored Oversized Blazer",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((curr) => (curr === 0 ? testimonials.length - 1 : curr - 1));
  };

  const next = () => {
    setCurrentIndex((curr) => (curr === testimonials.length - 1 ? 0 : curr + 1));
  };

  return (
    <section className="bg-secondary/25 border-y border-border py-14 sm:py-20 w-full">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 sm:pb-12 border-b border-border/70">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">
              <Quote size={14} className="text-terracotta" />
              <span>VOICES OF DISTINCTION</span>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-foreground uppercase">
              Customer Testimonials
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-xl">
              Authentic reviews from discerning women who cherish timeless craftsmanship and modern elegance.
            </p>
          </div>

          {/* Navigation Arrows for single row browsing */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center border border-border bg-white text-foreground hover:bg-[#202719] hover:text-white transition-colors shadow-2xs rounded-sm cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center border border-border bg-white text-foreground hover:bg-[#202719] hover:text-white transition-colors shadow-2xs rounded-sm cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* ALL TESTIMONIALS IN A SINGLE ROW */}
        <div className="mt-8 flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="w-[300px] sm:w-[380px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between border border-border bg-white p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                {/* Rating Stars and Verified Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-0.5 text-[#E5A852]">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        size={14}
                        className={idx < t.rating ? "fill-[#E5A852] text-[#E5A852]" : "text-muted"}
                      />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                    <ShieldCheck size={11} />
                    Verified
                  </span>
                </div>

                {/* Testimonial Title */}
                <h3 className="mt-4 font-display text-base font-semibold leading-snug text-foreground">
                  &ldquo;{t.title}&rdquo;
                </h3>

                {/* Comment Body */}
                <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-muted-foreground line-clamp-4">
                  {t.comment}
                </p>
              </div>

              {/* Author & Product Purchased */}
              <div className="mt-6 pt-4 border-t border-border/60">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-semibold text-foreground">{t.name}</h4>
                    <p className="text-[11px] text-muted-foreground">
                      {t.role} &bull; {t.location}
                    </p>
                  </div>
                  <span className="text-[10px] text-muted-foreground/80">{t.date}</span>
                </div>
                <div className="mt-2 text-[11px] font-medium text-terracotta tracking-wide uppercase">
                  Verified Purchase: {t.productName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
