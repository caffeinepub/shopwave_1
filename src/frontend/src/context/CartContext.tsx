import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useActor } from "../hooks/useActor";
import type { Product } from "../data/products";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  emoji: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isCheckingOut: boolean;
  checkout: (successUrl: string, cancelUrl: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function CartProviderInner({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);
  const { identity } = useInternetIdentity();
  const { actor, isFetching } = useActor();

  const principal = identity?.getPrincipal();
  const isAuthenticated = principal && !principal.isAnonymous();

  // Load cart from backend when actor is ready and user is authenticated
  useEffect(() => {
    if (!actor || isFetching || !isAuthenticated || cartLoaded) return;
    void (async () => {
      try {
        const saved = await actor.downloadShoppingCart(principal!);
        if (saved && saved.items.length > 0) {
          const loaded: CartItem[] = saved.items.map((item) => ({
            productId: item.productName,
            name: item.productName,
            price: Number(item.priceInCents) / 100,
            quantity: Number(item.quantity),
            description: item.productDescription,
            emoji: "🛒",
          }));
          setItems(loaded);
        }
        setCartLoaded(true);
      } catch {
        setCartLoaded(true);
      }
    })();
  }, [actor, isFetching, isAuthenticated, principal, cartLoaded]);

  // Reset loaded state when user changes
  useEffect(() => {
    setCartLoaded(false);
  }, [isAuthenticated]);

  // Persist cart to backend
  const persistCart = useCallback(
    (updatedItems: CartItem[]) => {
      if (!actor || !isAuthenticated) return;
      const cartView = {
        principal: principal!,
        items: updatedItems.map((item) => ({
          productName: item.name,
          currency: "usd",
          quantity: BigInt(item.quantity),
          priceInCents: BigInt(Math.round(item.price * 100)),
          productDescription: item.description,
        })),
      };
      void actor.uploadShoppingCart(cartView).catch(() => {});
    },
    [actor, isAuthenticated, principal],
  );

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === product.id);
        let updated: CartItem[];
        if (existing) {
          updated = prev.map((i) =>
            i.productId === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          );
        } else {
          updated = [
            ...prev,
            {
              productId: product.id,
              name: product.name,
              price: product.price,
              quantity,
              description: product.description,
              emoji: product.emoji,
            },
          ];
        }
        persistCart(updated);
        return updated;
      });
      toast.success(`${product.name} added to cart`, {
        description: `$${product.price.toFixed(2)}`,
        duration: 2500,
      });
    },
    [persistCart],
  );

  const removeItem = useCallback(
    (productId: string) => {
      setItems((prev) => {
        const updated = prev.filter((i) => i.productId !== productId);
        persistCart(updated);
        return updated;
      });
    },
    [persistCart],
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }
      setItems((prev) => {
        const updated = prev.map((i) =>
          i.productId === productId ? { ...i, quantity } : i,
        );
        persistCart(updated);
        return updated;
      });
    },
    [removeItem, persistCart],
  );

  const clearCart = useCallback(() => {
    setItems([]);
    if (actor && isAuthenticated) {
      void actor.deleteShoppingCart(principal!).catch(() => {});
    }
  }, [actor, isAuthenticated, principal]);

  const checkout = useCallback(
    async (successUrl: string, cancelUrl: string) => {
      if (items.length === 0) {
        toast.error("Your cart is empty");
        return;
      }
      if (!actor) {
        toast.error("Please wait while loading...");
        return;
      }
      setIsCheckingOut(true);
      try {
        const backendItems = items.map((item) => ({
          productName: item.name,
          currency: "usd",
          quantity: BigInt(item.quantity),
          priceInCents: BigInt(Math.round(item.price * 100)),
          productDescription: item.description,
        }));
        const url = await actor.createCheckoutSession(
          backendItems,
          successUrl,
          cancelUrl,
        );
        if (url) {
          window.location.href = url;
        } else {
          toast.error("Failed to create checkout session");
        }
      } catch (err) {
        console.error("Checkout error:", err);
        toast.error("Checkout failed. Please try again.");
      } finally {
        setIsCheckingOut(false);
      }
    },
    [items, actor],
  );

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        isCheckingOut,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  return <CartProviderInner>{children}</CartProviderInner>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
