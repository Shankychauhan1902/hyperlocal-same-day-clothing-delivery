import { Check, Clock3, ShieldCheck, Truck } from "lucide-react";
import { money } from "../../utils/format.js";

export default function Exchange({ policy, setPolicy, save, saved }) {
  const choices = [
    "Shirts",
    "Trousers",
    "Dresses",
    "Ethnic wear",
    "Basics",
    "Accessories",
    "Undergarments",
  ];
  const toggle = (c) =>
    setPolicy((p) => ({
      ...p,
      categories: p.categories.includes(c)
        ? p.categories.filter((x) => x !== c)
        : [...p.categories, c],
    }));
  return (
    <form className="exchange-grid" onSubmit={save}>
      <section className="admin-card policy-form">
        <div className="policy-heading">
          <span>
            <ShieldCheck size={19} />
          </span>
          <div>
            <h2>Customer exchange rules</h2>
            <p>Changes apply to new requests after you save.</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={policy.enabled}
              onChange={(e) =>
                setPolicy({ ...policy, enabled: e.target.checked })
              }
            />
            <i />
          </label>
        </div>
        <div className="policy-row">
          <div>
            <b>Request window</b>
            <small>Time allowed after delivery is confirmed.</small>
          </div>
          <label className="number-field">
            <input
              type="number"
              min="1"
              max="72"
              value={policy.hours}
              disabled={!policy.enabled}
              onChange={(e) =>
                setPolicy({ ...policy, hours: Number(e.target.value) })
              }
            />{" "}
            hours
          </label>
        </div>
        <div className="policy-row">
          <div>
            <b>Exchange delivery fee</b>
            <small>Fee charged for exchange pickup and drop.</small>
          </div>
          <label className="number-field">
            ₹{" "}
            <input
              type="number"
              min="0"
              value={policy.fee}
              disabled={!policy.enabled}
              onChange={(e) =>
                setPolicy({ ...policy, fee: Number(e.target.value) })
              }
            />
          </label>
        </div>
        <div className="policy-block">
          <b>Eligible categories</b>
          <small>Choose which categories customers may exchange.</small>
          <div className="category-options">
            {choices.map((c) => (
              <label
                className={policy.categories.includes(c) ? "checked" : ""}
                key={c}
              >
                <input
                  type="checkbox"
                  disabled={!policy.enabled}
                  checked={policy.categories.includes(c)}
                  onChange={() => toggle(c)}
                />
                {policy.categories.includes(c) ? <Check size={12} /> : <i />}
                {c}
              </label>
            ))}
          </div>
        </div>
        <label className="policy-block">
          <b>Condition requirements</b>
          <small>Explain what state an item must be in.</small>
          <textarea
            rows="4"
            disabled={!policy.enabled}
            value={policy.condition}
            onChange={(e) =>
              setPolicy({ ...policy, condition: e.target.value })
            }
          />
        </label>
        <div className="policy-footer">
          <span>
            <ShieldCheck size={14} /> Customers see this before they request an
            exchange.
          </span>
          <button className="solid-button" type="submit">
            {saved ? (
              <>
                <Check size={14} /> Saved
              </>
            ) : (
              "Save policy"
            )}
          </button>
        </div>
      </section>
      <aside className="admin-card customer-policy">
        <small>CUSTOMER PREVIEW</small>
        <h3>Exchange policy</h3>
        {policy.enabled ? (
          <>
            <p>
              <Clock3 size={14} /> Request within <b>{policy.hours} hours</b> of
              delivery
            </p>
            <p>
              <Truck size={14} /> Exchange fee <b>{money(policy.fee)}</b>
            </p>
            <hr />
            <b>Eligible categories</b>
            <div className="preview-categories">
              {policy.categories.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            <hr />
            <b>Item condition</b>
            <p className="condition-copy">
              {policy.condition || "No conditions have been set."}
            </p>
          </>
        ) : (
          <div className="paused-policy">
            <ShieldCheck />
            <b>Exchanges are paused</b>
            <small>Customers cannot submit new exchange requests.</small>
          </div>
        )}
        <footer>
          <ShieldCheck size={13} /> Preview updates as you edit
        </footer>
      </aside>
    </form>
  );
}
