import { useState, useEffect, useCallback, useRef } from "react";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Leaf,
  X,
  Check,
  Sparkles,
} from "lucide-react";
import heroTrench from "@/assets/hero-trench.jpg";
import heroSageEmbroidered from "@/assets/hero-sage-embroidered.jpg";
import heroCreamFloral from "@/assets/hero-cream-floral.jpg";

const slides = [
  {
    id: 1,
    image: heroTrench,
    alt: "Fashion model in camel trench coat and tailored denim walking past modern architectural stone arcade",
    eyebrow: "EFFORTLESS. MODERN. YOU.",
    lines: ["Style That", "Moves With"],
    accent: "You.",
    description:
      "Timeless trench coats and relaxed essentials, thoughtfully designed for every city moment.",
    primaryCta: { label: "SHOP COLLECTIONS →", href: "#collections" },
    secondaryCta: { label: "EXPLORE NEW IN →", href: "#new-arrivals" },
    badge: "The Urban Trench Edit",
  },
  {
    id: 2,
    image: heroSageEmbroidered,
    alt: "Model wearing hand-embroidered sage green luxury silk ensemble with draped gossamer dupatta",
    eyebrow: "SAGE BOTANICAL COUTURE",
    lines: ["Artisan", "Elegance In"],
    accent: "Bloom.",
    description:
      "Intricately hand-embroidered silhouettes in breathable sage silk, celebrating modern heritage.",
    primaryCta: { label: "SHOP COUTURE →", href: "#collections" },
    secondaryCta: { label: "VIEW LOOKBOOK →", href: "#trending" },
    badge: "The Sage Heritage Capsule",
  },
  {
    id: 3,
    image: heroCreamFloral,
    alt: "Model wearing cream and dusty rose floral motif ensemble with fluid matching drape",
    eyebrow: "FESTIVE BOTANICALS",
    lines: ["Delicate", "Grace In Every"],
    accent: "Drape.",
    description:
      "Luminous ivory cotton-silks adorned with hand-blocked rose motifs and fluid gossamer drapes.",
    primaryCta: { label: "EXPLORE CAPSULE →", href: "#collections" },
    secondaryCta: { label: "DISCOVER MORE →", href: "#new-arrivals" },
    badge: "The Rose & Ivory Festive Edition",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [appointmentState, setAppointmentState] = useState({
    name: "",
    email: "",
    service: "Personal Wardrobe Curation",
    time: "Morning (10:00 AM)",
    submitted: false,
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Autoplay slider (6.5 seconds per slide, paused on hover/focus or open modals)
  useEffect(() => {
    if (isPaused || isAppointmentOpen || isStoryOpen) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, isAppointmentOpen, isStoryOpen, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointmentState((prev) => ({ ...prev, submitted: true }));
  };

  const resetAppointmentModal = () => {
    setIsAppointmentOpen(false);
    setTimeout(() => {
      setAppointmentState({
        name: "",
        email: "",
        service: "Personal Wardrobe Curation",
        time: "Morning (10:00 AM)",
        submitted: false,
      });
    }, 400);
  };

  const activeSlideData = slides[currentSlide] ?? slides[0];
  if (!activeSlideData) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-[#202719] text-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Editorial Fashion Hero Slider"
    >
      {/* Hero Container */}
      <div className="relative min-h-[680px] sm:min-h-[740px] lg:min-h-[820px] xl:min-h-[880px] w-full flex items-center">
        {/* Full-width Background Slide Images */}
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-0" : "opacity-0 -z-10 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                width={1920}
                height={1200}
                fetchPriority={index === 0 ? "high" : "low"}
                className={`h-full w-full object-cover object-[72%_center] sm:object-[78%_center] lg:object-[82%_center] xl:object-[84%_center] transition-transform duration-[7000ms] ease-out ${
                  isActive ? "scale-100" : "scale-105"
                }`}
              />
            </div>
          );
        })}

        {/* Soft Blurred Flushy Background on Left (No Box - Seamless Gradient & Frosted Blur) */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[70%] lg:w-[58%] xl:w-[52%] pointer-events-none z-10">
          {/* Frosted blur layer with gentle mask fade to the right */}
          <div className="absolute inset-0 backdrop-blur-[7px] [mask-image:linear-gradient(to_right,black_50%,rgba(0,0,0,0.6)_75%,transparent_100%)]" />

          {/* Atmospheric deep olive tonal gradient flush */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#202719]/95 via-[#202719]/80 to-transparent [mask-image:linear-gradient(to_right,black_60%,transparent_100%)]" />
        </div>

        {/* Subtle top & bottom edge gradients */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#202719] via-[#202719]/50 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#202719]/50 to-transparent pointer-events-none z-10" />

        {/* Left Vertical Appointment Tab (Desktop) */}
        <button
          type="button"
          onClick={() => setIsAppointmentOpen(true)}
          aria-label="Book a styling appointment"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-4 bg-[#89966A] hover:bg-[#78855a] text-[#FFFFFF] py-7 px-3.5 shadow-2xl transition-all duration-300 hover:pl-4.5 cursor-pointer border-r border-t border-b border-[#B7955B]/40 group"
        >
          <Calendar
            size={15}
            className="text-[#FFFFFF] transition-transform duration-300 group-hover:scale-115 group-hover:rotate-6"
          />
          <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-sans font-semibold tracking-[0.26em] uppercase text-[#FFFFFF] whitespace-nowrap">
            Book a Styling Appointment
          </span>
        </button>

        {/* Mobile/Tablet Booking Quick Pill */}
        <button
          type="button"
          onClick={() => setIsAppointmentOpen(true)}
          className="xl:hidden absolute top-20 left-4 sm:left-6 z-30 inline-flex items-center gap-2 bg-[#89966A]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#B7955B]/50 text-white text-[10px] font-semibold tracking-[0.2em] uppercase shadow-lg hover:bg-[#89966A]"
        >
          <Calendar size={13} />
          <span>Book Stylist</span>
        </button>

        {/* Main Content Area on Left (Unboxed, Open Editorial Typography with Smooth Transitions) */}
        <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 z-20">
          <div key={currentSlide} className="max-w-xl lg:max-w-2xl py-4 animate-fade-up">
            {/* Eyebrow Text */}
            <div className="flex items-center gap-3">
              <span className="h-[1.5px] w-7 bg-[#B7955B]" />
              <p className="text-[11px] sm:text-xs font-sans font-semibold tracking-[0.26em] text-[#B7955B] uppercase drop-shadow-sm">
                {activeSlideData.eyebrow}
              </p>
            </div>

            {/* Main Heading */}
            <h1 className="mt-4 sm:mt-5 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.6rem] font-normal leading-[1.06] text-[#FFFFFF] tracking-tight drop-shadow-md">
              {activeSlideData.lines.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
              <span className="font-serif italic text-[#B7955B] ml-2.5">
                {activeSlideData.accent}
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 sm:mt-6 max-w-lg text-sm sm:text-[15px] lg:text-base leading-relaxed text-white/90 font-light drop-shadow-sm">
              {activeSlideData.description}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
              {/* Primary Button */}
              <a
                href={activeSlideData.primaryCta.href}
                className="group relative inline-flex items-center justify-center gap-3 bg-[#89966A] hover:bg-[#78855a] text-[#FFFFFF] px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{activeSlideData.primaryCta.label}</span>
              </a>

              {/* Secondary Button */}
              <a
                href={activeSlideData.secondaryCta.href}
                className="group relative inline-flex items-center justify-center gap-3 bg-black/20 hover:bg-[#F4EFE5]/15 border border-[#F4EFE5]/80 hover:border-[#B7955B] text-[#FFFFFF] hover:text-[#B7955B] px-8 py-4 text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-300 backdrop-blur-sm shadow-md"
              >
                <span>{activeSlideData.secondaryCta.label}</span>
              </a>
            </div>

            {/* Slide collection capsule subtitle */}
            <div className="mt-8 pt-5 border-t border-[#B7955B]/30 flex items-center justify-between text-[11px] text-[#F4EFE5]/70 font-sans tracking-widest uppercase">
              <span className="font-medium text-white/90">{activeSlideData.badge}</span>
              <span className="text-[#B7955B] font-semibold">
                Editorial 0{currentSlide + 1} / 0{slides.length}
              </span>
            </div>
          </div>
        </div>

        {/* Right Navigation Controls */}
        <div className="absolute right-4 sm:right-7 lg:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/40 bg-[#202719]/45 backdrop-blur-md text-white hover:bg-[#89966A] hover:border-[#89966A] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/40 bg-[#202719]/45 backdrop-blur-md text-white hover:bg-[#89966A] hover:border-[#89966A] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Bottom-Left Slider Pagination (01, 02, 03) */}
        <div className="absolute left-6 sm:left-10 lg:left-16 xl:left-24 bottom-6 sm:bottom-8 z-30 flex items-center gap-5 sm:gap-7">
          {slides.map((_, index) => {
            const isActive = index === currentSlide;
            const slideNumber = `0${index + 1}`;
            return (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isActive ? "true" : "false"}
                className={`relative py-1.5 font-sans text-xs sm:text-[13px] tracking-[0.24em] transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "font-bold text-[#FFFFFF] drop-shadow-sm"
                    : "font-normal text-white/50 hover:text-white/85"
                }`}
              >
                <span>{slideNumber}</span>
                {/* Active Thin Antique Gold Underline */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#B7955B] transition-all duration-300" />
                )}
              </button>
            );
          })}

          {/* Minimalist autoplay progress indicator line */}
          <div className="hidden sm:block h-[1px] w-12 bg-white/20 overflow-hidden">
            <div
              key={currentSlide}
              className="h-full bg-[#B7955B] animate-[progress_6.5s_linear]"
              style={{
                width: isPaused ? "100%" : undefined,
                animationPlayState: isPaused ? "paused" : "running",
              }}
            />
          </div>
        </div>

        {/* Bottom-Right Story Link */}
        <button
          type="button"
          onClick={() => setIsStoryOpen(true)}
          aria-label="Discover the story"
          className="absolute right-5 sm:right-8 lg:right-16 bottom-5 sm:bottom-8 z-30 flex items-center gap-3.5 sm:gap-4 group cursor-pointer text-left bg-transparent border-0 p-0"
        >
          {/* Circular sage-green icon button with minimal leaf icon */}
          <span className="relative grid h-12 w-12 sm:h-13 sm:w-13 place-items-center rounded-full bg-[#89966A] text-white shadow-xl border border-[#B7955B]/40 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#78855a] group-hover:rotate-12">
            <Leaf size={19} className="text-white" />
          </span>

          {/* Text: "DISCOVER THE STORY" */}
          <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.22em] text-[#F4EFE5] uppercase leading-snug [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] group-hover:text-[#B7955B] transition-colors">
            Discover
            <br />
            The Story
          </span>

          {/* Thin decorative gold line */}
          <span className="hidden sm:block h-[1px] w-10 lg:w-14 bg-[#B7955B]/80 transition-all duration-300 group-hover:w-18 group-hover:bg-[#B7955B]" />
        </button>
      </div>

      {/* ============================================================== */}
      {/* Interactive Modal: BOOK A STYLING APPOINTMENT */}
      {/* ============================================================== */}
      {isAppointmentOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="appointment-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-up"
        >
          <div className="relative w-full max-w-lg bg-[#202719] border border-[#B7955B]/50 p-6 sm:p-9 shadow-2xl text-[#F4EFE5]">
            {/* Close Button */}
            <button
              type="button"
              onClick={resetAppointmentModal}
              aria-label="Close styling appointment modal"
              className="absolute top-5 right-5 text-white/70 hover:text-[#B7955B] transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 text-[11px] font-sans tracking-[0.24em] text-[#B7955B] uppercase mb-2">
              <Sparkles size={14} />
              <span>Bespoke Concierge</span>
            </div>
            <h2
              id="appointment-title"
              className="font-display text-2xl sm:text-3xl text-white font-normal"
            >
              Book a Private Styling Appointment
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#F4EFE5]/80 font-light leading-relaxed">
              Experience one-on-one personal styling at our atelier or virtually with a senior
              InStyle fashion director.
            </p>

            {appointmentState.submitted ? (
              <div className="mt-6 py-8 px-6 bg-[#202719]/90 border border-[#89966A]/60 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-[#89966A]/20 flex items-center justify-center text-[#89966A] mb-3">
                  <Check size={24} />
                </div>
                <h3 className="font-display text-xl text-white">Consultation Reserved</h3>
                <p className="mt-2 text-xs text-[#F4EFE5]/80 leading-relaxed">
                  Thank you,{" "}
                  <strong className="text-white">{appointmentState.name || "valued client"}</strong>
                  . Your personal stylist will reach out at{" "}
                  <strong className="text-white">{appointmentState.email}</strong> to finalize your
                  private session.
                </p>
                <button
                  type="button"
                  onClick={resetAppointmentModal}
                  className="mt-6 inline-flex items-center justify-center bg-[#89966A] hover:bg-[#78855a] text-white px-7 py-3 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
                >
                  Return to Storefront
                </button>
              </div>
            ) : (
              <form onSubmit={handleAppointmentSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-[11px] font-sans tracking-[0.18em] text-[#B7955B] uppercase mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Vance"
                    value={appointmentState.name}
                    onChange={(e) =>
                      setAppointmentState({ ...appointmentState, name: e.target.value })
                    }
                    className="w-full bg-[#181d13] border border-[#B7955B]/30 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#B7955B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-sans tracking-[0.18em] text-[#B7955B] uppercase mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@example.com"
                    value={appointmentState.email}
                    onChange={(e) =>
                      setAppointmentState({ ...appointmentState, email: e.target.value })
                    }
                    className="w-full bg-[#181d13] border border-[#B7955B]/30 px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#B7955B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans tracking-[0.18em] text-[#B7955B] uppercase mb-1.5">
                      Service
                    </label>
                    <select
                      value={appointmentState.service}
                      onChange={(e) =>
                        setAppointmentState({ ...appointmentState, service: e.target.value })
                      }
                      className="w-full bg-[#181d13] border border-[#B7955B]/30 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#B7955B]"
                    >
                      <option value="Personal Wardrobe Curation">Wardrobe Curation</option>
                      <option value="Special Event Suiting">Event Suiting</option>
                      <option value="Virtual Styling Suite">Virtual Suite</option>
                      <option value="Seasonal Capsule Building">Capsule Building</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans tracking-[0.18em] text-[#B7955B] uppercase mb-1.5">
                      Preferred Time
                    </label>
                    <select
                      value={appointmentState.time}
                      onChange={(e) =>
                        setAppointmentState({ ...appointmentState, time: e.target.value })
                      }
                      className="w-full bg-[#181d13] border border-[#B7955B]/30 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#B7955B]"
                    >
                      <option value="Morning (10:00 AM)">Morning (10:00 AM)</option>
                      <option value="Afternoon (2:00 PM)">Afternoon (2:00 PM)</option>
                      <option value="Evening (5:30 PM)">Evening (5:30 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#89966A] hover:bg-[#78855a] text-white py-3.5 text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
                  >
                    <span>Confirm Consultation Request</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* Interactive Modal: DISCOVER THE STORY */}
      {/* ============================================================== */}
      {isStoryOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="story-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-up"
        >
          <div className="relative w-full max-w-2xl bg-[#202719] border border-[#B7955B]/50 p-6 sm:p-10 shadow-2xl text-[#F4EFE5] max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsStoryOpen(false)}
              aria-label="Close story modal"
              className="absolute top-5 right-5 text-white/70 hover:text-[#B7955B] transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 text-[11px] font-sans tracking-[0.24em] text-[#B7955B] uppercase mb-2">
              <Leaf size={14} />
              <span>Editorial Journal</span>
            </div>
            <h2
              id="story-title"
              className="font-display text-3xl sm:text-4xl text-white font-normal"
            >
              Style That Moves With <span className="font-serif italic text-[#B7955B]">You.</span>
            </h2>
            <p className="mt-3 text-sm text-[#F4EFE5]/85 font-light leading-relaxed">
              Founded on the principle that true luxury is effortlessly lived in. We believe
              tailored outerwear and everyday garments should never constrain movement; instead,
              they should celebrate architecture in motion.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6 border-t border-[#B7955B]/30">
              <div className="p-4 bg-[#181d13] border border-[#B7955B]/20">
                <h4 className="font-display text-lg text-white">Conscious Tailoring</h4>
                <p className="mt-1.5 text-xs text-[#F4EFE5]/75 leading-relaxed font-light">
                  Crafted exclusively with GOTS-certified organic cotton, traceable virgin wool, and
                  sustainably woven Mulberry silks.
                </p>
              </div>
              <div className="p-4 bg-[#181d13] border border-[#B7955B]/20">
                <h4 className="font-display text-lg text-white">Architectural Ease</h4>
                <p className="mt-1.5 text-xs text-[#F4EFE5]/75 leading-relaxed font-light">
                  Tailored lines engineered with fluid drape so that every piece transitions
                  seamlessly from dawn boardroom to evening gala.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#B7955B]/20">
              <span className="text-xs text-[#B7955B] tracking-widest uppercase">
                Milan &bull; Paris &bull; New York
              </span>
              <a
                href="#collections"
                onClick={() => setIsStoryOpen(false)}
                className="inline-flex items-center gap-2 bg-[#89966A] hover:bg-[#78855a] text-white px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
              >
                <span>Explore The Collections</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
