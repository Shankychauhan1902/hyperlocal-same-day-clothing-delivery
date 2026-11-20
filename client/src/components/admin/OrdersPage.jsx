import { Truck } from "lucide-react";

export default function Orders({ orders, setOrders }) {
  const update = (id, values) =>
    setOrders((xs) => xs.map((x) => (x.id === id ? { ...x, ...values } : x)));
  return (
    <section className="admin-card table-card">
      <div className="card-heading">
        <div>
          <h2>Dispatch queue</h2>
          <p>Add courier tracking details and update order progress.</p>
        </div>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>ORDER</th>
              <th>CUSTOMER</th>
              <th>SHOP</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
              <th>TRACKING URL</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>
                  <b>{o.id}</b>
                </td>
                <td>{o.customer}</td>
                <td>{o.shop}</td>
                <td>{money(o.amount)}</td>
                <td>
                  <select
                    value={o.status}
                    onChange={(e) => update(o.id, { status: e.target.value })}
                  >
                    <option>Packing</option>
                    <option>Ready to dispatch</option>
                    <option>Dispatched</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
                <td>
                  <input
                    className="track-input"
                    value={o.tracking}
                    placeholder="Paste courier link"
                    onChange={(e) => update(o.id, { tracking: e.target.value })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="table-note">
        <Truck size={14} /> Courier booking is manual for this pilot; add the
        rider tracking URL here.
      </p>
    </section>
  );
}
