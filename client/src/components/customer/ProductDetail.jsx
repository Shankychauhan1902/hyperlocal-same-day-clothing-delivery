import { ArrowRight, MapPin, X } from "lucide-react";
import { imageUrl, money } from "../../utils/format.js";

export default function ProductDetail({
  product,
  chosen,
  setChosen,
  onClose,
  onAdd,
}) {
  return (
    <div
      className="overlay"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className="detail-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <div className={`detail-photo ${product.color}`}>
          <img src={imageUrl(product.image)} alt={product.name} />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">FROM A NEARBY SHOP</p>
          <h2>{product.name}</h2>
          <p className="detail-shop">
            <MapPin size={13} />
            {product.shop}
          </p>
          <div className="price-row detail-price">
            <b>{money(product.price)}</b>
            {product.old && <del>{money(product.old)}</del>}
          </div>
          <p className="detail-description">{product.detail}</p>
          <p className="fit-note">{product.fit}</p>
          <div className="size-heading">
            <b>Choose your size</b>
            <span>Measurements in inches</span>
          </div>
          <div className="size-choices">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setChosen(s)}
                className={chosen === s ? "picked" : ""}
              >
                {s}
              </button>
            ))}
          </div>
          {chosen && (
            <p className="measure-line">{product.measurements[chosen]}</p>
          )}
          <button disabled={!chosen} className="primary-wide" onClick={onAdd}>
            Add to bag · {money(product.price)} <ArrowRight size={16} />
          </button>
          <p className="detail-policy">
            Exchange eligibility and fees follow the current policy set by the
            platform administrator. Final policy details will appear before you
            place an order.
          </p>
        </div>
      </section>
    </div>
  );
}
