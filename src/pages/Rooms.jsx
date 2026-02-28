import Hero from '../components/Hero';
import RoomCard from '../components/RoomCard';
import './Rooms.css';

const Rooms = () => {
  const rooms = [
    {
      name: 'Valley View Suite',
      price: 189,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      capacity: 2,
      bedType: 'King Bed',
      amenities: ['WiFi', 'Mountain View', 'Balcony', 'Mini Bar'],
      description: 'Spacious suite with panoramic views of the valley and modern amenities.'
    },
    {
      name: 'Forest Cabin',
      price: 159,
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
      capacity: 4,
      bedType: '2 Queen Beds',
      amenities: ['Fireplace', 'Kitchen', 'Patio', 'BBQ'],
      description: 'Cozy cabin nestled in the forest, perfect for families or groups.'
    },
    {
      name: 'Lake House',
      price: 249,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      capacity: 6,
      bedType: '3 Queen Beds',
      amenities: ['Lake Access', 'Boat Dock', 'Full Kitchen', 'Hot Tub'],
      description: 'Stunning waterfront property with private lake access and dock.'
    },
    {
      name: 'Garden Room',
      price: 129,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
      capacity: 2,
      bedType: 'Queen Bed',
      amenities: ['Garden View', 'WiFi', 'Coffee Maker', 'Work Desk'],
      description: 'Charming room overlooking our organic gardens, ideal for couples.'
    },
    {
      name: 'Treehouse Retreat',
      price: 199,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      capacity: 2,
      bedType: 'King Bed',
      amenities: ['Treetop Views', 'Private Deck', 'Stargazing Roof', 'Mini Bar'],
      description: 'Unique elevated accommodation for a magical forest experience.'
    },
    {
      name: 'Family Lodge',
      price: 289,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      capacity: 8,
      bedType: '4 Beds',
      amenities: ['Game Room', 'Full Kitchen', 'Fireplace', 'Large Deck'],
      description: 'Spacious lodge perfect for large families or group gatherings.'
    }
  ];

  return (
    <div className="rooms-page">
      <Hero
        title="Find Your Perfect Retreat"
        subtitle="From cozy cabins to luxurious suites, discover accommodations that blend comfort with nature's beauty."
        backgroundImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920"
        primaryBtn={{ text: 'Book Now', link: '/book' }}
      />

      <section className="rooms-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Accommodations</span>
            <h2 className="section-title">Our Rooms & Cabins</h2>
            <p className="section-subtitle">
              Each room is thoughtfully designed to provide comfort while 
              connecting you with the natural beauty around us.
            </p>
          </div>

          <div className="rooms-grid">
            {rooms.map((room, index) => (
              <RoomCard key={index} {...room} />
            ))}
          </div>
        </div>
      </section>

      <section className="amenities-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Included</span>
            <h2 className="section-title">Resort Amenities</h2>
          </div>
          <div className="amenities-grid">
            <div className="amenity-item">
              <span className="amenity-icon">🍳</span>
              <h3>Farm Breakfast</h3>
              <p>Complimentary farm-fresh breakfast daily</p>
            </div>
            <div className="amenity-item">
              <span className="amenity-icon">🛜</span>
              <h3>Free WiFi</h3>
              <p>High-speed internet throughout the resort</p>
            </div>
            <div className="amenity-item">
              <span className="amenity-icon">🚗</span>
              <h3>Free Parking</h3>
              <p>Complimentary parking for all guests</p>
            </div>
            <div className="amenity-item">
              <span className="amenity-icon">🏊</span>
              <h3>Pool Access</h3>
              <p>Outdoor pool with valley views</p>
            </div>
            <div className="amenity-item">
              <span className="amenity-icon">🥾</span>
              <h3>Trail Access</h3>
              <p>Unlimited access to hiking trails</p>
            </div>
            <div className="amenity-item">
              <span className="amenity-icon">🚴</span>
              <h3>Bike Rental</h3>
              <p>Complimentary bikes for exploring</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rooms;
