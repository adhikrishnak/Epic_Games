import { useParams } from "react-router-dom";
import { useContext } from "react";
import { motion } from "framer-motion";
import { GameContext } from "../context/GameContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { GiftContext } from "../context/GiftContext";
import { toast } from "react-toastify"; // ✅ for notifications

const GameDetails = () => {
  const { id } = useParams();
  const { games } = useContext(GameContext);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const { addGift } = useContext(GiftContext);

  const game = games.find((g) => String(g.id) === String(id));
  if (!game) return <p>Game not found</p>;

  return (
    <div className="epic-details">
      <div className="epic-banner">
        <img src={game.banner} alt={game.title} />
      </div>

      <div className="epic-info">
        <h1>{game.title}</h1>
        <p className="tagline">{game.tagline}</p>

        <div className="tags">
          <span>★★★★★ {game.rating}</span>
          {game.tags?.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="buttons">
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="epic-btn"
            onClick={() => {
              addToCart(game);
              toast.success(`${game.title} added to cart!`);
            }}
          >
            Add to Cart {!game.price || game.price === 0 ? "(Free)" : `₹${game.price}`}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="epic-btn secondary"
            onClick={() => {
              addGift(game, "Friend");
              toast.info(`Gift sent: ${game.title}`);
            }}
          >
            Gift
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="epic-btn secondary"
            onClick={() => {
              addToWishlist(game);
              toast.success(`${game.title} added to wishlist!`);
            }}
          >
            Wishlist
          </motion.button>
        </div>

        <h2>About This Game</h2>
        <p>{game.description}</p>

        <div className="meta">
          <p><strong>Developer:</strong> {game.developer}</p>
          <p><strong>Publisher:</strong> {game.publisher}</p>
          <p><strong>Release Date:</strong> {game.release}</p>
          <p><strong>Refund Type:</strong> {game.refund}</p>
          <p><strong>Epic Rewards:</strong> {game.rewards}</p>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;