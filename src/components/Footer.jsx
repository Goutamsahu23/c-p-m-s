import React from 'react';
import './Footer.css';
import { AiOutlineInstagram, AiOutlineFacebook, AiOutlineTwitter } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Footer = () => {
  const handleContactClick = () => {
    toast.success(`Contact us: +91 1234567890\nSend us your query: admin@gmail.com`, {
      duration: 10000, 
    });
  };

  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/" className="footer-link">About</Link>
          <Link to="/" className="footer-link">Services</Link>
          <Link to="/" className="footer-link">Testimonials</Link>
          <Link onClick={handleContactClick} className="footer-link">Contact Us</Link>
        </div>
        <div className="footer-social">
          <Link to="/" className="footer-social-link">
            <AiOutlineInstagram />
          </Link>
          <Link to="/" className="footer-social-link">
            <AiOutlineFacebook />
          </Link>
          <Link to="/" className="footer-social-link">
            <AiOutlineTwitter />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
