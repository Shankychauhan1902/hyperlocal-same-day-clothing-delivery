import { WalletCards } from "lucide-react";
import { money } from "../../utils/format.js";
import { Status } from "./AdminPrimitives.jsx";

export default function Settlements({ rows, pay }) {
  return (
    <section className="admin-card table-card">
      <div className="card-heading">
        <div>
          <h2>Shop payouts</h2>
          <p>Delivered orders and partner shop earnings.</p>
        </div>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>SETTLEMENT</th>
              <th>SHOP</th>
              <th>ORDER</th>
              <th>GROSS</th>
              <th>COMMISSION</th>
              <th>SHOP NET</th>
              <th>STATUS</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id}>
                <td>
                  <b>{s.id}</b>
                </td>
                <td>{s.shop}</td>
                <td>{s.order}</td>
                <td>{money(s.gross)}</td>
                <td>{money(s.commission)}</td>
                <td>
                  <b>{money(s.net)}</b>
                </td>
                <td>
                  <Status value={s.status} />
                </td>
                <td>
                  {s.status === "Unpaid" && (
                    <button className="row-button" onClick={() => pay(s.id)}>
                      Mark paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="table-note">
        <WalletCards size={14} /> Sample payout rows; live settlement records
        will come from the API.
      </p>
    </section>
  );
}
