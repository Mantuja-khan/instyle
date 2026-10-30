import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { catalog, formatPrice, type Product } from "@/data/products";

const navLinks = [
  { label: "NEW IN", href: "/#new-arrivals" },
  { label: "COLLECTIONS", href: "/#collections" },
  { label: "SHOP", href: "/#trending" },
  { label: "ACCESSORIES", href: "/#accessories" },
  { label: "JOURNAL", href: "/#journal" },
  { label: "SALE", href: "/#sale" },
];

const mobileCategories = [
  { label: "DRESSES & GOWNS", tag: "Dresses", href: "/#new-arrivals", count: 4 },
  { label: "ETHNIC & FUSION", tag: "Ethnic & Fusion", href: "/#new-arrivals", count: 2 },
  { label: "TOPS & SHIRTS", tag: "Tops", href: "/#new-arrivals", count: 2 },
  { label: "TROUSERS & PANTS", tag: "Pants", href: "/#trending", count: 2 },
  { label: "OUTERWEAR & BLAZERS", tag: "Outerwear", href: "/#trending", count: 1 },
  { label: "SHOES & HEELS", tag: "Shoes", href: "/#trending", count: 1 },
];

const trendingSearches = [
  "OVERSIZED BLAZER",
  "PEPLUM SHARARA",
  "HIGH HEELS",
  "LINEN SHIRT",
  "SLIP DRESS",
  "WIDE-LEG PANTS",
];

export function Header({ forceSolid = false }: { forceSolid?: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const { openCart, totalCount } = useCart();

  useEffect(() => {
    if (forceSolid) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [forceSolid]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Handle ESC key for search and menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isSearchOpen) {
          setIsSearchOpen(false);
        }
        if (isMenuOpen) {
          setIsMenuOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, isMenuOpen]);

  // Auto-focus input when search opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  // Search Results filtering
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    return catalog.filter((product) => {
      const matchName = product.name.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchTags = (product.tags || []).some((t) => t.toLowerCase().includes(q));
      const matchDesc = product.description
        ? product.description.toLowerCase().includes(q)
        : false;
      return matchName || matchCategory || matchTags || matchDesc;
    });
  }, [searchQuery]);

  const showNavbarColor = forceSolid || isScrolled || isSearchOpen;

  const handleOpenSearch = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showNavbarColor
            ? "border-b border-border bg-white/98 text-[#18181b] backdrop-blur-md shadow-sm"
            : "border-b border-transparent bg-transparent text-white shadow-none"
        }`}
      >
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          {/* Left Brand and Mobile Toggle Button */}
          <div className="flex min-w-0 items-center gap-3">
            {/* 3 Toggle Bar for small screen */}
            <button
              type="button"
              aria-label="Open categories navigation"
              className={`inline-flex h-10 w-10 shrink-0 items-center justify-center border transition-colors lg:hidden ${
                showNavbarColor
                  ? "border-border text-foreground hover:bg-muted"
                  : "border-white/30 text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={18} />
            </button>

            <Link
              to="/"
              id="navbar-logo"
              className={`font-display shrink-0 text-xl sm:text-2xl font-bold tracking-[0.2em] transition-colors ${
                showNavbarColor ? "text-[#18181b]" : "text-white drop-shadow-sm"
              }`}
            >
              INSTYLE<span className="text-terracotta">.</span>
            </Link>
          </div>

          {/* Desktop Navigation - ALL IN CAPS */}
          <nav className="hidden min-w-0 items-center gap-7 lg:flex" aria-label="Main navigation">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-[12px] font-semibold tracking-widest uppercase transition-colors ${
                  showNavbarColor
                    ? "text-[#18181b]/80 hover:text-terracotta"
                    : "text-white/90 hover:text-[#B7955B] drop-shadow-sm"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            {/* Search Button */}
            <button
              type="button"
              aria-label="Search products"
              onClick={handleOpenSearch}
              className={`inline-flex h-10 w-10 items-center justify-center transition-colors cursor-pointer ${
                showNavbarColor
                  ? "text-[#18181b]/80 hover:bg-muted hover:text-[#18181b]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Search size={18} />
            </button>

            {/* Account Button */}
            <button
              type="button"
              aria-label="Account"
              className={`hidden h-10 w-10 items-center justify-center transition-colors sm:inline-flex ${
                showNavbarColor
                  ? "text-[#18181b]/80 hover:bg-muted hover:text-[#18181b]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <User size={18} />
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={openCart}
              aria-label="Open shopping cart"
              className={`relative inline-flex h-10 w-10 items-center justify-center transition-colors cursor-pointer ${
                showNavbarColor
                  ? "text-[#18181b]/80 hover:bg-muted hover:text-[#18181b]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <ShoppingBag size={18} />
              {totalCount > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 px-1 place-items-center rounded-full bg-terracotta text-[10px] font-semibold text-white animate-scale-in">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* FULL WIDTH NAVBAR SEARCH BAR OVERLAY */}
        {isSearchOpen && (
          <div className="absolute inset-0 z-50 flex items-center bg-white px-4 sm:px-8 border-b border-border shadow-md animate-fade-up">
            <div className="mx-auto flex w-full max-w-7xl items-center gap-3">
              <Search size={20} className="shrink-0 text-terracotta" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH APPAREL, DRESSES, BLAZERS, FOOTWEAR..."
                aria-label="Search products"
                className="w-full bg-transparent text-xs sm:text-sm md:text-base font-medium tracking-wider uppercase text-[#18181b] placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="p-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
              <button
                type="button"
                onClick={handleCloseSearch}
                aria-label="Close search"
                className="flex items-center gap-1.5 rounded-sm bg-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-muted/80 transition-colors cursor-pointer shrink-0"
              >
                <span>CLOSE</span>
                <X size={15} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* SEARCH PRODUCTS LIVE RESULTS DROPDOWN */}
      {isSearchOpen && (
        <>
          {/* Backdrop below navbar */}
          <div
            className="fixed inset-0 top-16 sm:top-20 z-40 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
            onClick={handleCloseSearch}
            aria-hidden="true"
          />

          {/* Results Container Panel */}
          <div className="fixed top-16 sm:top-20 inset-x-0 z-50 max-h-[75vh] overflow-y-auto bg-white border-b border-border shadow-2xl animate-fade-up">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
              {/* Empty query: Show Trending Searches and Curated Picks */}
              {!searchQuery.trim() && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    <Sparkles size={14} className="text-terracotta" />
                    <span>TRENDING SEARCHES</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {trendingSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setSearchQuery(term)}
                        className="rounded-full border border-border bg-muted/40 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:border-foreground/40 hover:bg-muted"
                      >
                        {term}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-border pt-5">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      FEATURED CURATIONS
                    </h4>
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {catalog.slice(0, 4).map((p) => (
                        <Link
                          key={p.id}
                          to="/products/$id"
                          params={{ id: p.id }}
                          onClick={handleCloseSearch}
                          className="group block rounded-sm border border-border/60 p-2.5 transition-all hover:border-foreground/30 hover:shadow-md"
                        >
                          <div className="relative aspect-[3/4] overflow-hidden bg-white">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <span className="mt-2.5 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {p.category}
                          </span>
                          <h5 className="mt-1 line-clamp-1 text-xs font-semibold uppercase tracking-wide text-foreground group-hover:text-terracotta">
                            {p.name}
                          </h5>
                          <div className="mt-1 flex items-baseline gap-2">
                            <span className="text-xs font-bold text-foreground">
                              {formatPrice(p.price)}
                            </span>
                            {p.originalPrice && (
                              <span className="text-[11px] text-muted-foreground line-through">
                                {formatPrice(p.originalPrice)}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Has query and found products */}
              {searchQuery.trim() && filteredProducts.length > 0 && (
                <div>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      FOUND {filteredProducts.length}{" "}
                      {filteredProducts.length === 1 ? "PRODUCT" : "PRODUCTS"} FOR &ldquo;{searchQuery}&rdquo;
                    </p>
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-xs text-terracotta hover:underline uppercase font-medium"
                    >
                      CLEAR SEARCH
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map((p) => (
                      <Link
                        key={p.id}
                        to="/products/$id"
                        params={{ id: p.id }}
                        onClick={handleCloseSearch}
                        className="group flex items-center gap-3.5 rounded-sm border border-border/70 p-2.5 transition-all hover:border-foreground/40 hover:bg-muted/30"
                      >
                        <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded bg-white border border-border/50">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-full w-full object-contain p-1 transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {p.category}
                          </span>
                          <h5 className="line-clamp-1 text-xs sm:text-sm font-semibold uppercase tracking-wide text-foreground group-hover:text-terracotta transition-colors">
                            {p.name}
                          </h5>
                          <div className="mt-1 flex items-baseline gap-2">
                            <span className="text-xs font-bold text-foreground">
                              {formatPrice(p.price)}
                            </span>
                            {p.originalPrice && (
                              <span className="text-[11px] text-muted-foreground line-through">
                                {formatPrice(p.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight
                          size={16}
                          className="shrink-0 text-muted-foreground group-hover:translate-x-1 group-hover:text-foreground transition-all"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Has query but no products found */}
              {searchQuery.trim() && filteredProducts.length === 0 && (
                <div className="py-8 text-center">
                  <p className="font-display text-lg font-semibold uppercase tracking-wider text-foreground">
                    NO PRODUCTS FOUND MATCHING &ldquo;{searchQuery}&rdquo;
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Try searching by category (e.g. Dresses, Shoes, Tops, Pants, Blazers) or click one of the trending terms below.
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {trendingSearches.map((term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setSearchQuery(term)}
                        className="rounded-full border border-border bg-muted/40 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-foreground hover:bg-muted"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* MOBILE CATEGORY DRAWER - OPENS FROM LEFT LIKE CART OPENS FROM RIGHT */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[90] bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Left-Side Category Drawer */}
      <aside
        aria-label="Category Navigation Menu"
        aria-modal="true"
        role="dialog"
        className={`fixed inset-y-0 left-0 z-[100] flex w-full max-w-[320px] sm:max-w-[360px] flex-col bg-white text-[#18181b] shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4 bg-white">
          <div>
            <span className="font-display text-lg font-bold tracking-[0.2em] text-[#18181b]">
              INSTYLE<span className="text-terracotta">.</span>
            </span>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              CURATED COLLECTIONS
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close category menu"
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Search Bar Trigger inside Drawer */}
        <div className="p-4 border-b border-border bg-muted/30">
          <button
            type="button"
            onClick={handleOpenSearch}
            className="flex w-full items-center justify-between border border-border bg-white px-3.5 py-2.5 text-xs uppercase tracking-wider text-muted-foreground shadow-2xs hover:border-foreground/40 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Search size={14} className="text-terracotta" />
              <span>SEARCH PRODUCTS...</span>
            </span>
            <span className="text-[10px] bg-muted px-1.5 py-0.5 font-semibold text-foreground">
              FIND
            </span>
          </button>
        </div>

        {/* Scrollable Navigation & Categories */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {/* Main Primary Links - ALL IN CAPS */}
          <div className="mb-6">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              NAVIGATION
            </p>
            <ul className="space-y-1">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground hover:text-terracotta transition-colors border-b border-border/40"
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={13} className="text-muted-foreground" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop By Category List - ALL IN CAPS */}
          <div className="mb-6">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              SHOP BY CATEGORY
            </p>
            <ul className="space-y-1">
              {mobileCategories.map((cat) => (
                <li key={cat.label}>
                  <a
                    href={cat.href}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-between py-2 text-xs font-medium uppercase tracking-wide text-foreground/80 hover:text-foreground hover:translate-x-1 transition-all"
                  >
                    <span>{cat.label}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      ({cat.count})
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* User Account / Bag Shortcuts */}
          <div className="pt-2 border-t border-border space-y-2">
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                openCart();
              }}
              className="flex w-full items-center justify-between py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground hover:text-terracotta transition-colors"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag size={15} />
                <span>VIEW SHOPPING BAG</span>
              </span>
              <span className="bg-terracotta px-2 py-0.5 text-[10px] font-bold text-white rounded-full">
                {totalCount}
              </span>
            </button>

            <button
              type="button"
              className="flex w-full items-center gap-2 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              <User size={15} />
              <span>MY ACCOUNT / SIGN IN</span>
            </button>
          </div>
        </div>

        {/* Drawer Footer Assurance */}
        <div className="border-t border-border p-4 bg-muted/40 text-[11px] text-muted-foreground">
          <p className="font-semibold uppercase tracking-wider text-foreground">
            InStyle Luxury Boutique
          </p>
          <p className="mt-0.5 text-[10px]">
            Complimentary Pan-India Express Delivery & 14-Day Returns.
          </p>
        </div>
      </aside>
    </>
  );
}
