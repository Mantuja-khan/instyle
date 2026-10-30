import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { toast } from "sonner";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCount,
    subtotal,
  } = useCart();

  // Prevent background scrolling when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  return (
    <>
      {/* Darkened Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Cart Drawer Opening From Right Side */}
      <aside
        aria-label="Shopping Cart Drawer"
        aria-modal="true"
        role="dialog"
        className={`fixed inset-y-0 right-0 z-[100] flex w-full max-w-[420px] flex-col bg-white text-[#18181b] shadow-2xl transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5 bg-white">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center bg-[#202719] text-white">
              <ShoppingBag size={18} />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold tracking-[0.14em] uppercase text-foreground">
                Shopping Cart
              </h2>
              <p className="text-xs text-muted-foreground">
                {totalCount} {totalCount === 1 ? "item" : "items"} in your bag
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-[#89966A]/10 border-b border-[#89966A]/20 px-6 py-2.5 text-xs text-[#202719] flex items-center gap-2">
          <Truck size={15} className="text-[#89966A] shrink-0" />
          <span>
            <strong>Free Express Shipping</strong> applied on your entire order!
          </span>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-border/60">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-16">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-muted/60 text-muted-foreground mb-4">
                <ShoppingBag size={30} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">
                Your Bag is Empty
              </h3>
              <p className="mt-2 max-w-[240px] text-xs text-muted-foreground leading-relaxed">
                Discover our curated runway edits and timeless silhouettes to begin styling.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-6 inline-flex items-center gap-2 bg-[#202719] px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-white hover:bg-black transition-colors"
              >
                <span>Explore Catalog</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-4 first:pt-2 last:pb-2 flex gap-4 items-start">
                {/* Item Thumbnail */}
                <Link
                  to="/products/$id"
                  params={{ id: item.productId }}
                  onClick={closeCart}
                  className="relative h-20 w-20 shrink-0 overflow-hidden bg-white border border-border/80 flex items-center justify-center p-1 group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to="/products/$id"
                      params={{ id: item.productId }}
                      onClick={closeCart}
                      className="font-medium text-xs sm:text-sm text-foreground hover:text-terracotta transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Attributes */}
                  <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                    {item.color && (
                      <span className="rounded bg-muted px-1.5 py-0.5 font-medium text-foreground/80">
                        Color: {item.color}
                      </span>
                    )}
                    {item.size && (
                      <span className="rounded bg-muted px-1.5 py-0.5 font-medium text-foreground/80">
                        Size: {item.size}
                      </span>
                    )}
                  </div>

                  {/* Pricing & Stepper */}
                  <div className="mt-3 flex items-center justify-between">
                    {/* Stepper */}
                    <div className="flex items-center border border-border bg-white rounded-sm">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-7 text-center text-xs font-semibold text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="text-right">
                      <div className="font-display text-sm font-bold text-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-[10px] text-muted-foreground">
                          {formatPrice(item.price)} each
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer (Summary & Checkout) */}
        {cart.length > 0 && (
          <div className="border-t border-border bg-white px-6 py-5 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-medium">Estimated Subtotal</span>
              <span className="font-display text-lg font-bold text-foreground">
                {formatPrice(subtotal)}
              </span>
            </div>

            <p className="text-[11px] text-muted-foreground">
              Taxes and insured courier shipping calculated at next step.
            </p>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  toast.success("Proceeding to secure checkout...", {
                    description: `Total amount: ${formatPrice(subtotal)}`,
                  });
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#202719] py-3.5 text-xs font-semibold tracking-wider uppercase text-white hover:bg-black transition-colors shadow-md active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </button>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={closeCart}
                  className="flex-1 border border-border bg-white py-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors text-center"
                >
                  Continue Shopping
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-muted-foreground hover:text-destructive px-2 py-2 transition-colors"
                >
                  Clear Bag
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground pt-1">
              <ShieldCheck size={13} className="text-emerald-600" />
              <span>100% Secure Checkout with 7-Day Hassle-Free Returns</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
