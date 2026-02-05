import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Library = () => {
  const { currentUser } = useContext(AuthContext);
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
    <div className="library">
      <h1>Your Library</h1>
      <div className="library-grid">
        {currentUser.library.map((game, index) => (
          <motion.div
            key={`${game.id}-${index}`}   // ✅ unique key
            className="library-card"
            onClick={() => navigate(`/game/${game.id}`)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <img src={game.image} alt={game.title} />
            <h3>{game.title}</h3>
          </motion.div>
))}
      </div>
    </div>
  );
};

export default Library;