import { useState } from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import { useCart } from '../context/CartContext';
import './Shop.css';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getCartCount } = useCart();

  const categories = ['All', 'Vegetables', 'Fruits', 'Dairy', 'Honey & Preserves', 'Baked Goods'];

  const products = [
    {
      id: 1,
      name: 'Fresh Organic Tomatoes',
      price: 4.99,
      category: 'Vegetables',
      unit: 'lb',
      image: 'https://images.unsplash.com/photo-1546470427-227c7369a9d5?w=400',
      inStock: true
    },
    {
      id: 2,
      name: 'Mixed Salad Greens',
      price: 5.99,
      category: 'Vegetables',
      unit: 'bag',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
      inStock: true
    },
    {
      id: 3,
      name: 'Fresh Picked Apples',
      price: 3.99,
      category: 'Fruits',
      unit: 'lb',
      image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400',
      inStock: true
    },
    {
      id: 4,
      name: 'Organic Strawberries',
      price: 6.99,
      category: 'Fruits',
      unit: 'pint',
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400',
      inStock: true
    },
    {
      id: 5,
      name: 'Farm Fresh Eggs',
      price: 7.99,
      category: 'Dairy',
      unit: 'dozen',
      image: 'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?w=400',
      inStock: true
    },
    {
      id: 6,
      name: 'Artisan Goat Cheese',
      price: 12.99,
      category: 'Dairy',
      unit: 'wheel',
      image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400',
      inStock: true
    },
    {
      id: 7,
      name: 'Raw Wildflower Honey',
      price: 14.99,
      category: 'Honey & Preserves',
      unit: 'jar',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400',
      inStock: true
    },
    {
      id: 8,
      name: 'Strawberry Jam',
      price: 8.99,
      category: 'Honey & Preserves',
      unit: 'jar',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
      inStock: true
    },
    {
      id: 9,
      name: 'Fresh Baked Sourdough',
      price: 7.99,
      category: 'Baked Goods',
      unit: 'loaf',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
      inStock: true
    },
    {
      id: 10,
      name: 'Organic Zucchini',
      price: 2.99,
      category: 'Vegetables',
      unit: 'lb',
      image: 'https://images.unsplash.com/photo-1563252722-6434563a985d?w=400',
      inStock: true
    },
    {
      id: 11,
      name: 'Fresh Blueberries',
      price: 5.99,
      category: 'Fruits',
      unit: 'pint',
      image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400',
      inStock: false
    },
    {
      id: 12,
      name: 'Apple Butter',
      price: 9.99,
      category: 'Honey & Preserves',
      unit: 'jar',
      image: 'https://images.unsplash.com/photo-1600289031464-74d374b64991?w=400',
      inStock: true
    },
    {
      id: 13,
      name: 'Farm Fresh Butter',
      price: 6.99,
      category: 'Dairy',
      unit: 'block',
      image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400',
      inStock: true
    },
    {
      id: 14,
      name: 'Cinnamon Rolls',
      price: 12.99,
      category: 'Baked Goods',
      unit: '4 pack',
      image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400',
      inStock: true
    },
    {
      id: 15,
      name: 'Organic Carrots',
      price: 3.49,
      category: 'Vegetables',
      unit: 'bunch',
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
      inStock: true
    },
    {
      id: 16,
      name: 'Fresh Peaches',
      price: 4.99,
      category: 'Fruits',
      unit: 'lb',
      image: 'https://images.unsplash.com/photo-1629226182927-87e818f06c46?w=400',
      inStock: true
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="shop-page">
      <Hero
        title="Farm Fresh Shop"
        subtitle="Take home the best of our organic farm. Fresh produce, artisan goods, and local products—all grown and made with love."
        backgroundImage="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1920"
        primaryBtn={{ text: 'Shop Now', link: '#products' }}
      />

      <section className="shop-intro">
        <div className="container">
          <div className="intro-banner">
            <div className="banner-content">
              <h2>Fresh From Our Farm to Your Table</h2>
              <p>
                Everything in our shop is grown or made right here at Green Valley. 
                We harvest daily to ensure you get the freshest products possible.
              </p>
            </div>
            <div className="banner-badges">
              <div className="badge">
                <span className="badge-icon">🌱</span>
                <span>100% Organic</span>
              </div>
              <div className="badge">
                <span className="badge-icon">🚜</span>
                <span>Farm Fresh</span>
              </div>
              <div className="badge">
                <span className="badge-icon">🏡</span>
                <span>Locally Made</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="products-section">
        <div className="container">
          <div className="shop-controls">
            <div className="search-box">
              <Search size={20} />
              <input 
                type="text" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-results">
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <section className="shop-info">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <span className="info-icon">🕐</span>
              <h3>Shop Hours</h3>
              <p>Monday - Saturday: 8 AM - 6 PM</p>
              <p>Sunday: 9 AM - 4 PM</p>
            </div>
            <div className="info-card">
              <span className="info-icon">📍</span>
              <h3>Location</h3>
              <p>Main building next to the restaurant</p>
              <p>Free parking available</p>
            </div>
            <div className="info-card">
              <span className="info-icon">🚚</span>
              <h3>Delivery</h3>
              <p>Local delivery available</p>
              <p>Free on orders over $50</p>
            </div>
            <div className="info-card">
              <span className="info-icon">🎁</span>
              <h3>Gift Baskets</h3>
              <p>Custom gift baskets available</p>
              <p>Perfect for any occasion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      <button 
        className="floating-cart-btn"
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingBag size={24} />
        {getCartCount() > 0 && (
          <span className="cart-badge">{getCartCount()}</span>
        )}
      </button>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Shop;
