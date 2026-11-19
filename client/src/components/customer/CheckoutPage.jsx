import { ArrowLeft, ArrowRight, Check, MapPin, ShieldCheck } from 'lucide-react';
import { imageUrl, money } from '../../utils/format.js';

export default function CheckoutPage({
  cart,
  subtotal,
  deliveryFee,
  total,
  paymentMode,
  setPaymentMode,
  form,
  setForm,
  message,
  onSubmit,
  onBack,
  preview,
}) {
  const codAdvance = 99;
  const update = (field, value) =>
    setForm((current) => ({ ...current, [field]: value }));
  if (preview)
    return (
      <main className="checkout-page">
        <header className="checkout-head">
          <button onClick={onBack}>
            <ArrowLeft size={17} /> Back to shopping
          </button>
          <a className="brand" href="#">
            <span className="brand-mark">n.</span>
            <span>nearwear</span>
          </a>
          <span className="checkout-secure">
            <ShieldCheck size={15} /> Secure checkout
          </span>
        </header>
        <section className="preview-card">
          <span className="preview-icon">
            <Check size={24} />
          </span>
          <p className="eyebrow">CHECKOUT PREVIEW</p>
          <h1>
            Your order details
            <br />
            <em>are ready.</em>
          </h1>
          <p>
            This prototype has saved no order and charged no payment. The live
            order and payment connection will be added after the launch pincode
            and payment setup are confirmed.
          </p>
          <div className="preview-order">
            <div>
              <span>Delivering to</span>
              <b>
                {form.name} · {form.phone}
              </b>
              <small>
                {form.address}, {form.pincode}
              </small>
            </div>
            <div>
              <span>Payment choice</span>
              <b>
                {paymentMode === "cod" ? "Cash on delivery" : "Prepaid UPI"}
              </b>
              <small>
                {paymentMode === "cod"
                  ? `₹99 advance, then ${money(total - codAdvance)} at delivery`
                  : "Payment provider connection pending"}
              </small>
            </div>
            <div>
              <span>Order total</span>
              <b>{money(total)}</b>
              <small>Includes ₹{deliveryFee} delivery fee</small>
            </div>
          </div>
          <button className="primary-wide preview-back" onClick={onBack}>
            Back to shopping
          </button>
        </section>
      </main>
    );
  return (
    <main className="checkout-page">
      <header className="checkout-head">
        <button onClick={onBack}>
          <ArrowLeft size={17} /> Back to shopping
        </button>
        <a className="brand" href="#">
          <span className="brand-mark">n.</span>
          <span>nearwear</span>
        </a>
        <span className="checkout-secure">
          <ShieldCheck size={15} /> Secure checkout
        </span>
      </header>
      <div className="checkout-layout">
        <section className="checkout-form-wrap">
          <p className="eyebrow">ALMOST YOURS</p>
          <h1>
            Delivery <em>details.</em>
          </h1>
          <p className="checkout-intro">
            Tell us where to bring your local finds. We’re piloting in Khora
            Colony.
          </p>
          <form onSubmit={onSubmit}>
            <label>
              Your name
              <input
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Full name"
              />
            </label>
            <label>
              Mobile number
              <input
                required
                inputMode="numeric"
                maxLength="10"
                value={form.phone}
                onChange={(e) =>
                  update(
                    "phone",
                    e.target.value.replace(/\D/g, "").slice(0, 10),
                  )
                }
                placeholder="10-digit number"
              />
            </label>
            <label>
              Delivery address
              <textarea
                required
                rows="3"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="House / flat, street, landmark"
              />
            </label>
            <label>
              Pincode
              <input
                required
                inputMode="numeric"
                maxLength="6"
                value={form.pincode}
                onChange={(e) =>
                  update(
                    "pincode",
                    e.target.value.replace(/\D/g, "").slice(0, 6),
                  )
                }
                placeholder="6-digit pincode"
              />
            </label>
            <div className="payment-options">
              <b>Payment method</b>
              <label
                className={`payment-option ${paymentMode === "prepaid_upi" ? "chosen" : ""}`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMode === "prepaid_upi"}
                  onChange={() => setPaymentMode("prepaid_upi")}
                />
                <span>
                  <strong>Prepaid UPI</strong>
                  <small>Pay online when payment is connected</small>
                </span>
              </label>
              <label
                className={`payment-option ${paymentMode === "cod" ? "chosen" : ""}`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMode === "cod"}
                  onChange={() => setPaymentMode("cod")}
                />
                <span>
                  <strong>Cash on delivery</strong>
                  <small>
                    ₹99 advance, remaining {money(total - codAdvance)} at the
                    door
                  </small>
                </span>
              </label>
            </div>
            {message && <p className="form-message">{message}</p>}
            <button className="primary-wide" type="submit">
              Review order · {money(total)} <ArrowRight size={16} />
            </button>
            <p className="checkout-disclaimer">
              This is a preview only. No order will be submitted and no payment
              will be collected.
            </p>
          </form>
        </section>
        <aside className="checkout-summary">
          <p className="eyebrow">YOUR BAG</p>
          <h2>Order summary</h2>
          {cart.map((item) => (
            <div
              className="summary-item"
              key={`${item.product.id}-${item.size}`}
            >
              <img src={imageUrl(item.product.image)} alt="" />
              <div>
                <b>{item.product.name}</b>
                <small>
                  Size {item.size} · Qty {item.quantity}
                </small>
              </div>
              <strong>{money(item.product.price * item.quantity)}</strong>
            </div>
          ))}
          <div className="summary-rule" />
          <div className="summary-line">
            <span>Subtotal</span>
            <b>{money(subtotal)}</b>
          </div>
          <div className="summary-line">
            <span>Delivery</span>
            <b>{money(deliveryFee)}</b>
          </div>
          <div className="summary-line summary-total">
            <span>Total</span>
            <b>{money(total)}</b>
          </div>
          <p className="summary-area">
            <MapPin size={14} /> Khora Colony pilot · pincode confirmation
            pending
          </p>
        </aside>
      </div>
    </main>
  );
}

