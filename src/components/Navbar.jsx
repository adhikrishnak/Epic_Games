import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaHeart,
  FaGift,
  FaShoppingCart,
  FaBook,
  FaUser,
  FaSignOutAlt,
  FaEdit,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { GameContext } from "../context/GameContext";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const { games } = useContext(GameContext);
  const { wishlistItems } = useContext(WishlistContext);
  const { cartItems } = useContext(CartContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
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

  // ✅ Helper to get initials
  const getInitials = (user) => {
    if (!user) return "";
    if (user.name) {
      return user.name
        .split(" ")
        .map((n) => n[0].toUpperCase())
        .join("");
    }
    return user.email ? user.email[0].toUpperCase() : "";
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img src="/images/Epic_Games.png" alt="Logo" className="nav-logo" />
      </Link>

      <div className="nav-center">
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
        <Link to="/browse">Browse</Link>
      </div>

      <div className="nav-right">
        <Link to="/wishlist" className="nav-icon">
          <FaHeart />
          {wishlistItems.length > 0 && (
            <span className="badge">{wishlistItems.length}</span>
          )}
        </Link>

        <Link to="/gift" className="nav-icon"><FaGift /></Link>

        <Link to="/cart" className="nav-icon">
          <FaShoppingCart />
          {cartItems.length > 0 && (
            <span className="badge">{cartItems.length}</span>
          )}
        </Link>

        <Link to="/library" className="nav-icon"><FaBook /></Link>

        {currentUser?.role === "admin" && (
          <Link to="/admin" className="nav-icon"><FaEdit /></Link>
        )}

        {!currentUser ? (
          <Link to="/login" className="nav-icon" title="Login">
            <FaUser />
          </Link>
        ) : (
          <>
            <div className="user-badge" title={currentUser.email}>
              {getInitials(currentUser)}
            </div>
            <Link to="/logout" className="nav-icon" title="Logout">
              <FaSignOutAlt />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;