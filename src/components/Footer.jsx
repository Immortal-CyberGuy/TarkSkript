import React from 'react';
import '../styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
      <div className="social-links">
        <a href="https://github.com/Immortal-CyberGuy" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="https://www.instagram.com/gargshubham2411" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://www.linkedin.com/in/real-shubham-garg" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
      <p>© 2025 <strong>TarkSkript</strong>. Created by <strong>Shubham Garg</strong></p>
      </div>
    </footer>
  );
}

export default Footer;
