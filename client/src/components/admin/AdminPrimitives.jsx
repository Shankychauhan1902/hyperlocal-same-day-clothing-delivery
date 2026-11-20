import { money } from "../../utils/format.js";

export function OrderTable({ rows }) {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>ORDER</th>
            <th>CUSTOMER</th>
            <th>SHOP</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((o) => (
            <tr key={o.id}>
              <td>
                <b>{o.id}</b>
              </td>
              <td>{o.customer}</td>
              <td>{o.shop}</td>
              <td>{money(o.amount)}</td>
              <td>
                <Status value={o.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function Status({ value }) {
  const cls =
    value === "Active" || value === "Approved" || value === "Paid"
      ? "good"
      : value === "Pending review" || value === "Unpaid" || value === "Packing"
        ? "waiting"
        : value === "Dispatched"
          ? "blue"
          : "neutral";
  return (
    <span className={`status ${cls}`}>
      <i />
      {value}
    </span>
  );
}
