import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { GameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaTrash, FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { wishlistItems: rawWishlist, removeFromWishlist } = useContext(WishlistContext);
  const { games, loading } = useContext(GameContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const wishlistItems = (rawWishlist || []).map(item => {
    if (typeof item === 'string') {
      return games.find(g => String(g._id || g.id) === item);
    }
    return item;
  }).filter(Boolean);

  if (loading && wishlistItems.length === 0 && (rawWishlist?.length || 0) > 0) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">SYNCING WISHLIST</p>
    </div>
  );

  return (
    <div className="collection-page">
      <div className="collection-header">
        <h1 className="hero-title-main">Wishlist</h1>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="empty-state">
          <FaHeart className="empty-icon" />
          <h2>You haven't added anything to your wishlist yet.</h2>
          <p>Keep track of the games you're interested in by adding them here.</p>
          <button className="primary" onClick={() => navigate("/")}>Browse Games</button>
        </div>
      ) : (
        <div className="game-grid">
          {wishlistItems.map((game, index) => (
            <motion.div
              key={game._id || game.id}
              className="game-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="card-image-wrapper" onClick={() => navigate(`/game/${game._id || game.id}`)}>
                <img src={game.image} alt={game.title} className="card-image" />
              </div>
              <div className="card-info">
                <span className="card-type">Base Game</span>
                <h4 className="card-title">{game.title}</h4>
                <div className="card-price-row">
                  <span className="card-price">₹{game.price?.toLocaleString()}</span>
                </div>
                <div className="collection-actions">
                  <button 
                    className="add-to-cart-btn-collection"
                    onClick={() => {
                      addToCart(game);
                      toast.success(`${game.title} added to cart!`);
                    }}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                  <button 
                    className="remove-btn-icon" 
                    title="Remove from Wishlist"
                    onClick={() => {
                      removeFromWishlist(game._id || game.id);
                      toast.info(`${game.title} removed from wishlist`);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;