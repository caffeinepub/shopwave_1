import { Heart, Waves } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "oklch(var(--primary))" }}
            >
              <Waves className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-foreground">
              ShopWave
            </span>
          </div>

          {/* Center copy */}
          <p className="text-sm text-muted-foreground font-body flex items-center gap-1.5">
            &copy; 2026. Built with{" "}
            <Heart
              className="h-3.5 w-3.5 inline-block"
              style={{ color: "oklch(var(--primary))", fill: "oklch(var(--primary))" }}
            />{" "}
            using{" "}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>

          {/* Links */}
          <nav aria-label="Footer links">
            <ul className="flex items-center gap-4 text-sm font-body text-muted-foreground">
              <li>
                <a href="/" className="hover:text-foreground transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <span className="text-border">|</span>
              </li>
              <li>
                <span className="text-muted-foreground text-xs">
                  Powered by Stripe
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
