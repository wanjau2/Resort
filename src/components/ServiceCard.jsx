import { Link } from 'react-router-dom';
import './ServiceCard.css';

const ServiceCard = ({ icon: Icon, title, description, link, image }) => {
  return (
    <div className="service-card">
      {image && (
        <div className="service-image" style={{ backgroundImage: `url(${image})` }}></div>
      )}
      <div className="service-content">
        {Icon && (
          <div className="service-icon">
            <Icon size={32} />
          </div>
        )}
        <h3 className="service-title">{title}</h3>
        <p className="service-description">{description}</p>
        {link && (
          <Link to={link} className="service-link">
            Learn More →
          </Link>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
