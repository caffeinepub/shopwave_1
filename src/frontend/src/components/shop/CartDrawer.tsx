import { Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "../../context/CartContext";

export function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    items,
    updateQuantity,
    removeItem,
    subtotal,
    itemCount,
    isCheckingOut,
    checkout,
  } = useCart();

  const handleCheckout = async () => {
    const origin = window.location.origin;
    await checkout(`${origin}/success`, `${origin}/cancel`);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-full sm:w-[420px] p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="font-display flex items-center gap-2 text-lg">
            <ShoppingBag className="h-5 w-5" style={{ color: "oklch(var(--primary))" }} />
            Your Cart
            {itemCount > 0 && (
              <span
                className="ml-auto text-sm font-body font-normal text-muted-foreground"
              >
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Cart items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 py-12">
            <span className="text-6xl">🛒</span>
            <div className="text-center">
              <p className="font-display font-semibold text-lg text-foreground">
                Your cart is empty
              </p>
              <p className="text-muted-foreground font-body text-sm mt-1">
                Add some products to get started
              </p>
            </div>
            <Button
              onClick={closeCart}
              className="rounded-xl font-body mt-2"
              style={{
                backgroundColor: "oklch(var(--primary))",
                color: "oklch(var(--primary-foreground))",
              }}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="py-4 space-y-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3 animate-fade-in">
                    {/* Emoji */}
                    <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center shrink-0 text-2xl">
                      {item.emoji}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-semibold text-sm text-foreground leading-tight line-clamp-2">
                        {item.name}
                      </p>
                      <p className="font-body text-sm font-bold mt-1" style={{ color: "oklch(var(--primary))" }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1 bg-secondary rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-foreground"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-display font-bold text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-foreground"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="p-1 text-muted-foreground hover:text-destructive transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-border px-6 py-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-body text-muted-foreground">Subtotal</span>
                <span className="font-display font-bold text-xl text-foreground">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <Separator />
              <Button
                className="w-full h-12 rounded-xl font-body font-semibold text-base gap-2"
                onClick={() => void handleCheckout()}
                disabled={isCheckingOut}
                style={{
                  backgroundColor: "oklch(var(--primary))",
                  color: "oklch(var(--primary-foreground))",
                }}
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Checkout · ${subtotal.toFixed(2)}
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-muted-foreground font-body">
                Secure checkout powered by Stripe
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
