import React from 'react';
import Navigation from './Navigation'; // Import the Navigation component

function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700 py-4">
      <Navigation /> 
    </header>
  );
}

export default Header;
