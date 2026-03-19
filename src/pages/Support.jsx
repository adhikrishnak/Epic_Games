import { useState } from "react";
import { FaSearch, FaUser, FaCreditCard, FaGamepad, FaCogs, FaRocket, FaQuestionCircle, FaEnvelope } from "react-icons/fa";

const Support = () => {
  const [search, setSearch] = useState("");

  const categories = [
    { id: 1, title: "Epic Account", icon: <FaUser />, description: "Login, 2FA, Security, Account Linking" },
    { id: 2, title: "Payments", icon: <FaCreditCard />, description: "Refunds, Billing, Payment Methods, Subscriptions" },
    { id: 3, title: "Epic Games Store", icon: <FaRocket />, description: "Installation, Launcher, Troubleshooting, Downloads" },
    { id: 4, title: "Games Support", icon: <FaGamepad />, description: "Fortnite, Rocket League, Fall Guys, Unreal Engine" },
    { id: 5, title: "Technical Support", icon: <FaCogs />, description: "Launcher Issues, Connectivity, Hardware Requirements" },
    { id: 6, title: "Help Assistant", icon: <FaQuestionCircle />, description: "Guided Troubleshooting, Direct Assistant Support" },
  ];

  return (
    <div className="support-page">
      <div className="support-hero">
        <div className="support-hero-content">
          <h1>How can we help you?</h1>
          <div className="support-search-container">
            <FaSearch className="support-search-icon" />
            <input 
              type="text" 
              placeholder="SEARCH HELP CENTER..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search.trim() !== "" && (
              <div className="search-dropdown support-dropdown">
                {categories
                  .filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
                  .map(cat => (
                    <div key={cat.id} className="search-item" onClick={() => setSearch("")}>
                      <div className="search-item-icon" style={{ fontSize: '1.2rem', color: '#26bbff' }}>{cat.icon}</div>
                      <span>{cat.title}</span>
                    </div>
                  ))}
                {categories.filter(c => c.title.toLowerCase().includes(search.toLowerCase())).length === 0 && (
                  <div className="search-item no-results">
                    <span>No results found for "{search}"</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="support-categories-container">
        <div className="support-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="support-card">
              <div className="support-card-icon">{cat.icon}</div>
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
              <button className="support-card-btn">Explore</button>
            </div>
          ))}
        </div>
      </div>

      <div className="support-footer">
        <h2>Can't find what you're looking for?</h2>
        <p>Our Support Assistant is here to help 24/7 with your account and gaming needs.</p>
        <button className="support-contact-btn">
          <FaEnvelope /> Contact Us
        </button>
      </div>
    </div>
  );
};

export default Support;
