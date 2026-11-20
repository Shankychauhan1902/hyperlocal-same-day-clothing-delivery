import { useState } from "react";
import {
  Activity,
  Bell,
  Box,
  Check,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Store,
  Truck,
  WalletCards,
} from "lucide-react";
import {
  initialPolicy,
  orderSeed,
  productSeed,
  settlementSeed,
  shopSeed,
} from "./data/adminSeed.js";
import OverviewPage from "./components/admin/OverviewPage.jsx";
import ShopsPage from "./components/admin/ShopsPage.jsx";
import CatalogPage from "./components/admin/CatalogPage.jsx";
import OrdersPage from "./components/admin/OrdersPage.jsx";
import ExchangePolicyPage from "./components/admin/ExchangePolicyPage.jsx";
import SettlementsPage from "./components/admin/SettlementsPage.jsx";

const menu = [
  ["overview", "Overview", LayoutDashboard, "WORKSPACE"],
  ["shops", "Shops", Store],
  ["catalog", "Catalog review", Box, "", "3"],
  ["orders", "Orders & dispatch", Truck, "", "2"],
  ["exchange", "Exchange policy", ShieldCheck, "POLICIES"],
  ["settlements", "Settlements", WalletCards],
  ["settings", "Settings", Settings, "PLATFORM"],
];

export default function AdminApp() {
  const [page, setPage] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [shops, setShops] = useState(shopSeed);
  const [products, setProducts] = useState(productSeed);
  const [orders, setOrders] = useState(orderSeed);
  const [settlements, setSettlements] = useState(settlementSeed);
  const [policy, setPolicy] = useState(() => {
    try {
      return {
        ...initialPolicy,
        ...JSON.parse(localStorage.getItem("nearwear-exchange-policy") || "{}"),
      };
    } catch {
      return initialPolicy;
    }
  });
  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState("");
  const title = menu.find((item) => item[0] === page)?.[1] || "Overview";

  function savePolicy(event) {
    event.preventDefault();
    localStorage.setItem("nearwear-exchange-policy", JSON.stringify(policy));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }
  function updateProduct(id, status) {
    setProducts((current) =>
      current.map((product) =>
        product.id === id ? { ...product, status } : product,
      ),
    );
    setNotice(`Listing ${status.toLowerCase()}.`);
    setTimeout(() => setNotice(""), 2500);
  }
  function markSettlementPaid(id) {
    setSettlements((current) =>
      current.map((row) => (row.id === id ? { ...row, status: "Paid" } : row)),
    );
  }

  return (
    <div className={`admin-shell ${collapsed ? "is-collapsed" : ""}`}>
      <aside className="admin-side">
        <a href="/admin" className="admin-logo">
          <i>n.</i>
          <span>
            nearwear<small>ADMIN CONSOLE</small>
          </span>
        </a>
        <div className="admin-area">
          <b />
          Khora Colony pilot
          <ChevronRight size={14} />
        </div>
        <nav aria-label="Admin menu">
          {menu.map(([id, label, Icon, section, badge]) => (
            <div key={id}>
              {section && <p className="nav-section">{section}</p>}
              <button
                className={`admin-nav ${page === id ? "selected" : ""}`}
                onClick={() => setPage(id)}
                title={collapsed ? label : undefined}
              >
                <Icon size={17} />
                <span>{label}</span>
                {badge && <b className="nav-badge">{badge}</b>}
              </button>
            </div>
          ))}
        </nav>
        <div className="admin-side-bottom">
          <div className="admin-profile">
            <i>AD</i>
            <span>
              <b>Platform admin</b>
              <small>Super administrator</small>
            </span>
            <LogOut size={14} />
          </div>
          <a href="/">
            ↗ <span>View customer storefront</span>
          </a>
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-bar">
          <button
            onClick={() => setCollapsed((value) => !value)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <div>
            Admin <ChevronRight size={13} />
            <b>{title}</b>
          </div>
          <span className="mode-pill">
            <i /> PREVIEW MODE
          </span>
          <Bell size={17} />
          <i className="bar-avatar">AD</i>
        </header>
        <div className="admin-content">
          <div className="admin-title">
            <div>
              <small>NEARWEAR · KHORA COLONY</small>
              <h1>{title}</h1>
              <p>
                {page === "exchange"
                  ? "Set the exchange rules customers see before they submit a request."
                  : page === "overview"
                    ? "A quick look at today’s local marketplace."
                    : `Manage ${title.toLowerCase()} for the Khora Colony pilot.`}
              </p>
            </div>
            <span className="pilot-chip">
              <Activity size={14} /> Pilot workspace
            </span>
          </div>
          {page === "overview" && (
            <OverviewPage
              shops={shops}
              products={products}
              orders={orders}
              go={setPage}
            />
          )}
          {page === "shops" && <ShopsPage shops={shops} setShops={setShops} />}
          {page === "catalog" && (
            <CatalogPage products={products} action={updateProduct} />
          )}
          {page === "orders" && (
            <OrdersPage orders={orders} setOrders={setOrders} />
          )}
          {page === "exchange" && (
            <ExchangePolicyPage
              policy={policy}
              setPolicy={setPolicy}
              save={savePolicy}
              saved={saved}
            />
          )}
          {page === "settlements" && (
            <SettlementsPage rows={settlements} pay={markSettlementPaid} />
          )}
          {page === "settings" && (
            <div className="admin-card placeholder">
              <Settings />
              <h2>Platform settings</h2>
              <p>
                Service areas, commissions, and account access will be
                configured here as the API and admin permissions are connected.
              </p>
            </div>
          )}
        </div>
      </main>
      {notice && (
        <div className="admin-notice">
          <Check size={15} />
          {notice}
        </div>
      )}
    </div>
  );
}
