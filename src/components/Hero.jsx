import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = ({ 
  title, 
  subtitle, 
  backgroundImage, 
  primaryBtn, 
  secondaryBtn,
  overlay = true 
}) => {
  return (
    <section 
      className="hero"
      style={{ 
        backgroundImage: `url(${backgroundImage})` 
      }}
    >
      {overlay && <div className="hero-overlay"></div>}
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        <div className="hero-buttons">
          {primaryBtn && (
            <Link to={primaryBtn.link} className="btn btn-primary">
              {primaryBtn.text}
            </Link>
          )}
          {secondaryBtn && (
            <Link to={secondaryBtn.link} className="btn btn-secondary">
              {secondaryBtn.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
