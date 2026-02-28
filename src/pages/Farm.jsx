import { Link } from 'react-router-dom';
import { Leaf, Sprout, Apple, Egg, Milk, Clock, Users, MapPin } from 'lucide-react';
import Hero from '../components/Hero';
import './Farm.css';

const Farm = () => {
  const farmAreas = [
    {
      name: 'Organic Vegetable Gardens',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
      description: 'Over 5 acres of seasonal vegetables grown using sustainable practices.',
      products: ['Tomatoes', 'Peppers', 'Lettuce', 'Herbs']
    },
    {
      name: 'Fruit Orchards',
      image: 'https://images.unsplash.com/photo-1474564862106-1f23d10b9d72?w=800',
      description: 'Apple, pear, and cherry trees that have been producing for over 50 years.',
      products: ['Apples', 'Pears', 'Cherries', 'Berries']
    },
    {
      name: 'Livestock Pastures',
      image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800',
      description: 'Free-range chickens, goats, and sheep roam our green pastures.',
      products: ['Fresh Eggs', 'Goat Cheese', 'Wool']
    },
    {
      name: 'Honey Bee Apiaries',
      image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800',
      description: 'Our bees produce raw honey and help pollinate our orchards.',
      products: ['Raw Honey', 'Beeswax', 'Honeycomb']
    }
  ];

  const tours = [
    {
      name: 'Morning Farm Walk',
      duration: '1.5 hours',
      time: '8:00 AM',
      price: 15,
      description: 'Join us for a guided walk through the farm, meet the animals, and learn about organic farming.'
    },
    {
      name: 'Pick Your Own Experience',
      duration: '2 hours',
      time: '10:00 AM',
      price: 25,
      description: 'Harvest fresh produce from our gardens and take home a basket of seasonal vegetables and fruits.'
    },
    {
      name: 'Farm-to-Table Workshop',
      duration: '3 hours',
      time: '2:00 PM',
      price: 65,
      description: 'Harvest ingredients and join our chef to create a delicious meal from scratch.'
    },
    {
      name: 'Kids Farm Adventure',
      duration: '1 hour',
      time: '11:00 AM',
      price: 10,
      description: 'A fun, educational experience for children to feed animals and explore nature.'
    }
  ];

  return (
    <div className="farm-page">
      <Hero
        title="Our Organic Farm"
        subtitle="Experience sustainable agriculture at its finest. Tour our organic gardens, meet friendly farm animals, and taste the freshest produce."
        backgroundImage="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920"
        primaryBtn={{ text: 'Book a Tour', link: '/book' }}
        secondaryBtn={{ text: 'Visit Shop', link: '/shop' }}
      />

      <section className="farm-intro">
        <div className="container">
          <div className="intro-stats">
            <div className="stat">
              <Sprout size={40} />
              <span className="stat-number">50+</span>
              <span className="stat-label">Acres of Farmland</span>
            </div>
            <div className="stat">
              <Leaf size={40} />
              <span className="stat-number">100%</span>
              <span className="stat-label">Organic Practices</span>
            </div>
            <div className="stat">
              <Apple size={40} />
              <span className="stat-number">75+</span>
              <span className="stat-label">Crop Varieties</span>
            </div>
            <div className="stat">
              <Users size={40} />
              <span className="stat-number">20+</span>
              <span className="stat-label">Years of Farming</span>
            </div>
          </div>
        </div>
      </section>

      <section className="farm-areas">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Explore</span>
            <h2 className="section-title">Our Farm Areas</h2>
            <p className="section-subtitle">
              Discover the different areas of our farm where we grow and raise 
              everything that makes it to your table.
            </p>
          </div>

          <div className="areas-grid">
            {farmAreas.map((area, index) => (
              <div key={index} className="area-card">
                <div 
                  className="area-image" 
                  style={{ backgroundImage: `url(${area.image})` }}
                />
                <div className="area-content">
                  <h3>{area.name}</h3>
                  <p>{area.description}</p>
                  <div className="area-products">
                    {area.products.map((product, i) => (
                      <span key={i} className="product-badge">{product}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tours-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Experiences</span>
            <h2 className="section-title">Farm Tours & Activities</h2>
            <p className="section-subtitle">
              Get hands-on with our farm experiences, perfect for all ages.
            </p>
          </div>

          <div className="tours-grid">
            {tours.map((tour, index) => (
              <div key={index} className="tour-card">
                <div className="tour-header">
                  <h3>{tour.name}</h3>
                  <span className="tour-price">${tour.price}</span>
                </div>
                <p className="tour-description">{tour.description}</p>
                <div className="tour-details">
                  <span><Clock size={16} /> {tour.duration}</span>
                  <span><MapPin size={16} /> {tour.time}</span>
                </div>
                <Link to="/book" className="btn btn-primary">
                  Book This Tour
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="philosophy-section">
        <div className="container">
          <div className="philosophy-grid">
            <div className="philosophy-content">
              <span className="section-tag">Our Philosophy</span>
              <h2>Sustainable Farming for a Better Tomorrow</h2>
              <p>
                At Green Valley Farm, we believe in working with nature, not against it. 
                Our organic practices ensure that our land remains healthy and productive 
                for generations to come.
              </p>
              <ul className="philosophy-list">
                <li>
                  <strong>No Synthetic Pesticides</strong>
                  <span>We use natural pest control methods</span>
                </li>
                <li>
                  <strong>Composting & Recycling</strong>
                  <span>All farm waste is composted</span>
                </li>
                <li>
                  <strong>Water Conservation</strong>
                  <span>Drip irrigation and rainwater harvesting</span>
                </li>
                <li>
                  <strong>Animal Welfare</strong>
                  <span>Free-range and humanely raised livestock</span>
                </li>
              </ul>
            </div>
            <div className="philosophy-images">
              <img 
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600" 
                alt="Sustainable farming" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Farm;
