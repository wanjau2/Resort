import { Link } from 'react-router-dom';
import { TreePine, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <TreePine className="logo-icon" />
            <span>Green Valley Resort</span>
          </div>
          <p className="footer-desc">
            Experience nature at its finest. Our resort offers the perfect blend of 
            adventure, relaxation, and farm-fresh BBQ in a stunning natural setting.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><Facebook /></a>
            <a href="#" aria-label="Instagram"><Instagram /></a>
            <a href="#" aria-label="Twitter"><Twitter /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/rooms">Accommodation</Link></li>
            <li><Link to="/camp">Camping</Link></li>
            <li><Link to="/farm">Farm Tours</Link></li>
            <li><Link to="/bbq">BBQ</Link></li>
            <li><Link to="/shop">Farm Shop</Link></li>
            <li><Link to="/admin">Admin Portal</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Activities</h3>
          <ul>
            <li><a href="#">Hiking Trails</a></li>
            <li><a href="#">Fishing</a></li>
            <li><a href="#">Farm Experience</a></li>
            <li><a href="#">Birdwatching</a></li>
            <li><a href="#">Stargazing</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <div className="contact-item">
              <MapPin size={18} />
              <span>123 Valley Road, Nature County</span>
            </div>
            <div className="contact-item">
              <Phone size={18} />
              <span>0700000000</span>
            </div>
            <div className="contact-item">
              <Mail size={18} />
              <span>info@greenvalleyresort.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Green Valley Resort. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
