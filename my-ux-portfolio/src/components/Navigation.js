import React from 'react';

function Navigation() {
  return (
    <nav className="flex justify-center space-x-4 text-white">
      <a href="/" className="hover:text-orange-500">Home</a>
      <a href="#about-me-intro" className="hover:text-orange-500">About</a>
      <a href="#work-intro" className="hover:text-orange-500">Work</a>
      <a href="#contact-intro" className="hover:text-orange-500">Contact</a>
    </nav>
  );
}

export default Navigation;
