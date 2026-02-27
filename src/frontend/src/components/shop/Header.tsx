import { useState } from "react";
import { ShoppingCart, Search, User, LogOut, Waves, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "../../context/CartContext";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import type { Category } from "../../data/products";
import { CATEGORIES } from "../../data/products";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: Category;
  onCategoryChange: (c: Category) => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: HeaderProps) {
  const { itemCount, openCart } = useCart();
  const { login, clear, identity, isLoggingIn, isLoginSuccess, isInitializing } =
    useInternetIdentity();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const isLoggedIn = isLoginSuccess && identity && !identity.getPrincipal().isAnonymous();
  const principalStr = identity?.getPrincipal().toString() ?? "";
  const shortPrincipal = principalStr
    ? `${principalStr.slice(0, 5)}...${principalStr.slice(-3)}`
    : "";

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      {/* Main header row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0 group" aria-label="ShopWave home">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "oklch(var(--primary))" }}
          >
            <Waves className="h-4 w-4 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-foreground tracking-tight hidden sm:block">
            ShopWave
          </span>
        </a>

        {/* Desktop search */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 rounded-xl bg-secondary border-0 focus-visible:ring-1 font-body text-sm h-10"
            />
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1 sm:hidden" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile search toggle */}
          <button
            type="button"
            className="sm:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setMobileSearchOpen((v) => !v)}
            aria-label="Toggle search"
          >
            {mobileSearchOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </button>

          {/* Cart button */}
          <button
            type="button"
            onClick={openCart}
            className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Open cart (${itemCount} items)`}
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full text-xs flex items-center justify-center font-display font-bold"
                style={{
                  backgroundColor: "oklch(var(--primary))",
                  color: "oklch(var(--primary-foreground))",
                }}
              >
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>

          {/* Auth */}
          {isInitializing ? (
            <div className="w-9 h-9 rounded-xl bg-secondary animate-pulse" />
          ) : isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0"
                >
                  <User className="h-4 w-4 text-foreground" />
                  <span className="text-xs font-body text-muted-foreground hidden md:block">
                    {shortPrincipal}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl">
                <DropdownMenuItem
                  onClick={clear}
                  className="text-destructive focus:text-destructive font-body gap-2 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size="sm"
              onClick={login}
              disabled={isLoggingIn}
              className="rounded-xl font-body font-medium text-sm h-9"
              style={{
                backgroundColor: "oklch(var(--primary))",
                color: "oklch(var(--primary-foreground))",
              }}
            >
              {isLoggingIn ? "Signing in..." : "Login"}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile search expand */}
      {mobileSearchOpen && (
        <div className="sm:hidden px-4 pb-3 animate-fade-in-up">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 rounded-xl bg-secondary border-0 focus-visible:ring-1 font-body text-sm h-10 w-full"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Category nav */}
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 pb-3 pt-1"
        aria-label="Product categories"
      >
        <ul className="flex gap-1 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <li key={cat} className="shrink-0">
              <button
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-body font-medium transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  selectedCategory === cat
                    ? "text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
                style={
                  selectedCategory === cat
                    ? {
                        backgroundColor: "oklch(var(--primary))",
                        color: "oklch(var(--primary-foreground))",
                      }
                    : {}
                }
                aria-current={selectedCategory === cat ? "true" : undefined}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
