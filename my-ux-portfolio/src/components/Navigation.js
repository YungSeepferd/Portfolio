import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-black text-white fixed-top">
      <div className="container d-flex justify-content-between align-items-center py-3">
        <h1 className="text-orange">Vincent Göke</h1>
        <button
          className="d-md-none btn text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="2x" />
        </button>
        <div
          className={`d-md-flex flex-column flex-md-row align-items-center ${isMobileMenuOpen ? 'd-block' : 'd-none d-md-flex'}`}
        >
          <Link to="hero" smooth={true} duration={800} offset={-70} className="mx-3 nav-link">
            Home
          </Link>
          <Link to="work" smooth={true} duration={800} offset={-70} className="mx-3 nav-link">
            My Work
          </Link>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              onClick={toggleDropdown}
            >
              More
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu show">
                <li>
                  <Link to="about" smooth={true} duration={800} offset={-70} className="dropdown-item">
                    About Me
                  </Link>
                </li>
                <li>
                  <Link to="contact" smooth={true} duration={800} offset={-70} className="dropdown-item">
                    Contact
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
