import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useActor } from "../hooks/useActor";
import { useCart } from "../context/CartContext";

export function SuccessPage() {
  const [status, setStatus] = useState<"loading" | "confirmed" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const { clearCart } = useCart();
  const { actor, isFetching } = useActor();

  useEffect(() => {
    if (isFetching || !actor) return;

    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setStatus("error");
      setErrorMessage("No session ID found in URL.");
      return;
    }

    let cancelled = false;
    void (async () => {
      try {
        const result = await actor.getStripeSessionStatus(sessionId);
        if (cancelled) return;
        if (result.__kind__ === "completed") {
          setStatus("confirmed");
          clearCart();
        } else if (result.__kind__ === "failed") {
          setStatus("error");
          setErrorMessage(result.failed.error || "Payment could not be confirmed.");
        } else {
          setStatus("error");
          setErrorMessage("Payment could not be confirmed.");
        }
      } catch (err) {
        if (!cancelled) {
          setStatus("error");
          setErrorMessage(
            err instanceof Error ? err.message : "Failed to verify payment.",
          );
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [actor, isFetching, clearCart]);

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {status === "loading" && (
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "oklch(var(--secondary))" }}
            >
              <Loader2
                className="h-10 w-10 animate-spin"
                style={{ color: "oklch(var(--primary))" }}
              />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                Confirming your order...
              </h1>
              <p className="text-muted-foreground font-body mt-2">
                Please wait while we verify your payment.
              </p>
            </div>
          </div>
        )}

        {status === "confirmed" && (
          <div className="flex flex-col items-center gap-6 animate-scale-in">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "oklch(0.92 0.08 140)" }}
            >
              <CheckCircle2
                className="h-10 w-10"
                style={{ color: "oklch(0.55 0.18 140)" }}
              />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl text-foreground">
                Order Confirmed!
              </h1>
              <p className="text-muted-foreground font-body mt-2 leading-relaxed">
                Thank you for your purchase. Your order has been received and
                is being processed. You&rsquo;ll receive a confirmation email
                shortly.
              </p>
            </div>
            <div
              className="w-full rounded-2xl p-5 text-left"
              style={{ backgroundColor: "oklch(var(--secondary))" }}
            >
              <p className="font-display font-semibold text-sm text-foreground mb-1">
                What happens next?
              </p>
              <ul className="space-y-1 font-body text-sm text-muted-foreground">
                <li>📧 Confirmation email sent</li>
                <li>📦 Order processing begins</li>
                <li>🚚 Shipping within 2-3 business days</li>
              </ul>
            </div>
            <Button
              asChild
              className="rounded-xl font-body font-semibold gap-2 w-full h-12"
              style={{
                backgroundColor: "oklch(var(--primary))",
                color: "oklch(var(--primary-foreground))",
              }}
            >
              <a href="/">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </a>
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-6 animate-scale-in">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "oklch(0.95 0.05 27)" }}
            >
              <XCircle
                className="h-10 w-10"
                style={{ color: "oklch(var(--destructive))" }}
              />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                Something went wrong
              </h1>
              <p className="text-muted-foreground font-body mt-2">
                {errorMessage || "We couldn't confirm your payment."}
              </p>
            </div>
            <Button
              asChild
              className="rounded-xl font-body font-semibold gap-2 w-full h-12"
              style={{
                backgroundColor: "oklch(var(--primary))",
                color: "oklch(var(--primary-foreground))",
              }}
            >
              <a href="/">
                <ArrowLeft className="h-4 w-4" />
                Return to Shop
              </a>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
