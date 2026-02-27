import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "./context/CartContext";
import { Header } from "./components/shop/Header";
import { CartDrawer } from "./components/shop/CartDrawer";
import { Footer } from "./components/shop/Footer";
import { HomePage } from "./pages/HomePage";
import { SuccessPage } from "./pages/SuccessPage";
import { CancelPage } from "./pages/CancelPage";
import type { Category } from "./data/products";

function getRoute(): "home" | "success" | "cancel" {
  const path = window.location.pathname;
  if (path.startsWith("/success")) return "success";
  if (path.startsWith("/cancel")) return "cancel";
  return "home";
}

function AppContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const route = getRoute();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {route === "home" && (
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => {
            setSelectedCategory(cat);
            setSearchQuery("");
          }}
        />
      )}

      <div className="flex-1">
        {route === "home" && (
          <HomePage
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        )}
        {route === "success" && <SuccessPage />}
        {route === "cancel" && <CancelPage />}
      </div>

      <Footer />
      <CartDrawer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
