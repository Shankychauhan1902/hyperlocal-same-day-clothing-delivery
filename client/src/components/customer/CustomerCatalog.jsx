import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard.jsx";

const sizeOptions = ["S", "M", "L", "XL", "30", "32", "34", "36"];

export default function CustomerCatalog({
  products,
  categories,
  category,
  onCategoryChange,
  query,
  onQueryChange,
  size,
  onSizeChange,
  onProductSelect,
}) {
  return (
    <section className="shop-section" id="shop">
      <div className="section-heading">
        <div>
          <p className="eyebrow">A LITTLE CLOSER TO HOME</p>
          <h2>
            Good things, <em>near you.</em>
          </h2>
        </div>
        <a className="text-link" href="#shops">
          Meet the local shops <ArrowRight size={16} />
        </a>
      </div>
      <div className="toolbar">
        <div className="categories">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "selected" : ""}
              onClick={() => onCategoryChange(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="filters">
          <label className="search-field">
            <Search size={16} />
            <input
              id="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search pieces"
            />
          </label>
          <label className="size-filter">
            <SlidersHorizontal size={15} />
            <select
              value={size}
              onChange={(event) => onSizeChange(event.target.value)}
              aria-label="Filter by size"
            >
              <option>Any size</option>
              {sizeOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={() => onProductSelect(product)}
          />
        ))}
      </div>
      {products.length === 0 && (
        <div className="empty">
          No pieces match those filters. Try another category or size.
        </div>
      )}
      <div className="shop-note" id="shops">
        <span className="shop-note-mark">n.</span>
        <p>
          <b>Your neighbourhood has good taste.</b>
          <small>Every order supports independent shops close to home.</small>
        </p>
        <a href="#top">
          Explore the edit <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}
