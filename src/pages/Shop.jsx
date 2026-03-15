import { useEffect, useMemo, useState } from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import { useCart } from '../context/CartContext';
import { defaultProducts } from '../data/defaultProducts';
import { adminService } from '../services/adminService';
import './Shop.css';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadError, setLoadError] = useState('');
  const { getCartCount } = useCart();

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoadError('');
        const data = await adminService.getProducts();
        if (isMounted) {
          setProducts(data);
        }
      } catch {
        if (isMounted) {
          setProducts(defaultProducts);
          setLoadError('Unable to load live products right now. Showing fallback inventory.');
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => ['All', ...new Set(products.map((product) => product.category))], [products]);

  useEffect(() => {
    if (activeCategory !== 'All' && !categories.includes(activeCategory)) {
      setActiveCategory('All');
    }
  }, [activeCategory, categories]);

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
          {loadError && (
            <div className="no-results" style={{ marginBottom: '2rem' }}>
              <p>{loadError}</p>
            </div>
          )}
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
              <p>Main building next to the BBQ area</p>
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
