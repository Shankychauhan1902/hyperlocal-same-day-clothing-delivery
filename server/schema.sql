CREATE DATABASE IF NOT EXISTS nearwear CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE nearwear;

CREATE TABLE users (
  user_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(254) NULL UNIQUE,
  password_hash VARCHAR(255) NULL,
  role ENUM('customer','shop_admin','super_admin') NOT NULL DEFAULT 'customer',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE shops (
  shop_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  owner_id BIGINT UNSIGNED NOT NULL,
  shop_name VARCHAR(160) NOT NULL,
  pickup_address VARCHAR(500) NOT NULL,
  pincode CHAR(6) NOT NULL,
  commission_pct DECIMAL(5,2) NOT NULL DEFAULT 15.00,
  is_open BOOLEAN NOT NULL DEFAULT FALSE,
  is_approved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_shops_owner FOREIGN KEY (owner_id) REFERENCES users(user_id),
  CONSTRAINT chk_shop_commission CHECK (commission_pct BETWEEN 0 AND 100),
  INDEX idx_shop_zone (pincode, is_approved, is_open)
);
CREATE TABLE serviceable_pincodes (
  pincode CHAR(6) PRIMARY KEY,
  area_name VARCHAR(160) NOT NULL,
  delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 49.00,
  min_order_amount DECIMAL(10,2) NOT NULL DEFAULT 799.00,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE products (
  product_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  shop_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(180) NOT NULL,
  category VARCHAR(80) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  color VARCHAR(60) NULL,
  fit_notes TEXT NULL,
  image_url VARCHAR(1000) NOT NULL,
  is_returnable BOOLEAN NOT NULL DEFAULT TRUE,
  approval_status ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_products_shop FOREIGN KEY (shop_id) REFERENCES shops(shop_id),
  CONSTRAINT chk_product_price CHECK (price >= 0),
  INDEX idx_product_catalog (approval_status, category, shop_id)
);
CREATE TABLE product_sizes (
  size_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id BIGINT UNSIGNED NOT NULL,
  size_label VARCHAR(20) NOT NULL,
  measurement_inches JSON NULL,
  stock_qty INT UNSIGNED NOT NULL DEFAULT 0,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  CONSTRAINT fk_sizes_product FOREIGN KEY (product_id) REFERENCES products(product_id),
  CONSTRAINT uq_product_size UNIQUE (product_id, size_label)
);
CREATE TABLE orders (
  order_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(24) NOT NULL UNIQUE,
  user_id BIGINT UNSIGNED NOT NULL,
  shop_id BIGINT UNSIGNED NOT NULL,
  delivery_address VARCHAR(700) NOT NULL,
  pincode CHAR(6) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_mode ENUM('prepaid_upi','cod') NOT NULL,
  advance_due DECIMAL(10,2) NOT NULL DEFAULT 0,
  advance_paid DECIMAL(10,2) NOT NULL DEFAULT 0,
  balance_due DECIMAL(10,2) NOT NULL DEFAULT 0,
  order_status ENUM('pending_payment','placed','stock_confirmed','packing','dispatched','delivered','cancelled') NOT NULL DEFAULT 'pending_payment',
  borzo_tracking_url VARCHAR(1000) NULL,
  delivered_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT fk_orders_shop FOREIGN KEY (shop_id) REFERENCES shops(shop_id),
  INDEX idx_shop_order_queue (shop_id, order_status, created_at),
  INDEX idx_customer_orders (user_id, created_at)
);
CREATE TABLE order_items (
  item_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  size_id BIGINT UNSIGNED NOT NULL,
  quantity SMALLINT UNSIGNED NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_items_order FOREIGN KEY (order_id) REFERENCES orders(order_id),
  CONSTRAINT fk_items_product FOREIGN KEY (product_id) REFERENCES products(product_id),
  CONSTRAINT fk_items_size FOREIGN KEY (size_id) REFERENCES product_sizes(size_id),
  CONSTRAINT chk_item_qty CHECK (quantity > 0)
);
CREATE TABLE payment_events (
  payment_event_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT UNSIGNED NOT NULL,
  provider VARCHAR(40) NOT NULL,
  provider_event_id VARCHAR(180) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  event_status ENUM('created','authorized','captured','failed','refunded') NOT NULL,
  received_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_payment_order FOREIGN KEY (order_id) REFERENCES orders(order_id),
  CONSTRAINT uq_provider_event UNIQUE (provider, provider_event_id)
);
CREATE TABLE order_status_history (
  history_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT UNSIGNED NOT NULL,
  actor_user_id BIGINT UNSIGNED NULL,
  from_status VARCHAR(32) NULL,
  to_status VARCHAR(32) NOT NULL,
  note VARCHAR(500) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_history_order FOREIGN KEY (order_id) REFERENCES orders(order_id),
  CONSTRAINT fk_history_actor FOREIGN KEY (actor_user_id) REFERENCES users(user_id)
);
CREATE TABLE exchanges (
  exchange_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT UNSIGNED NOT NULL,
  reason VARCHAR(500) NOT NULL,
  requested_size VARCHAR(20) NOT NULL,
  logistics_fee DECIMAL(10,2) NOT NULL DEFAULT 49.00,
  status ENUM('requested','approved','rejected','in_progress','completed','cancelled') NOT NULL DEFAULT 'requested',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_exchange_order FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
CREATE TABLE settlements (
  settlement_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT UNSIGNED NOT NULL,
  shop_id BIGINT UNSIGNED NOT NULL,
  gross_amount DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  net_shop_payout DECIMAL(10,2) NOT NULL,
  payout_status ENUM('unpaid','paid') NOT NULL DEFAULT 'unpaid',
  settled_at DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_settlement_order FOREIGN KEY (order_id) REFERENCES orders(order_id),
  CONSTRAINT fk_settlement_shop FOREIGN KEY (shop_id) REFERENCES shops(shop_id),
  CONSTRAINT uq_settlement_order UNIQUE (order_id)
);
