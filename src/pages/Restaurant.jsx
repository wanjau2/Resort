import { Link } from 'react-router-dom';
import { Clock, UtensilsCrossed, Leaf, Wine, Star, Calendar } from 'lucide-react';
import Hero from '../components/Hero';
import './Restaurant.css';

const Restaurant = () => {
  const menuCategories = [
    {
      name: 'Breakfast',
      time: '7:00 AM - 10:30 AM',
      items: [
        { name: 'Farm Fresh Eggs Benedict', price: 16, description: 'Free-range eggs, house-made hollandaise, fresh herbs' },
        { name: 'Organic Pancake Stack', price: 14, description: 'Buttermilk pancakes, maple syrup, seasonal berries' },
        { name: 'Garden Vegetable Frittata', price: 15, description: 'Farm vegetables, goat cheese, fresh salad' },
        { name: 'Granola Bowl', price: 12, description: 'House-made granola, yogurt, honey, fresh fruits' }
      ]
    },
    {
      name: 'Lunch',
      time: '11:30 AM - 3:00 PM',
      items: [
        { name: 'Farm Salad', price: 16, description: 'Mixed greens, seasonal vegetables, herb vinaigrette' },
        { name: 'Grilled Vegetable Sandwich', price: 18, description: 'Roasted vegetables, pesto, artisan bread' },
        { name: 'Herb-Crusted Chicken', price: 22, description: 'Free-range chicken, roasted potatoes, seasonal vegetables' },
        { name: 'Mushroom Risotto', price: 20, description: 'Wild mushrooms, parmesan, truffle oil' }
      ]
    },
    {
      name: 'Dinner',
      time: '5:30 PM - 9:30 PM',
      items: [
        { name: 'Pan-Seared Trout', price: 28, description: 'Lake trout, lemon butter, asparagus, rice pilaf' },
        { name: 'Grass-Fed Ribeye', price: 38, description: '12oz ribeye, herb butter, roasted vegetables' },
        { name: 'Seasonal Tasting Menu', price: 65, description: '5-course meal showcasing the best of the season' },
        { name: 'Vegetable Wellington', price: 26, description: 'Roasted vegetables, puff pastry, mushroom sauce' }
      ]
    }
  ];

  const specialMenus = [
    {
      icon: Star,
      name: 'Sunday Brunch',
      description: 'Our legendary farm brunch featuring unlimited mimosas and a stunning buffet spread.',
      time: 'Sundays 10 AM - 2 PM',
      price: '$45 per person'
    },
    {
      icon: Wine,
      name: 'Wine Pairing Dinner',
      description: 'Monthly dinner featuring local wines expertly paired with seasonal dishes.',
      time: 'Last Friday of each month',
      price: '$85 per person'
    },
    {
      icon: Calendar,
      name: 'Farm Table Experience',
      description: 'Dine at a long table in our garden with a family-style feast.',
      time: 'Saturdays 6 PM (seasonal)',
      price: '$75 per person'
    }
  ];

  return (
    <div className="restaurant-page">
      <Hero
        title="Farm-to-Table Dining"
        subtitle="Savor the freshest flavors of the valley. Every dish tells a story of local ingredients, sustainable practices, and culinary passion."
        backgroundImage="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920"
        primaryBtn={{ text: 'Reserve a Table', link: '/book' }}
        secondaryBtn={{ text: 'View Menu', link: '#menu' }}
      />

      <section className="restaurant-intro">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-image">
              <img 
                src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600" 
                alt="Restaurant interior" 
              />
              <div className="image-badge">
                <Leaf size={24} />
                <span>100% Organic</span>
              </div>
            </div>
            <div className="intro-content">
              <span className="section-tag">Our Restaurant</span>
              <h2>Where Every Meal is a Celebration</h2>
              <p>
                The Valley Kitchen is more than a restaurant—it's a celebration of 
                local agriculture and culinary excellence. Our chef works directly 
                with our farm team to create menus that honor the seasons and 
                showcase the incredible ingredients grown right here.
              </p>
              <div className="restaurant-features">
                <div className="feature">
                  <UtensilsCrossed size={24} />
                  <div>
                    <h4>Chef's Table Available</h4>
                    <p>Watch our chefs at work</p>
                  </div>
                </div>
                <div className="feature">
                  <Clock size={24} />
                  <div>
                    <h4>Open Daily</h4>
                    <p>Breakfast, lunch & dinner</p>
                  </div>
                </div>
              </div>
              <Link to="/book" className="btn btn-primary">
                Make a Reservation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="menu-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Menu</span>
            <h2 className="section-title">Seasonal Selections</h2>
            <p className="section-subtitle">
              Menu changes with the seasons to reflect the freshest ingredients 
              available from our farm and local partners.
            </p>
          </div>

          <div className="menu-tabs">
            {menuCategories.map((category, index) => (
              <div key={index} className="menu-category">
                <div className="category-header">
                  <h3>{category.name}</h3>
                  <span className="category-time">
                    <Clock size={16} /> {category.time}
                  </span>
                </div>
                <div className="menu-items">
                  {category.items.map((item, i) => (
                    <div key={i} className="menu-item">
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                      </div>
                      <span className="item-price">${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="special-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Special Events</span>
            <h2 className="section-title">Unique Dining Experiences</h2>
          </div>

          <div className="specials-grid">
            {specialMenus.map((special, index) => (
              <div key={index} className="special-card">
                <div className="special-icon">
                  <special.icon size={32} />
                </div>
                <h3>{special.name}</h3>
                <p>{special.description}</p>
                <div className="special-details">
                  <span className="special-time">{special.time}</span>
                  <span className="special-price">{special.price}</span>
                </div>
                <Link to="/book" className="btn btn-outline">
                  Reserve
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Gallery</span>
            <h2 className="section-title">A Taste of Our Kitchen</h2>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item large">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800" alt="Dish" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400" alt="Dish" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400" alt="Dish" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400" alt="Dish" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400" alt="Dish" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Restaurant;
