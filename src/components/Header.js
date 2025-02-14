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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const projects = [
    { id: 1, title: 'Master Thesis' },
    { id: 2, title: 'Affective State Change Through Haptics' },
    { id: 3, title: 'AMIAI' },
    { id: 4, title: 'Hackathon' },
    { id: 5, title: 'Bachelor Thesis' },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

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
          <div className="dropdown">
            <button className="btn dropdown-toggle" type="button" onClick={toggleDropdown}>
              My Work
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu show">
                <li>
                  <Link to="work" smooth={true} duration={800} offset={-70} className="dropdown-item">
                    My Work Overview
                  </Link>
                </li>
                {projects.map((project) => (
                  <li key={project.id}>
                    <Link to={`project-${project.id}`} smooth={true} duration={800} offset={-70} className="dropdown-item">
                      {project.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
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
