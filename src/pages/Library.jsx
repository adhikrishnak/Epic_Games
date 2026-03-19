import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { GameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGamepad, FaSearch, FaFilter } from "react-icons/fa";

const Library = () => {
  const { currentUser } = useContext(AuthContext);
  const { games, loading } = useContext(GameContext);
  const navigate = useNavigate();

  // Support both populated and unpopulated library items
  const libraryItems = (currentUser?.library || []).map(item => {
    if (typeof item === 'string') {
      return games.find(g => String(g._id || g.id) === item);
    }
    return item;
  }).filter(Boolean);

  // ONLY show full-page loading if we have LITERALLY nothing to show and are fetching
  if (loading && libraryItems.length === 0 && (currentUser?.library?.length || 0) > 0) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">SYNCING LIBRARY</p>
    </div>
  );

  return (
    <div className="collection-page">
      <div className="collection-header">
        <h1 className="hero-title-main">Library</h1>
        <div className="collection-controls">
          <div className="search-bar mini">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search Library" />
          </div>
          <button className="filter-btn"><FaFilter /> Filter</button>
        </div>
      </div>

      {libraryItems.length === 0 ? (
        <div className="empty-state">
          <FaGamepad className="empty-icon" />
          <h2>You haven't any games yet.</h2>
          <p>Your library is currently empty. Explore the store to find your next favorite game!</p>
          <button className="primary" onClick={() => navigate("/")}>Go to Store</button>
        </div>
      ) : (
        <div className="game-grid">
          {libraryItems.map((game, index) => (
            <motion.div
              key={game._id || game.id}
              className="game-card library-card"
              onClick={() => navigate(`/game/${game._id || game.id}`)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="card-image-wrapper">
                <img src={game.image} alt={game.title} className="card-image" />
              </div>
              <div className="card-info">
                <span className="card-type">Base Game</span>
                <h4 className="card-title">{game.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;