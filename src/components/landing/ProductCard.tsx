import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { type Product, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  aspect = "aspect-[4/5]",
}: {
  product: Product;
  aspect?: string;
}) {
  const [liked, setLiked] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      color: product.colors?.[0]?.name,
      size: product.sizes?.[0] || "Standard",
      quantity: 1,
    });
  };

  return (
    <div className="group relative flex flex-col justify-between">
      <div>
        <Link
          to="/products/$id"
          params={{ id: product.id }}
          className="block"
          aria-label={`View details for ${product.name}`}
        >
          <div
            className={cn(
              "relative overflow-hidden bg-white border border-border/60 flex items-center justify-center transition-all duration-300 group-hover:border-foreground/30",
              aspect
            )}
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className={cn(
                "h-full w-full object-contain p-2 transition-all duration-700 group-hover:scale-105",
                product.images && product.images.length > 1 && "group-hover:opacity-0"
              )}
            />

            {product.images && product.images[1] && (
              <img
                src={product.images[1]}
                alt={`${product.name} alternate view`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
            )}

            {/* Quick Add To Cart on Hover overlay */}
            <div className="absolute inset-x-2 bottom-2 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hidden sm:block">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-1.5 bg-[#202719] py-2 px-3 text-[11px] font-semibold tracking-wider uppercase text-white shadow-lg hover:bg-black transition-colors"
              >
                <ShoppingBag size={13} />
                <span>Add To Cart</span>
              </button>
            </div>
          </div>
        </Link>

        <div className="mt-3 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              to="/products/$id"
              params={{ id: product.id }}
              className="block truncate text-[13px] font-medium text-foreground transition-colors hover:text-terracotta"
            >
              {product.name}
            </Link>
            <div className="mt-0.5 flex items-center gap-1.5 text-[13px]">
              <span className="font-semibold text-foreground">{formatPrice(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[12px] text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            aria-label={
              liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`
            }
            aria-pressed={liked}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLiked((v) => !v);
            }}
            className="shrink-0 p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Heart
              size={17}
              className={liked ? "fill-terracotta text-terracotta" : "text-muted-foreground"}
            />
          </button>
        </div>
      </div>

      {/* Mobile-visible Add To Cart Button */}
      <div className="mt-2.5 sm:hidden">
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-1.5 border border-border bg-white py-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground hover:bg-[#202719] hover:text-white transition-colors"
        >
          <ShoppingBag size={12} />
          <span>Add To Cart</span>
        </button>
      </div>
    </div>
  );
}
