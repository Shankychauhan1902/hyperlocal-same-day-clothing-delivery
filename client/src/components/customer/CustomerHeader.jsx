import { Search, ShoppingBag } from "lucide-react";

export default function CustomerHeader({ bagCount, onOpenBag }) {
  return (
    <>
      <div className="announcement">
        LOCAL FINDS, AT YOUR DOOR TODAY <span>·</span> KHORA COLONY PILOT
      </div>
      <header className="nav">
        <a className="brand" href="#top">
          <span className="brand-mark">n.</span>
          <span>nearwear</span>
        </a>
        <nav>
          <a className="active" href="#shop">
            Shop
          </a>
          <a href="#how">How it works</a>
          <a href="#shops">Our shops</a>
        </nav>
        <div className="nav-actions">
          <button
            className="icon-btn"
            aria-label="Search"
            onClick={() => document.getElementById("search")?.focus()}
          >
            <Search size={19} />
          </button>
          <button className="bag-btn" onClick={onOpenBag}>
            <ShoppingBag size={18} />
            <span>Bag</span>
            <b>{bagCount}</b>
          </button>
        </div>
      </header>
    </>
  );
}
