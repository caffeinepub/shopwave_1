import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./StarRating";
import type { Product } from "../../data/products";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  animationDelay?: number;
}

export function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
  animationDelay = 0,
}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <div
      className="product-card bg-card rounded-2xl overflow-hidden border border-border/60 group animate-fade-in-up flex flex-col"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Clickable image area */}
      <button
        type="button"
        className="relative h-44 flex items-center justify-center bg-secondary/60 overflow-hidden w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={() => onViewDetails(product)}
        aria-label={`View details for ${product.name}`}
      >
        <span
          className="text-7xl select-none transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          {product.emoji}
        </span>
        {/* Category badge */}
        <Badge
          className="absolute top-3 left-3 text-xs font-body font-medium pointer-events-none"
          style={{
            backgroundColor: "oklch(var(--badge-bg))",
            color: "oklch(var(--badge-fg))",
            border: "none",
          }}
        >
          {product.category}
        </Badge>
        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="text-muted-foreground font-display font-semibold text-sm uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </button>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <button
          type="button"
          className="text-left focus-visible:outline-none"
          onClick={() => onViewDetails(product)}
        >
          <h3 className="font-display font-semibold text-card-foreground text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2 font-body leading-relaxed">
            {product.description}
          </p>
        </button>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <div className="flex items-center justify-between pt-1 mt-auto">
          <span className="font-display font-bold text-xl text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            className="gap-1.5 rounded-xl font-body font-medium transition-all duration-200"
            style={{
              backgroundColor: isAdding
                ? "oklch(var(--accent))"
                : "oklch(var(--primary))",
              color: "oklch(var(--primary-foreground))",
            }}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {isAdding ? "Added!" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
}
