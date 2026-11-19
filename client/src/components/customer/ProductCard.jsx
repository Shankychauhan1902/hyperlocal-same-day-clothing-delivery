import { Heart, MapPin } from 'lucide-react';
import { money } from '../../utils/format.js';

export default function ProductCard({ product, onSelect }) {
  return (
    <article className="product">
      <button className={`product-image ${product.color}`} onClick={onSelect} aria-label={`View ${product.name}`}>
        <img src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=900&q=85`} alt={product.name} />
        <span className="product-tag">{product.tag}</span>
        <span className="heart"><Heart size={17} /></span>
      </button>
      <div className="product-info">
        <div className="product-title-row">
          <button className="product-name" onClick={onSelect}>{product.name}</button>
          <button onClick={onSelect} className="quick-add" aria-label={`Choose size for ${product.name}`}>+</button>
        </div>
        <p className="shop-name"><MapPin size={12} />{product.shop}</p>
        <div className="price-row"><b>{money(product.price)}</b>{product.old && <del>{money(product.old)}</del>}</div>
        <div className="sizes">{product.sizes.map(size => <span key={size}>{size}</span>)}</div>
      </div>
    </article>
  );
}
