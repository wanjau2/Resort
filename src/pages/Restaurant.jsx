import { Link } from 'react-router-dom';
import { Clock, UtensilsCrossed, Leaf, Star, Calendar, Flame } from 'lucide-react';
import Hero from '../components/Hero';
import './Restaurant.css';

const Bbq = () => {
  const menuCategories = [
    {
      name: 'Grill Lunch',
      time: '12:00 PM - 3:30 PM',
      items: [
        { name: 'Smoked Pulled Pork Sandwich', price: 18, description: 'House-smoked pork, slaw, pickles, toasted bun' },
        { name: 'Grilled Farm Chicken Wrap', price: 16, description: 'Herb-marinated chicken, greens, fire-roasted peppers' },
        { name: 'Charred Veggie Skewers', price: 14, description: 'Seasonal vegetables, garlic oil, herb yogurt dip' },
        { name: 'BBQ Beef Burger', price: 19, description: 'Grass-fed beef, cheddar, onion jam, smokehouse sauce' }
      ]
    },
    {
      name: 'Smokehouse Dinner',
      time: '5:30 PM - 10:00 PM',
      items: [
        { name: '12-Hour Smoked Brisket', price: 32, description: 'Slow-smoked brisket, corn bread, roasted farm vegetables' },
        { name: 'Rack of BBQ Ribs', price: 30, description: 'Pork ribs glazed with signature valley BBQ sauce' },
        { name: 'Fire-Grilled Trout', price: 27, description: 'Lake trout, lemon herb butter, grilled asparagus' },
        { name: 'Mixed Grill Platter', price: 36, description: 'Chicken, sausage, beef cuts, house pickles, sauces' }
      ]
    },
    {
      name: 'Sides & Sauces',
      time: 'Available all day',
      items: [
        { name: 'Smoked Mac & Cheese', price: 9, description: 'Three-cheese blend with a crisp smoked topping' },
        { name: 'Charcoal Corn on the Cob', price: 7, description: 'Fire-charred sweet corn, lime-chili butter' },
        { name: 'Farm Slaw', price: 6, description: 'Crunchy cabbage slaw with apple cider dressing' },
        { name: 'Signature BBQ Sauce Flight', price: 8, description: 'Classic, honey-chipotle, and mustard herb sauces' }
      ]
    }
  ];

  const specialMenus = [
    {
      icon: Star,
      name: 'Sunset BBQ Night',
      description: 'Open-fire grill stations, live acoustic music, and unlimited sides every Saturday evening.',
      time: 'Saturdays 6 PM - 10 PM',
      price: '$39 per person'
    },
    {
      icon: Calendar,
      name: 'Family Grill Feast',
      description: 'Shared smokehouse platters designed for groups with kid-friendly options included.',
      time: 'Fridays 5 PM - 9 PM',
      price: '$95 per table'
    },
    {
      icon: Flame,
      name: 'Pitmaster Tasting Board',
      description: 'Chef-curated tasting of smoked meats, grilled vegetables, and house sauces.',
      time: 'Daily from 7 PM',
      price: '$52 per person'
    }
  ];

  return (
    <div className="restaurant-page">
      <Hero
        title="Valley BBQ Experience"
        subtitle="Gather around the fire for slow-smoked meats, grilled farm produce, and bold house-made sauces."
        backgroundImage="https://images.unsplash.com/photo-1558030006-450675393462?w=1920"
        primaryBtn={{ text: 'Reserve a BBQ Table', link: '/book' }}
        secondaryBtn={{ text: 'View Menu', link: '#menu' }}
      />

      <section className="restaurant-intro">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-image">
              <img
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600"
                alt="BBQ grill station"
              />
              <div className="image-badge">
                <Leaf size={24} />
                <span>Farm Sourced</span>
              </div>
            </div>
            <div className="intro-content">
              <span className="section-tag">Our BBQ Spot</span>
              <h2>Where Smoke, Fire, and Flavor Meet</h2>
              <p>
                Our open-air BBQ kitchen celebrates local ingredients and traditional
                fire cooking. The team works directly with the farm to bring fresh cuts,
                seasonal produce, and bold flavors to every plate served.
              </p>
              <div className="restaurant-features">
                <div className="feature">
                  <UtensilsCrossed size={24} />
                  <div>
                    <h4>Live Grill Stations</h4>
                    <p>Watch every dish finished over fire</p>
                  </div>
                </div>
                <div className="feature">
                  <Clock size={24} />
                  <div>
                    <h4>Open Daily</h4>
                    <p>Lunch and evening smokehouse service</p>
                  </div>
                </div>
              </div>
              <Link to="/book" className="btn btn-primary">
                Book a BBQ Experience
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="menu-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">BBQ Menu</span>
            <h2 className="section-title">Smoked &amp; Grilled Favorites</h2>
            <p className="section-subtitle">
              Our BBQ menu rotates with seasonal farm produce while keeping your smokehouse favorites on the grill.
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
            <span className="section-tag">BBQ Nights</span>
            <h2 className="section-title">Fire &amp; Flavor Events</h2>
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
            <h2 className="section-title">From Pit to Plate</h2>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item large">
              <img src="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800" alt="BBQ platter" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400" alt="Smoked ribs" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1529692236671-f1dc0f8e84ac?w=400" alt="Grilled meat" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=400" alt="BBQ side dish" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400" alt="Outdoor BBQ" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bbq;
