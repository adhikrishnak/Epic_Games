import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaCheckCircle } from "react-icons/fa";
import { WishlistContext } from "../context/WishlistContext";
import { toast } from "react-toastify";

export default function GameCard({ game }) {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  const isWishlisted = isInWishlist(game._id || game.id);

  const handleToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(game);
    if (!isWishlisted) {
      toast.success(`${game.title} added to wishlist`);
    } else {
      toast.info(`${game.title} removed from wishlist`);
    }
  };

  return (
    <div
      className="game-card"
      onClick={() => navigate(`/game/${game.id}`)}
    >
      <div className="card-image-wrapper">
        <img src={game.image} alt={game.title} className="card-image" />
        <button 
          className={`wishlist-overlay-btn ${isWishlisted ? "active" : ""}`} 
          onClick={handleToggle}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {isWishlisted ? <FaCheckCircle /> : <FaPlusCircle />}
        </button>
      </div>
      <div className="card-info">
        <span className="card-type">Base Game</span>
        <h4 className="card-title">{game.title}</h4>
        <div className="card-price-row">
          <span className="card-price">
            {!game.price || game.price === 0 ? "Free" : `₹${game.price.toLocaleString()}`}
          </span>
        </div>
      </div>
    </div>
  );
}
