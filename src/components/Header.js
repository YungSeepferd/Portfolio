import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './Header.css';

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="header">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <div className="d-flex align-items-center">
          <h1 className="brand-name mb-0">Vincent Göke</h1>
          <div className="ml-3">
            <a href="mailto:your-email@example.com" className="text-dark mx-2">
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
            </a>
            <a href="https://linkedin.com/in/your-profile" className="text-dark mx-2">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a href="https://github.com/your-github" className="text-dark mx-2">
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
          </div>
        </div>
        <button
          className="d-md-none btn text-dark"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="2x" />
        </button>
        <div className={`d-md-flex ${isMobileMenuOpen ? 'd-block' : 'd-none d-md-flex'} align-items-center`}>
          <Link to="hero" smooth={true} duration={800} spy={true} offset={-70} className="mx-3 nav-link">
            Home
          </Link>
          <Link to="work" smooth={true} duration={800} offset={-70} className="mx-3 nav-link">
            My Work
          </Link>
          <Link to="about" smooth={true} duration={800} spy={true} offset={-70} className="mx-3 nav-link">
            About Me
          </Link>
          <Link to="contact" smooth={true} duration={800} spy={true} offset={-70} className="mx-3 nav-link">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;