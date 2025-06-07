import React from 'react';
import '../styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import shubhamImg from '../assets/shubham.png';
import anshImg from '../assets/ansh.png';


// function Footer() {
//   return (
//     <footer>
//       <div className="footer-container">
//       <div className="social-links">
//         <a href="https://github.com/Immortal-CyberGuy" target="_blank" rel="noreferrer">
//           <FontAwesomeIcon icon={faGithub} />
//         </a>
//         <a href="https://www.instagram.com/gargshubham2411" target="_blank" rel="noreferrer">
//           <FontAwesomeIcon icon={faInstagram} />
//         </a>
//         <a href="https://www.linkedin.com/in/real-shubham-garg" target="_blank" rel="noreferrer">
//           <FontAwesomeIcon icon={faLinkedin} />
//         </a>
//       </div>
//       <p>© 2025 <strong>TarkSkript</strong>. Created by <strong>Shubham Garg</strong></p>
//       </div>
//     </footer>
//   );
// }

// Developer data for easy expansion or modification
const developers = [
  {
    name: 'Shubham Garg',
    image: shubhamImg, // Update with your actual image path
    socials: {
      github: 'https://github.com/Immortal-CyberGuy',
      linkedin: 'https://www.linkedin.com/in/real-shubham-garg',
      instagram: 'https://www.instagram.com/gargshubham2411',
    },
  },
  {
    name: 'Ansh Sharma',
    image: anshImg,
    socials: {
      github: 'https://github.com/Anshuu-Sharma',
      linkedin: 'https://www.linkedin.com/in/ansh-sharma-36a936143?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      instagram: 'https://www.instagram.com/ansh.sha.rma?igsh=aDFpOGdmeTlmZWgz&utm_source=qr',
    },
  },
];

function Footer() {
  return (
    <footer>
      <div className="footer-container">

        {/* Meet Your Developer Section */}
        <section id="developersec" className="Developers-section">
          <h1 className="main-heading">
            <span className="word meet">Meet</span>{' '}
            <span className="word your">your</span>{' '}
            <span className="word developers">Developer{developers.length > 1 ? 's' : ''}</span>
          </h1>
          <div id="creator-content">
            <div className="creator-section">
              {developers.map((dev, idx) => (
                <div className="creator" key={idx}>
                  <img src={dev.image} alt={dev.name} className="creator-image" />
                  <div className="creator-name">{dev.name}</div>
                  <div className="social-icons">
                    <a href={dev.socials.github} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href={dev.socials.linkedin} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href={dev.socials.instagram} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <p>© 2025 <strong>TarkSkript</strong>. Created by <strong>Shubham Garg & Ansh Sharma</strong></p>
      </div>
    </footer>
  );
}

export default Footer;



