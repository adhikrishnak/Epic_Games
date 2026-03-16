import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="wishlist empty-wishlist">
        <h1>Your Wishlist</h1>
        <p>No items in wishlist yet.</p>
      </div>
    );
  }

  return (
    <div className="wishlist epic-page">
      <h1 className="epic-title">My Wishlist</h1>
      <div className="epic-grid">
        {wishlistItems.map((game, index) => (
          <motion.div
            key={`${game.id}-${index}`} // ✅ unique key
            className="epic-card"
            onClick={() => navigate(`/game/${game.id}`)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <img src={game.image} alt={game.title} />
            <div className="epic-card-info">
              <h3>{game.title}</h3>
              <p>{!game.price || game.price === 0 ? "Free" : `₹${game.price}`}</p>
              <button
                className="epic-btn secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(game.id);
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

export default Wishlist;