# Hyperlocal Same-Day Clothing Delivery

A mobile-first marketplace pilot for clothing delivery around Khora Colony. This work lives in its own Desktop folder, separate from your other project.

## What is in this first build
- Customer storefront with category and size filters, search, product detail and measurements, bag quantity controls, and a checkout preview.
- Admin preview at `/admin` with dashboard, shop controls, catalog moderation, dispatch tracking, settlements, and an editable Exchange Policy menu page.
- Express API shell with health, pincode lookup, and approved in-stock product catalog endpoints.
- MySQL schema for shops, products and sizes, orders, payment events, order history, exchanges, and settlements.
- Product requirements and implementation phases in [the project brief](docs/PROJECT_BRIEF.md).
- Code map and debugging guide in [ARCHITECTURE.md](docs/ARCHITECTURE.md).
- Bootstrap + SCSS tokens and reusable class guide in [STYLING.md](docs/STYLING.md).

## Important prototype limits
- The storefront and admin preview use illustrative data and local preview state. They are not yet connected to the API or a real inventory database.
- Checkout is a preview only. It does not create an order or collect money.
- Khora Colony is the pilot area, but exact serviceable pincodes still need to be supplied and configured.
- Exchange Policy belongs in the Super Admin app menu. It will be configurable there, then shown to customers before they request an exchange.
- No production payment, image-storage, delivery, or authentication credentials are present.

## Planned stack
- Client: React + Vite, mobile-first responsive storefront and later installable shopkeeper PWA
- Styling: Bootstrap 5 + SCSS, shared theme tokens and reusable `nw-*` classes
- API: Node.js + Express REST API
- Database: MySQL 8
- Media / payments: planned after provider and account setup

The original idea is in `Full-Stack Technical Architecture & System Blueprint.pdf`.
