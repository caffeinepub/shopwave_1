# ShopWave E-Commerce Store

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Modern e-commerce storefront with hero section and featured products
- Product catalog with multiple categories: Electronics, Clothing, Home & Garden, Sports, Beauty
- Sample product listings (8-12 products spread across categories)
- Product detail view with images, description, price, and add-to-cart
- Shopping cart sidebar/drawer with item list, quantities, subtotal
- Checkout flow with Stripe payment integration
- Responsive layout for mobile, tablet, and desktop
- Category filter navigation
- Product search bar

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend: product catalog storage, cart management, order creation, Stripe checkout session
2. Frontend: homepage with hero + featured products, category navigation, product grid, product detail modal, cart drawer, checkout page
3. Stripe component for payment processing

## UX Notes
- Clean, modern design with a neutral/white base and accent color
- Mobile-first responsive grid (1 col mobile, 2 col tablet, 3-4 col desktop)
- Sticky header with cart icon and item count badge
- Smooth cart slide-in animation
- Categories displayed as horizontal scrollable chips on mobile
- Clear call-to-action buttons (Add to Cart, Buy Now)
- Toast notifications on cart add
