import { useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "../components/shop/ProductCard";
import { ProductModal } from "../components/shop/ProductModal";
import { useCart } from "../context/CartContext";
import { PRODUCTS, type Product, type Category } from "../data/products";

interface HomePageProps {
  searchQuery: string;
  selectedCategory: Category;
}

export function HomePage({ searchQuery, selectedCategory }: HomePageProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem, openCart } = useCart();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  const handleScrollToProducts = () => {
    document.getElementById("products-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main>
      {/* Hero */}
      <section className="hero-mesh px-4 sm:px-6 py-20 sm:py-28 text-center relative overflow-hidden">
        {/* Decorative blobs */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: "oklch(var(--primary))" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ backgroundColor: "oklch(var(--accent))" }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-sm font-body font-medium uppercase tracking-widest mb-4 animate-fade-in-up stagger-1"
            style={{ color: "oklch(var(--primary))" }}
          >
            ✦ New arrivals every week
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-5 animate-fade-in-up stagger-2">
            Discover
            <br />
            <span style={{ color: "oklch(var(--primary))" }}>Amazing</span>
            <br />
            Products
          </h1>
          <p className="text-white/70 font-body text-lg mb-8 max-w-md mx-auto leading-relaxed animate-fade-in-up stagger-3">
            From cutting-edge electronics to everyday essentials — curated for
            people who know quality.
          </p>
          <div className="flex items-center justify-center gap-3 animate-fade-in-up stagger-4">
            <Button
              size="lg"
              onClick={handleScrollToProducts}
              className="rounded-full font-body font-semibold gap-2 h-12 px-7 group"
              style={{
                backgroundColor: "oklch(var(--primary))",
                color: "oklch(var(--primary-foreground))",
              }}
            >
              Shop Now
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => openCart()}
              className="rounded-full font-body font-semibold h-12 px-7 border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              View Cart
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="relative z-10 mt-14 flex items-center justify-center gap-8 sm:gap-14 animate-fade-in-up stagger-5">
          {[
            { label: "Products", value: "12+" },
            { label: "Categories", value: "5" },
            { label: "Happy Customers", value: "10k+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display font-bold text-2xl text-white">
                {stat.value}
              </p>
              <p className="text-white/50 text-xs font-body uppercase tracking-wider mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Products section */}
      <section
        id="products-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-12"
      >
        {/* Section header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </h2>
            <p className="text-muted-foreground font-body text-sm mt-1">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"} found
              {searchQuery && (
                <span>
                  {" "}
                  for &ldquo;<strong>{searchQuery}</strong>&rdquo;
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Product grid */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="text-6xl">🔍</span>
            <div className="text-center">
              <p className="font-display font-semibold text-xl text-foreground">
                No products found
              </p>
              <p className="text-muted-foreground font-body text-sm mt-1 max-w-xs">
                {searchQuery
                  ? `No products match "${searchQuery}" in ${
                      selectedCategory === "All" ? "any category" : selectedCategory
                    }.`
                  : `No products available in ${selectedCategory}.`}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={setSelectedProduct}
                animationDelay={Math.min(idx * 60, 400)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
