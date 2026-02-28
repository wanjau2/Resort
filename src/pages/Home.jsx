import { Link } from 'react-router-dom';
import { 
  Tent, TreePine, UtensilsCrossed, BedDouble, 
  ShoppingBasket, Star, MapPin, ArrowRight
} from 'lucide-react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import './Home.css';

const Home = () => {
  const services = [
    {
      icon: BedDouble,
      title: 'Cozy Rooms',
      description: 'Relax in our comfortable rooms with stunning views of the valley and mountains.',
      link: '/rooms',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'
    },
    {
      icon: Tent,
      title: 'Camping Experience',
      description: 'Connect with nature at our premium camping sites with modern amenities.',
      link: '/camp',
      image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800'
    },
    {
      icon: TreePine,
      title: 'Farm Tours',
      description: 'Explore our organic farm and learn about sustainable agriculture practices.',
      link: '/farm',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'
    },
    {
      icon: UtensilsCrossed,
      title: 'Farm-to-Table Dining',
      description: 'Savor fresh, organic meals prepared with ingredients from our own farm.',
      link: '/restaurant',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'
    },
    {
      icon: ShoppingBasket,
      title: 'Farm Shop',
      description: 'Take home fresh produce, artisan goods, and locally made products.',
      link: '/shop',
      image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'An absolutely magical experience! The camping sites are pristine and the farm-to-table restaurant is incredible.',
      rating: 5,
      location: 'New York'
    },
    {
      name: 'Mike Thompson',
      text: 'Perfect getaway from city life. The kids loved the farm tour and we enjoyed every meal.',
      rating: 5,
      location: 'California'
    },
    {
      name: 'Emily Chen',
      text: 'The rooms have the most beautiful views. Waking up to the valley sunrise was unforgettable.',
      rating: 5,
      location: 'Texas'
    }
  ];

  return (
    <div className="home">
      <Hero
        title="Escape to Nature's Paradise"
        subtitle="Experience the perfect blend of adventure, relaxation, and farm-fresh dining at Green Valley Resort. Where nature meets comfort."
        backgroundImage="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920"
        primaryBtn={{ text: 'Explore Rooms', link: '/rooms' }}
        secondaryBtn={{ text: 'View Activities', link: '/camp' }}
      />

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-number">250+</div>
              <div className="feature-label">Acres of Nature</div>
            </div>
            <div className="feature-item">
              <div className="feature-number">50+</div>
              <div className="feature-label">Cozy Rooms</div>
            </div>
            <div className="feature-item">
              <div className="feature-number">100%</div>
              <div className="feature-label">Organic Farm</div>
            </div>
            <div className="feature-item">
              <div className="feature-number">4.9</div>
              <div className="feature-label">Guest Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What We Offer</span>
            <h2 className="section-title">Experience the Best of Nature</h2>
            <p className="section-subtitle">
              From comfortable accommodations to exciting adventures, 
              we have everything you need for an unforgettable stay.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-images">
              <div className="about-image main">
                <img src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600" alt="Resort" />
              </div>
              <div className="about-image secondary">
                <img src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400" alt="Nature" />
              </div>
            </div>
            <div className="about-content">
              <span className="section-tag">About Us</span>
              <h2>A Hidden Gem in the Heart of Nature</h2>
              <p>
                Nestled in the picturesque Green Valley, our resort has been welcoming 
                guests for over 20 years. We believe in sustainable tourism, organic 
                farming, and creating memorable experiences that connect people with nature.
              </p>
              <p>
                Our 250-acre property features pristine forests, organic farmland, 
                scenic trails, and a crystal-clear lake. Whether you're seeking adventure 
                or relaxation, you'll find your perfect escape here.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <TreePine />
                  <span>Eco-Friendly Practices</span>
                </div>
                <div className="about-feature">
                  <UtensilsCrossed />
                  <span>Farm-to-Table Cuisine</span>
                </div>
              </div>
              <Link to="/farm" className="btn btn-primary">
                Learn More <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title">What Our Guests Say</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#f7c948" color="#f7c948" />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <span><MapPin size={14} /> {testimonial.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready for Your Nature Escape?</h2>
          <p>Book your stay today and experience the magic of Green Valley Resort</p>
          <Link to="/book" className="btn btn-primary">
            Book Your Stay
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
