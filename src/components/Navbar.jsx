import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaHeart,
  FaGift,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaEdit,
  FaBook,
  FaChevronDown,
  FaBell,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { GameContext } from "../context/GameContext";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { currentUser, clearNotifications } = useContext(AuthContext);
  const { games } = useContext(GameContext);
  const { wishlistItems } = useContext(WishlistContext);
  const { cartItems } = useContext(CartContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const filtered = (games || []).filter((g) =>
      g.title.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  const getInitials = (user) => {
    if (!user) return "";
    if (user.displayName) {
      return user.displayName
        .split(" ")
        .map((n) => n[0].toUpperCase())
        .join("");
    }
    return user.email ? user.email[0].toUpperCase() : "";
  };

  const unreadCount = currentUser?.notifications?.filter(n => !n.read).length || 0;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" className="logo-link">
            <div className="nav-logo-wrapper">
              <img src="/images/Epic_Games.png" alt="Epic Games" className="nav-logo" />
              <FaChevronDown className="logo-chevron" />
            </div>
          </Link>
          <div className="main-nav-links">
            <Link to="/" className="nav-link active">STORE</Link>
            <Link to="/support" className="nav-link">Support</Link>
            <Link to="/browse" className="nav-link">Browse</Link>
          </div>
        </div>

        <div className="nav-right">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={handleSearch}
            />
            {results.length > 0 && (
              <div className="search-dropdown">
                {results.map((game) => (
                  <div
                    key={game.id}
                    className="search-item"
                    onClick={() => {
                      navigate(`/game/${game.id}`);
                      setQuery("");
                      setResults([]);
                    }}
                  >
                    <img src={game.image} alt={game.title} />
                    <span>{game.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="nav-utility">
            <div className="notification-wrapper">
              <button 
                className={`nav-icon-btn ${unreadCount > 0 ? 'has-notifications' : ''}`} 
                onClick={() => setShowNotifications(!showNotifications)}
                title="Notifications"
              >
                <FaBell />
                {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
              </button>
              
              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h3>Notifications</h3>
                    <button onClick={clearNotifications}>Clear All</button>
                  </div>
                  <div className="notification-list">
                    {currentUser?.notifications?.length > 0 ? (
                      currentUser.notifications.map((n, i) => (
                        <div key={i} className={`notification-item ${!n.read ? 'unread' : ''}`}>
                          <div className="notif-content">
                            <p className="notif-msg">{n.message}</p>
                            <span className="notif-game">{n.gameTitle}</span>
                            <span className="notif-date">{new Date(n.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="notification-empty">No notifications</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link to="/wishlist" className="nav-icon-btn" title="Wishlist">
              <FaHeart />
              {wishlistItems.length > 0 && <span className="badge">{wishlistItems.length}</span>}
            </Link>
            
            <Link to="/gift" className="nav-icon-btn" title="Gifts">
              <FaGift />
            </Link>

            <Link to="/library" className="nav-icon-btn" title="Library">
              <FaBook />
            </Link>

            <Link to="/cart" className="nav-icon-btn" title="Cart">
              <FaShoppingCart />
              {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
            </Link>

            {currentUser?.role === "admin" && (
              <Link to="/admin" className="nav-icon-btn admin-btn" title="Admin Dashboard">
                <FaEdit />
              </Link>
            )}

            <div className="nav-divider"></div>

            {!currentUser ? (
              <Link to="/login" className="login-link">Sign In</Link>
            ) : (
              <div className="user-menu">
                <div className="user-badge" title={currentUser.email}>{getInitials(currentUser)}</div>
                <button 
                  onClick={() => navigate('/logout')} 
                  className="nav-icon-btn logout-btn" 
                  title="Logout"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;