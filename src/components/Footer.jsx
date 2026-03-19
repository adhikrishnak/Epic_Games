import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaYoutube, FaChevronUp } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="social-links">
            <a href="https://facebook.com/epicgames" target="_blank" rel="noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com/epicgames" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://youtube.com/epicgames" target="_blank" rel="noreferrer"><FaYoutube /></a>
          </div>
          <button className="back-to-top" onClick={scrollToTop}>
            <FaChevronUp />
          </button>
        </div>

        <div className="footer-links-grid">
          <div className="footer-link-col">
            <h4 className="footer-label">Resources</h4>
            <ul>
              <li><a href="#">Support-A-Creator</a></li>
              <li><a href="#">Distribute on Epic Games</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Company</a></li>
            </ul>
          </div>
          <div className="footer-link-col">
            <h4 className="footer-label">Fan Art Policy</h4>
            <ul>
              <li><a href="#">UX Research</a></li>
              <li><a href="#">Store EULA</a></li>
            </ul>
          </div>
          <div className="footer-link-col">
            <h4 className="footer-label">Online Services</h4>
            <ul>
              <li><a href="#">Epic Online Services</a></li>
              <li><a href="#">Acceptable Use Policy</a></li>
              <li><a href="#">Trust Statement</a></li>
            </ul>
          </div>
          <div className="footer-link-col">
            <h4 className="footer-label">Epic Games</h4>
            <ul>
              <li><a href="#">Battle Breakers</a></li>
              <li><a href="#">Fortnite</a></li>
              <li><a href="#">Fall Guys</a></li>
              <li><a href="#">Rocket League</a></li>
              <li><a href="#">Shadow Complex</a></li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <div className="footer-legal">
            <p>
              © 2026, Epic Games, Inc. All rights reserved. Epic, Epic Games, the Epic Games logo, Fortnite, the Fortnite logo, Unreal, Unreal Engine, the Unreal Engine logo, Unreal Tournament, and the Unreal Tournament logo are trademarks or registered trademarks of Epic Games, Inc. in the United States of America and elsewhere. Other brands or product names are the trademarks of their respective owners.
            </p>
          </div>
          <div className="footer-bottom-links">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/refund">Store Refund Policy</Link>
          </div>
          <div className="footer-logo-container">
            <img src="/images/Epic_Games.png" alt="Epic Games Logo" className="footer-logo-icon" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;