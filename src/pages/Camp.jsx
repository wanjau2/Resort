import { Link } from 'react-router-dom';
import { Tent, TreePine, Flame, Droplets, Sun, Moon, Star, CheckCircle } from 'lucide-react';
import Hero from '../components/Hero';
import './Camp.css';

const Camp = () => {
  const campSites = [
    {
      name: 'Riverside Camp',
      price: 45,
      image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800',
      features: ['River Access', 'Fire Pit', 'Picnic Table', 'Water Hookup'],
      description: 'Wake up to the sound of flowing water at our premium riverside sites.'
    },
    {
      name: 'Forest Clearing',
      price: 35,
      image: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?w=800',
      features: ['Shade Trees', 'Fire Ring', 'Wildlife Viewing', 'Privacy'],
      description: 'Secluded sites surrounded by tall pines for a true wilderness experience.'
    },
    {
      name: 'Meadow View',
      price: 40,
      image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=800',
      features: ['Open Sky', 'Stargazing', 'Fire Pit', 'Sunrise Views'],
      description: 'Open meadow sites perfect for stargazing and enjoying stunning sunrises.'
    },
    {
      name: 'Glamping Tent',
      price: 95,
      image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800',
      features: ['Real Bed', 'Electricity', 'Private Bath', 'Deck'],
      description: 'Luxury camping with all the comforts of home in a stunning setting.'
    }
  ];

  const activities = [
    { icon: TreePine, name: 'Hiking Trails', desc: '15+ miles of scenic trails' },
    { icon: Droplets, name: 'Fishing', desc: 'Stocked lake and river access' },
    { icon: Flame, name: 'Campfire Programs', desc: 'Nightly storytelling & s\'mores' },
    { icon: Moon, name: 'Night Hikes', desc: 'Guided moonlit adventures' },
    { icon: Sun, name: 'Sunrise Yoga', desc: 'Morning wellness sessions' },
    { icon: Star, name: 'Stargazing', desc: 'Astronomy programs weekly' }
  ];

  return (
    <div className="camp-page">
      <Hero
        title="Camp Under the Stars"
        subtitle="Reconnect with nature at our premium camping grounds. From rustic tent sites to glamping luxury, find your perfect outdoor escape."
        backgroundImage="https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=1920"
        primaryBtn={{ text: 'Reserve a Site', link: '/book' }}
        secondaryBtn={{ text: 'View Sites', link: '#sites' }}
      />

      <section className="camp-intro">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-content">
              <span className="section-tag">The Experience</span>
              <h2>Where Adventure Meets Comfort</h2>
              <p>
                Our campground spans over 50 acres of pristine wilderness, offering 
                a variety of camping experiences for everyone—from traditional tent 
                camping to luxury glamping. All sites include access to our modern 
                facilities and resort amenities.
              </p>
              <ul className="intro-list">
                <li><CheckCircle size={20} /> Clean restrooms with hot showers</li>
                <li><CheckCircle size={20} /> Camp store with supplies & snacks</li>
                <li><CheckCircle size={20} /> Firewood available for purchase</li>
                <li><CheckCircle size={20} /> 24/7 ranger assistance</li>
              </ul>
            </div>
            <div className="intro-image">
              <img src="https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=600" alt="Camping" />
            </div>
          </div>
        </div>
      </section>

      <section id="sites" className="sites-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Sites</span>
            <h2 className="section-title">Choose Your Camping Style</h2>
            <p className="section-subtitle">
              From basic tent sites to fully-equipped glamping tents, 
              we have options for every type of camper.
            </p>
          </div>

          <div className="sites-grid">
            {campSites.map((site, index) => (
              <div key={index} className="site-card">
                <div 
                  className="site-image" 
                  style={{ backgroundImage: `url(${site.image})` }}
                >
                  <div className="site-price">
                    ${site.price}<span>/night</span>
                  </div>
                </div>
                <div className="site-content">
                  <h3>{site.name}</h3>
                  <p>{site.description}</p>
                  <div className="site-features">
                    {site.features.map((feature, i) => (
                      <span key={i} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                  <Link to="/book" className="btn btn-primary">
                    Book This Site
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="activities-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Things to Do</span>
            <h2 className="section-title">Camp Activities</h2>
          </div>
          <div className="activities-grid">
            {activities.map((activity, index) => (
              <div key={index} className="activity-card">
                <div className="activity-icon">
                  <activity.icon size={28} />
                </div>
                <h3>{activity.name}</h3>
                <p>{activity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rules-section">
        <div className="container">
          <div className="rules-card">
            <h2>Campground Guidelines</h2>
            <div className="rules-grid">
              <div className="rule">
                <span className="rule-icon">🕙</span>
                <div>
                  <h4>Check-in/Check-out</h4>
                  <p>Check-in: 2 PM | Check-out: 11 AM</p>
                </div>
              </div>
              <div className="rule">
                <span className="rule-icon">🔥</span>
                <div>
                  <h4>Campfires</h4>
                  <p>Only in designated fire pits</p>
                </div>
              </div>
              <div className="rule">
                <span className="rule-icon">🐕</span>
                <div>
                  <h4>Pets</h4>
                  <p>Welcome on leash in designated areas</p>
                </div>
              </div>
              <div className="rule">
                <span className="rule-icon">🔇</span>
                <div>
                  <h4>Quiet Hours</h4>
                  <p>10 PM - 7 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Camp;
