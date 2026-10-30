import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, Facebook, Instagram, Youtube } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: ["New In", "Collections", "Accessories", "Journal", "Sale"],
  },
  {
    title: "Customer Care",
    links: [
      "Help Center",
      "Shipping & Delivery",
      "Returns & Exchanges",
      "Size Guide",
      "Contact Us",
    ],
  },
  {
    title: "Company",
    links: ["About Us", "Sustainability", "Careers", "Journal", "Store Locator"],
  },
];

function PinterestIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.62 2 3.88 5.7 3.88 9.13c0 1.98.76 3.74 2.39 4.4.27.11.51 0 .59-.29l.24-.94c.08-.29.05-.4-.17-.65-.46-.54-.76-1.24-.76-2.23 0-2.88 2.17-5.46 5.64-5.46 3.07 0 4.76 1.88 4.76 4.38 0 3.3-1.47 6.1-3.64 6.1-1.2 0-2.1-.99-1.81-2.21.34-1.45 1.01-3.02 1.01-4.07 0-.94-.5-1.72-1.55-1.72-1.23 0-2.22 1.27-2.22 2.97 0 1.08.37 1.81.37 1.81l-1.49 6.3c-.44 1.86-.07 4.15-.04 4.38.02.14.2.17.28.07.11-.14 1.55-1.92 2.04-3.7.14-.5.8-3.12.8-3.12.39.75 1.54 1.41 2.76 1.41 3.63 0 6.09-3.31 6.09-7.74C18.98 5.14 16.13 2 12.04 2z" />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <footer className="bg-espresso text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_0.8fr_1.2fr] lg:py-18">
        <div className="min-w-0">
          <h3 className="font-display text-xl font-medium tracking-[0.08em] uppercase">
            Join Our Community
          </h3>
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-cream/70">
            Be the first to know about new arrivals, exclusive offers, and style inspiration.
          </p>
          {subscribed ? (
            <p className="mt-5 inline-flex items-center gap-2 border border-cream/30 px-5 py-2.5 text-sm text-cream">
              Welcome to InStyle — check your inbox soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 flex max-w-xs items-center gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="min-w-0 flex-1 border border-cream/30 bg-transparent px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-cream/60 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid h-10 w-10 shrink-0 place-items-center bg-cream text-espresso transition-transform hover:scale-105"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          )}
          <div className="mt-7 flex items-center gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label={["Instagram", "Facebook", "YouTube"][i]}
                className="grid h-9 w-9 place-items-center border border-cream/30 text-cream/80 transition-colors hover:border-cream hover:text-cream"
              >
                <Icon size={15} />
              </a>
            ))}
            <a
              href="#"
              aria-label="Pinterest"
              className="grid h-9 w-9 place-items-center border border-cream/30 text-cream/80 transition-colors hover:border-cream hover:text-cream"
            >
              <PinterestIcon />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="min-w-0">
            <h4 className="text-[12px] font-bold tracking-label text-cream uppercase">
              {col.title}
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[13px] text-cream/70 transition-colors hover:text-cream"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="min-w-0 md:col-span-2 md:border-t md:border-cream/10 md:pt-8 lg:col-span-1 lg:border-0 lg:pt-0">
          <p className="font-display text-3xl font-semibold tracking-[0.14em]">
            INSTYLE<span className="text-terracotta">.</span>
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-cream/70">
            Modern fashion for a life in motion.
          </p>
          <p className="mt-6 text-[11px] text-cream/50">© 2026 INSTYLE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
