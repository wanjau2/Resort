import { Link } from 'react-router-dom';
import { Users, Bed, Wifi, Coffee } from 'lucide-react';
import './RoomCard.css';

const RoomCard = ({ 
  name, 
  price, 
  image, 
  capacity, 
  bedType, 
  amenities = [],
  description 
}) => {
  return (
    <div className="room-card">
      <div 
        className="room-image" 
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="room-price">
          <span className="amount">${price}</span>
          <span className="period">/ night</span>
        </div>
      </div>
      <div className="room-content">
        <h3 className="room-name">{name}</h3>
        <p className="room-description">{description}</p>
        
        <div className="room-features">
          <div className="feature">
            <Users size={18} />
            <span>{capacity} Guests</span>
          </div>
          <div className="feature">
            <Bed size={18} />
            <span>{bedType}</span>
          </div>
        </div>

        <div className="room-amenities">
          {amenities.slice(0, 4).map((amenity, index) => (
            <span key={index} className="amenity-tag">{amenity}</span>
          ))}
        </div>

        <Link to="/book" className="book-room-btn">
          Book This Room
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
