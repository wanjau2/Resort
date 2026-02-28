import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    alert('Proceeding to checkout! Total: $' + getCartTotal().toFixed(2));
    // In a real app, this would navigate to a checkout page
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>
            <ShoppingBag size={24} />
            Your Cart
          </h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={64} />
            <h3>Your cart is empty</h3>
            <p>Add some fresh farm products!</p>
            <Link to="/shop" className="btn btn-primary" onClick={onClose}>
              Browse Shop
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div 
                    className="item-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="item-unit">${item.price.toFixed(2)} / {item.unit}</p>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="item-actions">
                    <span className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery</span>
                  <span>{getCartTotal() >= 50 ? 'FREE' : '$5.00'}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>
                    ${(getCartTotal() + (getCartTotal() >= 50 ? 0 : 5)).toFixed(2)}
                  </span>
                </div>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
              <p className="free-delivery-note">
                {getCartTotal() >= 50 
                  ? '✓ You qualify for free delivery!' 
                  : `Add $${(50 - getCartTotal()).toFixed(2)} more for free delivery`
                }
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
