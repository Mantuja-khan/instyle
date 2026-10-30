import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";

export type CartItem = {
  id: string; // unique key, e.g. `${productId}-${color}-${size}`
  productId: string;
  name: string;
  price: number;
  originalPrice?: number | undefined;
  image: string;
  color?: string | undefined;
  size?: string | undefined;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  totalCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "instyle_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
    // Default initial demonstration items so the user immediately sees products in the drawer
    return [
      {
        id: "champagne-organza-sharara-Champagne Blush-M",
        productId: "champagne-organza-sharara",
        name: "Champagne Organza Peplum Sharara Set",
        price: 8499,
        originalPrice: 11999,
        image: "/src/assets/champagne-organza-sharara.png",
        color: "Champagne Blush",
        size: "M",
        quantity: 1,
      },
      {
        id: "elegant-high-heels-Nude-7",
        productId: "elegant-high-heels",
        name: "Elegant High Heels",
        price: 6999,
        originalPrice: 9999,
        image: "/src/assets/heel-main.jpg",
        color: "Nude",
        size: "7",
        quantity: 1,
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (newItem: Omit<CartItem, "id">) => {
    const itemKey = `${newItem.productId}-${newItem.color || "default"}-${newItem.size || "default"}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const existing = updated[existingIndex];
        if (existing) {
          updated[existingIndex] = {
            ...existing,
            quantity: existing.quantity + newItem.quantity,
          };
        }
        return updated;
      }
      return [{ ...newItem, id: itemKey }, ...prevCart];
    });

    toast.custom(
      (t) => (
        <div
          role="status"
          aria-live="polite"
          className="flex w-full max-w-[360px] items-center gap-3.5 rounded-lg border border-neutral-200 bg-white p-3 shadow-xl pointer-events-auto"
        >
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-white border border-neutral-100 flex items-center justify-center p-0.5">
            <img
              src={newItem.image}
              alt={newItem.name}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <span className="block text-[11px] font-bold tracking-wider text-black uppercase font-['Poppins',sans-serif]">
              Added
            </span>
            <p className="text-sm font-medium text-black truncate font-['Poppins',sans-serif]" title={newItem.name}>
              {newItem.name}
            </p>
          </div>
          <button
            type="button"
            onClick={() => toast.dismiss(t)}
            className="p-1 text-black/60 hover:text-black transition-colors rounded"
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      ),
      {
        duration: 3500,
        id: `added-${itemKey}-${Date.now()}`,
      }
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const removed = prev.find((item) => item.id === id);
      if (removed) {
        toast.info(`Removed ${removed.name} from cart`);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Cart has been cleared");
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        totalCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
