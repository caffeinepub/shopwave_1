import { useState } from "react";
import { Minus, Plus, ShoppingCart, Zap, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StarRating } from "./StarRating";
import { useCart } from "../../context/CartContext";
import type { Product } from "../../data/products";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart, checkout } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    openCart();
    onClose();
  };

  const handleBuyNow = async () => {
    addItem(product, quantity);
    onClose();
    const origin = window.location.origin;
    await checkout(`${origin}/success`, `${origin}/cancel`);
  };

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg rounded-2xl p-0 overflow-hidden gap-0">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-1.5 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Hero */}
        <div className="h-52 flex items-center justify-center bg-secondary/60 relative">
          <span className="text-8xl select-none animate-scale-in">
            {product.emoji}
          </span>
          <Badge
            className="absolute top-4 left-4 font-body text-sm"
            style={{
              backgroundColor: "oklch(var(--badge-bg))",
              color: "oklch(var(--badge-fg))",
              border: "none",
            }}
          >
            {product.category}
          </Badge>
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
              <span className="font-display font-bold text-muted-foreground uppercase tracking-widest text-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          <DialogHeader className="gap-1 text-left">
            <DialogTitle className="font-display text-xl font-bold leading-snug">
              {product.name}
            </DialogTitle>
            <StarRating
              rating={product.rating}
              reviewCount={product.reviewCount}
              size="md"
            />
          </DialogHeader>

          <p className="text-muted-foreground font-body leading-relaxed text-sm">
            {product.description}
          </p>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-3xl text-foreground">
              ${product.price.toFixed(2)}
            </span>
            <span
              className={`text-sm font-body font-medium ${
                product.inStock ? "text-accent" : "text-destructive"
              }`}
            >
              {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
            </span>
          </div>

          {/* Quantity selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-body text-muted-foreground w-16">
              Quantity
            </span>
            <div className="flex items-center gap-2 bg-secondary rounded-xl p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-foreground"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-display font-bold text-foreground">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-foreground"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="text-sm font-body text-muted-foreground ml-auto">
              Total:{" "}
              <strong className="text-foreground">
                ${(product.price * quantity).toFixed(2)}
              </strong>
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-1">
            <Button
              className="flex-1 rounded-xl font-body font-medium gap-2 h-11"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              style={{
                backgroundColor: "oklch(var(--primary))",
                color: "oklch(var(--primary-foreground))",
              }}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-xl font-body font-medium gap-2 h-11 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              onClick={() => void handleBuyNow()}
              disabled={!product.inStock}
            >
              <Zap className="h-4 w-4" />
              Buy Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
