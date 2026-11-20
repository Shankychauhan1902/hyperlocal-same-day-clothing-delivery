import { ArrowRight, ShoppingBag, X } from "lucide-react";
import { imageUrl, money } from "../../utils/format.js";

export default function CartDrawer({
  cart,
  subtotal,
  deliveryFee,
  total,
  canCheckout,
  onClose,
  onChange,
  onCheckout,
}) {
  return (
    <div
      className="overlay drawer-overlay"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        <div className="drawer-head">
          <div>
            <p className="eyebrow">YOUR LOCAL FINDS</p>
            <h2>
              Your bag{" "}
              <span>({cart.reduce((n, item) => n + item.quantity, 0)})</span>
            </h2>
          </div>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close bag"
          >
            <X size={18} />
          </button>
        </div>
        {!cart.length ? (
          <div className="empty-bag">
            <ShoppingBag size={30} />
            <b>Your bag is waiting</b>
            <span>Choose a size to add a piece from a nearby shop.</span>
            <button className="primary-wide" onClick={onClose}>
              Keep browsing <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <>
            <div className="bag-items">
              {cart.map((item) => (
                <div
                  className="bag-item"
                  key={`${item.product.id}-${item.size}`}
                >
                  <img src={imageUrl(item.product.image)} alt="" />
                  <div className="bag-item-copy">
                    <b>{item.product.name}</b>
                    <small>
                      Size {item.size} · {item.product.shop.split(" · ")[0]}
                    </small>
                    <strong>{money(item.product.price)}</strong>
                    <div className="quantity">
                      <button
                        onClick={() => onChange(item.product.id, item.size, -1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => onChange(item.product.id, item.size, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bag-summary">
              <div>
                <span>Subtotal</span>
                <b>{money(subtotal)}</b>
              </div>
              <div>
                <span>Delivery</span>
                <b>{money(deliveryFee)}</b>
              </div>
              <div className="bag-total">
                <span>Total</span>
                <b>{money(total)}</b>
              </div>
              {!canCheckout && (
                <p className="minimum-note">
                  Add {money(799 - subtotal)} more to meet the ₹799 minimum
                  order.
                </p>
              )}
              <button
                className="primary-wide"
                disabled={!canCheckout}
                onClick={onCheckout}
              >
                Continue to checkout <ArrowRight size={16} />
              </button>
              <small>
                Delivery service for Khora Colony is confirmed at checkout.
              </small>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
