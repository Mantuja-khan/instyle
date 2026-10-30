import { useEffect, useState, useRef } from "react";

// The letters forming "INSTYLE."
const LETTERS = [
  { char: "I", fromX: -260, fromY: -180, rotate: -35 },
  { char: "N", fromX: 180, fromY: -220, rotate: 25 },
  { char: "S", fromX: -220, fromY: 160, rotate: 40 },
  { char: "T", fromX: 250, fromY: 180, rotate: -45 },
  { char: "Y", fromX: -140, fromY: -240, rotate: 30 },
  { char: "L", fromX: 160, fromY: 220, rotate: -20 },
  { char: "E", fromX: -280, fromY: 40, rotate: -50 },
  { char: ".", fromX: 220, fromY: -140, rotate: 60, isDot: true },
];

export function IntroSplashLoader() {
  const [shouldRender, setShouldRender] = useState(false);
  const [stage, setStage] = useState<"scatter" | "join" | "fly" | "done">("scatter");
  const [flyTarget, setFlyTarget] = useState({ x: 40, y: 30, scale: 0.45 });
  const centerLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show animation on every page refresh/load as requested
    setShouldRender(true);

    // Timeline: Total ~3s of dramatic intro:
    // 0ms -> Stage: "scatter" (letters scattered across random coordinates)
    // 80ms -> Stage: "join" (letters smoothly glide from random spots to meet in center)
    // 2100ms -> Measure exact position of navbar logo
    // 2200ms -> Stage: "fly" (joined word flies smoothly from center to navbar top-left logo, shrinking to scale)
    // 3000ms -> Stage: "done" (overlay fades out, removed from DOM)

    const timerJoin = setTimeout(() => {
      setStage("join");
    }, 80);

    const timerMeasure = setTimeout(() => {
      // Find the logo in the top navbar
      const logoEl = document.getElementById("navbar-logo");
      if (logoEl && centerLogoRef.current) {
        const logoRect = logoEl.getBoundingClientRect();
        const centerRect = centerLogoRef.current.getBoundingClientRect();

        const deltaX = logoRect.left + logoRect.width / 2 - (centerRect.left + centerRect.width / 2);
        const deltaY = logoRect.top + logoRect.height / 2 - (centerRect.top + centerRect.height / 2);
        const scale = Math.min(logoRect.height / centerRect.height, 0.45);

        setFlyTarget({ x: deltaX, y: deltaY, scale });
      }
    }, 2050);

    const timerFly = setTimeout(() => {
      setStage("fly");
    }, 2150);

    const timerDone = setTimeout(() => {
      setStage("done");
      setTimeout(() => {
        setShouldRender(false);
      }, 350);
    }, 3000);

    return () => {
      clearTimeout(timerJoin);
      clearTimeout(timerMeasure);
      clearTimeout(timerFly);
      clearTimeout(timerDone);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
        stage === "done" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background Dimmed Curtain: Clean White as requested */}
      <div
        className={`absolute inset-0 bg-[#FFFFFF] transition-opacity duration-700 ease-in-out ${
          stage === "fly" || stage === "done" ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Center Word Container */}
      <div
        ref={centerLogoRef}
        className="relative z-10 flex items-center transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={
          stage === "fly" || stage === "done"
            ? {
                transform: `translate(${flyTarget.x}px, ${flyTarget.y}px) scale(${flyTarget.scale})`,
                opacity: 0.95,
              }
            : undefined
        }
      >
        {LETTERS.map((item, index) => {
          // When scattered, offset from random place
          const isScattered = stage === "scatter";

          return (
            <span
              key={index}
              style={{
                transform: isScattered
                  ? `translate(${item.fromX}px, ${item.fromY}px) rotate(${item.rotate}deg) scale(0.4)`
                  : "translate(0px, 0px) rotate(0deg) scale(1)",
                opacity: isScattered ? 0 : 1,
                transitionDuration: stage === "join" ? `${1100 + index * 90}ms` : "700ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              className={`font-display select-none inline-block text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.16em] transition-all will-change-transform ${
                item.isDot ? "text-[#C76B4E]" : "text-[#18181b]"
              }`}
            >
              {item.char}
            </span>
          );
        })}
      </div>
    </div>
  );
}
