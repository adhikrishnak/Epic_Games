import { FaGamepad, FaStore, FaTools, FaGlobe, FaBuilding, FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const handlePhoneClick = () => {
    alert("User clicked the support phone number: 7708615330");
  };

  return (
    <footer className="footer">
      <div className="footer-sections">
        <div className="footer-column">
          <h3><FaGamepad /> Games</h3>
          <ul>
            <li>Fortnite</li>
            <li>Fall Guys</li>
            <li>Rocket League</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3><FaStore /> Marketplaces</h3>
          <ul>
            <li>Epic Games Store</li>
            <li>ArtStation</li>
            <li><Link to="/refund">Store Refund Policy</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3><FaTools /> Tools</h3>
          <ul>
            <li>Unreal Engine</li>
            <li>MetaHuman</li>
            <li>Twinmotion</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3><FaGlobe /> Online Services</h3>
          <ul>
            <li>Epic Online Services</li>
            <li>Acceptable Use Policy</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3><FaBuilding /> Company</h3>
          <ul>
            <li>About</li>
            <li>Careers</li>
            <li>Newsroom</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3><FaBook /> Resources</h3>
          <ul>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><a href="mailto:tony65194@gmail.com">Support Email</a></li>
            <li><a href="tel:7708615330" onClick={handlePhoneClick}>Support: 7708615330</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Epic Games Clone. All rights reserved.</p>
        <p>
          <Link to="/terms">Terms of Service</Link> |{" "}
          <Link to="/privacy">Privacy Policy</Link> |{" "}
          <Link to="/refund">Store Refund Policy</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;