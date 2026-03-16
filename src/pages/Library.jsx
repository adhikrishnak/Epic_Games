import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Library = () => {
  const { currentUser, removeFromLibrary } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!currentUser || !currentUser.library || currentUser.library.length === 0) {
    return (
      <div className="library empty-lib">
        <h1>Your Library</h1>
        <p>No games purchased yet</p>
      </div>
    );
  }

  return (
    <div className="library epic-page">
      <h1 className="epic-title">My Library</h1>
      <div className="epic-grid">
        {currentUser.library.map((game, index) => (
          <motion.div
            key={`${game.id}-${index}`}   // ✅ unique key
            className="epic-card"
            onClick={() => navigate(`/game/${game.id}`)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <img src={game.image} alt={game.title} />
            <div className="epic-card-info">
              <h3>{game.title}</h3>
              <button
                className="epic-btn secondary"
                onClick={(e) => {
                  e.stopPropagation(); // prevent navigation
                  removeFromLibrary(game.id);
                }}
              >
                Remove
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Library;