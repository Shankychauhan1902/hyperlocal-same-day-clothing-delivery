# Hyperlocal Same-Day Clothing Delivery

## Product brief and build plan

### Product idea
A mobile-first marketplace that helps customers discover clothing available in nearby partner shops and receive it the same day. Shopkeepers manage stock and orders from an Android phone. A platform administrator approves shops and listings, coordinates dispatch, and reconciles shop payouts.

### People and interfaces
- **Customer storefront (`/`)**: check delivery serviceability by pincode, browse approved in-stock clothing, inspect real photos and measurements, place and track an order, and request an eligible size exchange.
- **Shopkeeper PWA (`/shop`)**: sign in securely from a phone, update size availability, review incoming orders, pack or cancel with a reason, upload stock photos, and see payout totals.
- **Admin console (`/admin`)**: approve shops and product listings, manage service areas and commission settings, dispatch orders, review exchanges, and record settlements.

### MVP business rules from the blueprint
- The pilot launch area is Khora Colony. Exact serviceable pincodes and the delivery radius still need confirmation.
- Delivery fee: ₹49; minimum basket: ₹799.
- Shop commission is configured per shop, initially within the proposed 15–20% range.
- Checkout supports prepaid UPI and COD with a clearly disclosed ₹99 advance.
- The MVP records courier tracking links manually; courier API integration can follow later.
- Listings remain hidden until an admin approves them.
- The initial implementation assumes each order belongs to one shop, matching the proposed `orders.shop_id` model. Cross-shop carts would need split orders and separate delivery/settlement rules.
- Exchange rules are owned by the super admin through an “Exchange Policy” item in the admin app menu. The configurable policy should cover eligible categories, condition requirements, the request window, and logistics fee, and customers must see the active policy before submitting a request. The proposed two-hour window starts at delivery confirmation unless the super admin changes it.

### Core order journey
1. Customer enters a pincode; the service returns availability, delivery fee, and minimum basket.
2. Customer browses approved products and current size availability.
3. Checkout validates the basket and address, then creates a pending order while atomically reserving the selected size quantities.
4. The shop confirms stock and packs the order. Cancellation releases the reserved stock.
5. Admin assigns dispatch details and records the tracking URL.
6. Delivery is confirmed; the exchange window opens where eligible.
7. Delivered orders enter the settlement ledger; admin records payout and the shop sees the net amount.

### Important safeguards
- Store PINs as salted hashes, rate-limit login attempts, and use revocable sessions. A four-digit PIN alone must not produce an effectively permanent token.
- Check roles and ownership on every protected operation; shop staff can access only their own shop's products, orders, and ledger.
- Use database transactions and row-level locking for stock reservation and order creation. Record payment events idempotently and verify provider signatures before treating a payment as successful.
- Keep payment secrets, signing keys, and private media settings outside source control. Never log card, UPI, PIN, or authentication secrets.
- Record order status changes and settlement actions in an auditable history.
- Validate and moderate uploaded photos and product claims before publication.

### Proposed system shape
A React + Vite client with role-based routes, a Node.js + Express JSON API, and MySQL 8. The API owns authorization, pricing, serviceability, inventory transactions, order transitions, payment verification, exchange eligibility, and settlement calculations. The client must not be trusted to calculate totals or decide stock availability.

### Initial data areas
Users and sessions; shops; serviceable pincodes; products and product sizes; orders and line items; payment attempts/events; delivery and status history; exchange requests; commission and settlement records; admin moderation actions.

### Decisions to confirm before live integrations
1. Confirm the exact Khora Colony serviceable pincodes and delivery radius.
2. Whether multi-shop carts are excluded from the MVP (recommended: yes).
3. Which payment provider account and exact COD advance/refund behavior.
4. The exchange policy: eligible categories, condition requirements, fee, and operational cut-off.
5. Whether shops can have multiple staff accounts and who can approve payouts.
6. Hosting, domain, image storage account, and who holds production credentials.
7. Local tax, consumer-return, privacy, and payment requirements for the launch jurisdiction.

### Build phases
1. **Customer shopping first** — product discovery, category and size filters, product details and measurements, bag, address capture, and checkout preview for Khora Colony.
2. **Catalog backend** — pincode serviceability, shop onboarding, approved catalog data, live size stock, and customer identity.
3. **Ordering and inventory** — cart, server-side pricing, transactional stock reservation, order lifecycle, cancellation, and customer tracking.
4. **Payments and dispatch** — prepaid UPI and COD advance, payment webhook handling, manual courier tracking, customer notifications.
5. **Admin operations** — super admin menu and editable exchange policy, exchange queue, commission ledger, payout records and exports.
6. **Hardening and launch** — accessibility, mobile/PWA behavior, audit logs, backups, monitoring, security review, and deployment runbook.

### Scope boundary for the first release
The first release should prove the local operating loop with a small set of shops and one service area. Courier API automation, multi-shop checkout, automated payouts, recommendations, and native mobile apps can wait until the manual workflow is validated.

