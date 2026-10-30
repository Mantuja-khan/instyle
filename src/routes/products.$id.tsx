import { useState, useMemo } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  Share2,
  Check,
  X,
  Ruler,
  ShoppingBag,
  ArrowRight,
  Facebook,
  Linkedin,
  Twitter,
  Copy,
} from "lucide-react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ProductCard } from "@/components/landing/ProductCard";
import { SizeGuideModal } from "@/components/landing/SizeGuideModal";
import {
  getProductById,
  getRelatedProducts,
  formatPrice,
  elegantHighHeels,
  type Product,
} from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$id")({
  component: ProductDetailPage,
});

export function ProductDetailPage() {
  const { id } = useParams({ from: "/products/$id" });
  const product: Product = getProductById(id) || elegantHighHeels;
  const { addToCart, openCart } = useCart();

  // Active state
  const images = useMemo(() => {
    if (product.images && product.images.length > 0) return product.images;
    return [product.image];
  }, [product]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name || "Nude"
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[2] || product.sizes?.[0] || "7"
  );
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "additional" | "reviews">("reviews");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Review submission state
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [reviewsList, setReviewsList] = useState(
    product.reviews || [
      {
        id: "rev-default-1",
        author: "Priya Sharma",
        rating: 5,
        date: "October 18, 2026",
        title: "Absolute perfection — so comfortable for stilettos!",
        comment:
          "Wore these for an evening gala and received compliments all night. The nude shade matches beautifully with both western gowns and ethnic silks. The cushioned insole makes a huge difference.",
        verified: true,
      },
      {
        id: "rev-default-2",
        author: "Ananya Mehta",
        rating: 5,
        date: "October 12, 2026",
        title: "Extremely chic and flattering silhouette",
        comment:
          "The Italian leather finish is immaculate. True to size (I wear a 7 US / 38 EU). The heel height gives the most statuesque posture without straining the balls of your feet.",
        verified: true,
      },
      {
        id: "rev-default-3",
        author: "Rhea Kapoor",
        rating: 4,
        date: "September 29, 2026",
        title: "Stunning craftsmanship and packaging",
        comment:
          "High quality patent finish with a lovely subtle sheen. It arrived in a bespoke dust bag and rigid luxury box. Fits snug at first but breaks in quickly.",
        verified: true,
      },
    ]
  );

  const relatedProducts = useMemo(() => {
    return getRelatedProducts(product.id, 4);
  }, [product.id]);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleReset = () => {
    setSelectedColor(product.colors?.[0]?.name || "Nude");
    setSelectedSize(product.sizes?.[2] || product.sizes?.[0] || "7");
    setQuantity(1);
    toast.info("Options reset to default");
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: currentMainImage,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
  };

  const handleBuyNow = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: currentMainImage,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
    openCart();
  };

  const handleShare = (platform: string) => {
    if (platform === "copy") {
      navigator.clipboard?.writeText(window.location.href);
      toast.success("Product link copied to clipboard!");
    } else {
      toast.info(`Sharing to ${platform}...`);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      toast.error("Please provide both your name and review text.");
      return;
    }

    const review = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: "Just now",
      title: "Customer Review",
      comment: newReviewComment.trim(),
      verified: true,
    };

    setReviewsList((prev) => [review, ...prev]);
    setNewReviewAuthor("");
    setNewReviewComment("");
    toast.success("Thank you! Your review has been submitted.");
  };

  const currentMainImage = images[activeImageIndex] || product.image;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Solid Navbar on Product Detail Page */}
      <Header forceSolid={true} />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-muted-foreground py-4"
          >
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="capitalize">{product.category}</span>
            <span>/</span>
            <span className="font-medium text-foreground truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          {/* Product Primary Section: 2 Columns */}
          <div className="mt-4 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left Column: Product Image Gallery with Thumbnails on the Left */}
            <div className="lg:col-span-6 xl:col-span-6">
              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 items-start w-full">
                {/* Thumbnails Column at Left Side */}
                {images.length > 1 && (
                  <div className="flex sm:flex-col gap-2 sm:gap-2.5 overflow-x-auto sm:overflow-y-auto w-full sm:w-14 md:w-16 shrink-0 pb-1 sm:pb-0 scrollbar-none sm:max-h-[580px]">
                    {images.map((img, index) => {
                      const isActive = index === activeImageIndex;
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setActiveImageIndex(index)}
                          aria-label={`Select angle view ${index + 1}`}
                          className={`group relative aspect-square w-12 sm:w-full shrink-0 overflow-hidden bg-white cursor-pointer transition-all ${
                            isActive
                              ? "ring-2 ring-black ring-offset-1 border-transparent shadow-xs"
                              : "border border-border/80 opacity-70 hover:opacity-100 hover:border-black/50"
                          }`}
                        >
                          <img
                            src={img}
                            alt=""
                            className="h-full w-full object-contain p-0.5 sm:p-1 transition-transform group-hover:scale-105"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Main Image Container at Right Side of Thumbnails */}
                <div className="group relative aspect-square flex-1 w-full overflow-hidden bg-white border border-border/80">
                  <img
                    src={currentMainImage}
                    alt={`${product.name} angle view ${activeImageIndex + 1}`}
                    className="h-full w-full object-contain p-2 sm:p-4 transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Left Amber Arrow Button (Matching Screenshot) */}
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={prevImage}
                      aria-label="Previous product image"
                      className="absolute left-0 top-1/2 -translate-y-1/2 flex h-12 w-10 sm:h-14 sm:w-11 items-center justify-center bg-[#E5A852] text-white shadow-md transition-all hover:bg-[#d4973f] active:scale-95"
                    >
                      <ChevronLeft size={22} />
                    </button>
                  )}

                  {/* Right Arrow Button (Matching Screenshot) */}
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={nextImage}
                      aria-label="Next product image"
                      className="absolute right-0 top-1/2 -translate-y-1/2 flex h-12 w-10 sm:h-14 sm:w-11 items-center justify-center bg-white/90 text-foreground shadow-md transition-all hover:bg-white active:scale-95 border border-border/40"
                    >
                      <ChevronRight size={22} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Product Info & Actions */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between">
              <div>
                {/* Category */}
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground font-medium">
                  {product.category}
                </p>

                {/* Title */}
                <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center text-[#E5A852]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-[#E5A852] text-[#E5A852]" />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-foreground/80">
                    {product.rating || 4.8} ({reviewsList.length + 242} Review)
                  </span>
                </div>

                {/* Price in Rupees */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-base sm:text-lg text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="rounded bg-terracotta/10 px-2 py-0.5 text-xs font-semibold text-terracotta">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="mt-4 text-[13px] sm:text-sm leading-relaxed text-muted-foreground">
                  {product.description ||
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."}
                </p>

                {/* Color Selection */}
                <div className="mt-6">
                  <div className="text-xs font-medium text-foreground">
                    Color : <span className="text-muted-foreground font-normal">{selectedColor}</span>
                  </div>
                  <div className="mt-2.5 flex items-center gap-3">
                    {(
                      product.colors || [
                        { name: "Nude", hex: "#D8B89C" },
                        { name: "Black", hex: "#111111" },
                        { name: "Red", hex: "#A51D24" },
                        { name: "Navy", hex: "#1B263B" },
                      ]
                    ).map((c) => {
                      const isSelected = selectedColor === c.name;
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          aria-label={`Select color ${c.name}`}
                          className={`group relative flex h-7 w-7 items-center justify-center rounded-full transition-all ${
                            isSelected ? "ring-2 ring-foreground ring-offset-2" : "hover:scale-110"
                          }`}
                        >
                          <span
                            className="h-6 w-6 rounded-full border border-black/10 shadow-inner"
                            style={{ backgroundColor: c.hex }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mt-6">
                  <div className="text-xs font-medium text-foreground">
                    Size : <span className="text-muted-foreground font-normal">{selectedSize}</span>
                  </div>
                  <div className="mt-2.5 flex flex-wrap items-center gap-2">
                    {(product.sizes || ["5", "6", "7", "8", "9", "10"]).map((sz) => {
                      const isSelected = selectedSize === sz;
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`flex h-9 min-w-9 sm:h-10 sm:min-w-10 px-3 items-center justify-center text-xs sm:text-sm font-medium transition-all ${
                            isSelected
                              ? "bg-[#E5A852] text-white shadow-sm font-semibold"
                              : "border border-border bg-card text-foreground hover:bg-muted"
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* View Size Guide Link */}
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs text-foreground/80 underline decoration-muted-foreground/60 underline-offset-4 hover:text-terracotta transition-colors"
                  >
                    <Ruler size={13} />
                    <span>View Size Guide</span>
                  </button>
                </div>

                {/* Clear & In Stock Status */}
                <div className="mt-5 flex items-center gap-4 text-xs">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>Clear</span>
                    <X size={12} />
                  </button>

                  <span className="inline-flex items-center gap-1.5 rounded-sm border border-emerald-300 bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">
                    <Check size={12} />
                    <span>In Stock</span>
                  </span>
                </div>

                {/* Purchase Actions Row */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex h-11 items-center border border-border bg-card">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
                    >
                      -
                    </button>
                    <span className="w-9 text-center text-xs font-semibold text-foreground">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-2 text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Add To Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 min-w-[130px] h-11 inline-flex items-center justify-center gap-2 bg-[#2E1F18] px-5 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-[#1C1410] active:scale-[0.99]"
                  >
                    <ShoppingBag size={15} />
                    <span>Add To Cart</span>
                  </button>

                  {/* Buy Now Button (Amber / Gold) */}
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="flex-1 min-w-[120px] h-11 inline-flex items-center justify-center bg-[#E5A852] px-5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#d8973b] active:scale-[0.99] shadow-sm"
                  >
                    Buy Now
                  </button>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsWishlisted((w) => !w);
                      toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
                    }}
                    aria-label="Wishlist toggle"
                    className="flex h-11 w-11 shrink-0 items-center justify-center border border-border bg-card text-foreground transition-colors hover:bg-muted"
                  >
                    <Heart
                      size={18}
                      className={isWishlisted ? "fill-terracotta text-terracotta" : "text-muted-foreground"}
                    />
                  </button>
                </div>

                {/* SKU, Tags & Share */}
                <div className="mt-8 space-y-2 border-t border-border pt-6 text-xs text-muted-foreground">
                  <p>
                    <strong className="font-semibold text-foreground">SKU : </strong>
                    <span className="tracking-wider">{product.sku || "SHOE-ELEGANT-NUDE"}</span>
                  </p>
                  <p>
                    <strong className="font-semibold text-foreground">Tags : </strong>
                    <span>{product.tags.join(", ")}</span>
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <strong className="font-semibold text-foreground">Share : </strong>
                    <div className="flex items-center gap-2 text-foreground/75">
                      <button
                        type="button"
                        onClick={() => handleShare("Facebook")}
                        aria-label="Share on Facebook"
                        className="p-1 hover:text-[#B7955B] transition-colors"
                      >
                        <Facebook size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShare("Twitter")}
                        aria-label="Share on Twitter"
                        className="p-1 hover:text-[#B7955B] transition-colors"
                      >
                        <Twitter size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShare("LinkedIn")}
                        aria-label="Share on LinkedIn"
                        className="p-1 hover:text-[#B7955B] transition-colors"
                      >
                        <Linkedin size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShare("copy")}
                        aria-label="Copy Link"
                        className="p-1 hover:text-[#B7955B] transition-colors"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section: Description | Additional Information | Review */}
          <div className="mt-16 sm:mt-24 border-t border-border pt-10">
            {/* Tab Headers */}
            <div className="flex justify-center border-b border-border">
              <div className="flex gap-8 sm:gap-14">
                <button
                  type="button"
                  onClick={() => setActiveTab("description")}
                  className={`pb-4 text-sm sm:text-base font-medium transition-all ${
                    activeTab === "description"
                      ? "border-b-2 border-foreground text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
                  }`}
                >
                  Description
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("additional")}
                  className={`pb-4 text-sm sm:text-base font-medium transition-all ${
                    activeTab === "additional"
                      ? "border-b-2 border-foreground text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
                  }`}
                >
                  Additional Information
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-4 text-sm sm:text-base font-medium transition-all ${
                    activeTab === "reviews"
                      ? "border-b-2 border-foreground text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
                  }`}
                >
                  Review
                </button>
              </div>
            </div>

            {/* Tab Contents */}
            <div className="py-8 sm:py-12 max-w-6xl mx-auto w-full">
              {/* REVIEWS TAB (Matching the Screenshot) */}
              {activeTab === "reviews" && (
                <div className="space-y-10 animate-fade-up">
                  {/* Rating Breakdown Header */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center border-b border-border pb-10">
                    <div className="sm:col-span-4 text-center sm:text-left sm:border-r sm:border-border sm:pr-8">
                      <div className="font-display text-4xl sm:text-5xl font-bold text-foreground">
                        4.8 <span className="text-lg font-normal text-muted-foreground">out of 5</span>
                      </div>
                      <div className="mt-2 flex justify-center sm:justify-start items-center text-[#E5A852]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={18} className="fill-[#E5A852] text-[#E5A852]" />
                        ))}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        ({reviewsList.length + 242} Reviews)
                      </p>
                    </div>

                    {/* Star Distribution Progress Bars (Matching Screenshot) */}
                    <div className="sm:col-span-8 space-y-2">
                      {[
                        { label: "5 Star", pct: 78, count: 191 },
                        { label: "4 Star", pct: 18, count: 44 },
                        { label: "3 Star", pct: 3, count: 7 },
                        { label: "2 Star", pct: 1, count: 2 },
                        { label: "1 Star", pct: 0, count: 1 },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="w-12 shrink-0 text-foreground font-medium">{item.label}</span>
                          <div className="relative h-2 w-full flex-1 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full bg-[#E5A852] rounded-full transition-all duration-700"
                              style={{ width: `${item.pct}%` }}
                            />
                          </div>
                          <span className="w-8 shrink-0 text-right">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Reviews List - In a single row */}
                  <div className="space-y-4">
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      Customer Testimonials ({reviewsList.length})
                    </h3>

                    <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4">
                      {reviewsList.map((rev) => (
                        <div
                          key={rev.id}
                          className="w-[300px] sm:w-[380px] shrink-0 snap-start rounded border border-border bg-card p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs sm:text-sm font-semibold text-foreground">
                                    {rev.author}
                                  </span>
                                  {rev.verified && (
                                    <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700 border border-emerald-200">
                                      Verified
                                    </span>
                                  )}
                                </div>
                                <div className="mt-1 flex items-center gap-2">
                                  <div className="flex items-center text-[#E5A852]">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        size={12}
                                        className={
                                          i < rev.rating
                                            ? "fill-[#E5A852] text-[#E5A852]"
                                            : "text-muted"
                                        }
                                      />
                                    ))}
                                  </div>
                                  <span className="text-[10px] text-muted-foreground">{rev.date}</span>
                                </div>
                              </div>
                            </div>
                            <p className="mt-2.5 text-xs sm:text-[13px] font-semibold text-foreground line-clamp-1">
                              {rev.title}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                              {rev.comment}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Write a Review Section */}
                  <div className="border border-border bg-card p-6 sm:p-8">
                    <h4 className="font-display text-lg font-semibold text-foreground">
                      Write a Review
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Share your experience to help fellow shoppers make the right style choice.
                    </p>

                    <form onSubmit={handleReviewSubmit} className="mt-5 space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">
                          Rating
                        </label>
                        <div className="flex items-center gap-1.5 text-[#E5A852]">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewReviewRating(star)}
                              className="p-1 hover:scale-115 transition-transform"
                            >
                              <Star
                                size={20}
                                className={
                                  star <= newReviewRating
                                    ? "fill-[#E5A852] text-[#E5A852]"
                                    : "text-muted-foreground/30"
                                }
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="reviewName"
                          className="block text-xs font-medium text-foreground mb-1"
                        >
                          Your Name
                        </label>
                        <input
                          id="reviewName"
                          type="text"
                          required
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder="e.g. Meera Kapoor"
                          className="w-full border border-border bg-background px-3.5 py-2 text-xs sm:text-sm focus:border-terracotta focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="reviewComment"
                          className="block text-xs font-medium text-foreground mb-1"
                        >
                          Your Review
                        </label>
                        <textarea
                          id="reviewComment"
                          rows={4}
                          required
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                          placeholder="What did you love about the fit, material, and craftsmanship?"
                          className="w-full border border-border bg-background px-3.5 py-2 text-xs sm:text-sm focus:border-terracotta focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="inline-flex items-center justify-center bg-[#2E1F18] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#1C1410] transition-colors"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* DESCRIPTION TAB */}
              {activeTab === "description" && (
                <div className="space-y-6 text-sm leading-relaxed text-muted-foreground animate-fade-up">
                  <h3 className="font-display text-2xl font-semibold text-foreground">
                    Artisanal Craftsmanship & Modern Poise
                  </h3>
                  <p>
                    Every piece in our signature collection represents our commitment to timeless elegance.
                    Designed for versatility, this silhouette transitions effortlessly from high-powered daytime
                    appointments to candlelit dinners.
                  </p>
                  <p>
                    Precision patterning ensures an impeccable contour that moves naturally with your body.
                    Our artisans select only responsibly sourced, premium-grade materials to guarantee longevity,
                    breathability, and enduring beauty wash after wash.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs">
                    <div className="border border-border p-4 bg-card">
                      <h4 className="font-semibold text-foreground mb-1">Tailored Comfort</h4>
                      <p>Anatomically engineered footbed and ergonomic silhouette to minimize fatigue during all-day wear.</p>
                    </div>
                    <div className="border border-border p-4 bg-card">
                      <h4 className="font-semibold text-foreground mb-1">Sustainable Luxury</h4>
                      <p>Tanned in certified gold-rated Italian facilities using low-impact botanical methods.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ADDITIONAL INFORMATION TAB */}
              {activeTab === "additional" && (
                <div className="border border-border overflow-hidden animate-fade-up text-xs sm:text-sm">
                  <table className="w-full text-left">
                    <tbody className="divide-y divide-border">
                      {Object.entries(
                        product.specifications || {
                          Material: "100% Genuine Italian Patent Calfskin",
                          "Heel Height": "95mm / 3.75 inches",
                          Sole: "Smooth Natural Leather with Rubber Grip Tip",
                          Insole: "Memory foam arch cushion with soft lambskin lining",
                          Origin: "Handcrafted in Florence, Italy",
                          Care: "Wipe with a soft microfiber cloth; store in original dust bag",
                        }
                      ).map(([key, val]) => (
                        <tr key={key} className="even:bg-muted/30">
                          <td className="w-1/3 p-3.5 sm:p-4 font-medium text-foreground bg-muted/20">
                            {key}
                          </td>
                          <td className="p-3.5 sm:p-4 text-muted-foreground">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Section (Requested by User) */}
          <section className="mt-16 sm:mt-24 border-t border-border pt-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#B7955B] font-semibold">
                  Complete Your Look
                </p>
                <h2 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-foreground">
                  Related Products
                </h2>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-foreground hover:text-terracotta transition-colors"
              >
                <span>View Full Catalog</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Grid of Related Products */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Dynamic Clothing Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        product={product}
        selectedSize={selectedSize}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
