interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
}

export function StarRating({
  rating,
  reviewCount,
  size = "sm",
}: StarRatingProps) {
  const starSize = size === "sm" ? "text-sm" : "text-base";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className={`flex items-center gap-1 ${textSize}`}>
      <span className={`${starSize}`} style={{ color: "oklch(var(--star-color))" }}>
        {"★".repeat(Math.floor(rating))}
        {rating % 1 >= 0.5 ? "½" : ""}
        {"☆".repeat(5 - Math.ceil(rating))}
      </span>
      <span className="text-muted-foreground font-body">
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className="text-muted-foreground font-body">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
