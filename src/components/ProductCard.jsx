import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ id, name, price, image, category, unit, inStock = true }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!inStock) return;
    
    addToCart({ id, name, price, image, category, unit });
    setAdded(true);
    
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <div className={`product-card ${!inStock ? 'out-of-stock' : ''}`}>
      <div className="product-badge">{category}</div>
      <div 
        className="product-image" 
        style={{ backgroundImage: `url(${image})` }}
      >
        {!inStock && <div className="stock-overlay">Out of Stock</div>}
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <div className="product-price">
          <span className="price">${price.toFixed(2)}</span>
          <span className="unit">/ {unit}</span>
        </div>
        <button 
          className={`add-to-cart ${added ? 'added' : ''}`}
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          {added ? (
            <>
              <Check size={18} />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
