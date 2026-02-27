import { ArrowLeft, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";

export function CancelPage() {
  const { openCart } = useCart();

  const handleRetryCheckout = () => {
    window.location.href = "/";
    setTimeout(() => openCart(), 300);
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex flex-col items-center gap-6 animate-scale-in">
          {/* Icon */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "oklch(var(--secondary))" }}
          >
            <span className="text-4xl" aria-hidden="true">
              🛒
            </span>
          </div>

          <div>
            <h1 className="font-display font-bold text-3xl text-foreground">
              Payment Cancelled
            </h1>
            <p className="text-muted-foreground font-body mt-2 leading-relaxed max-w-sm mx-auto">
              No worries! Your cart is still saved. You can review your items
              and complete your purchase whenever you&rsquo;re ready.
            </p>
          </div>

          {/* Info box */}
          <div
            className="w-full rounded-2xl p-5 text-left"
            style={{ backgroundColor: "oklch(var(--secondary))" }}
          >
            <p className="font-display font-semibold text-sm text-foreground mb-2">
              Your cart is still waiting
            </p>
            <p className="font-body text-sm text-muted-foreground">
              All the items you selected are still in your cart. Pick up right
              where you left off.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              onClick={handleRetryCheckout}
              className="flex-1 rounded-xl font-body font-semibold gap-2 h-12"
              style={{
                backgroundColor: "oklch(var(--primary))",
                color: "oklch(var(--primary-foreground))",
              }}
            >
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 rounded-xl font-body font-semibold gap-2 h-12"
            >
              <a href="/">
                <ArrowLeft className="h-4 w-4" />
                Keep Shopping
              </a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
