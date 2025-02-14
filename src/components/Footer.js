import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="py-4 text-center text-white" style={{ backgroundColor: '#1C1C1E' }}>
      <p>© 2025 Vincent Göke. All rights reserved.</p>
      <div className="mt-3">
        <a href="mailto:your-email@example.com" className="text-white mx-2">
          <FontAwesomeIcon icon={faEnvelope} size="2x" />
        </a>
        <a href="https://linkedin.com/in/your-profile" className="text-white mx-2">
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
        <a href="https://github.com/your-github" className="text-white mx-2">
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
