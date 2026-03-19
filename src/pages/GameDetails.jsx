import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaPlusCircle, FaGift, FaStar, FaWindows, FaThLarge } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { GameContext } from "../context/GameContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { GiftContext } from "../context/GiftContext";
import { toast } from "react-toastify";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { games } = useContext(GameContext);
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { addGift } = useContext(GiftContext);

  const gameId = id;
  const game = games.find((g) => String(g._id || g.id) === String(gameId));
  
  if (!game) return <div className="loading">Game not found</div>;

  const isInLibrary = currentUser?.library?.some(item => {
    const itemId = typeof item === "string" ? item : (item._id || item.id);
    return String(itemId) === String(gameId);
  });
  const isWishlisted = isInWishlist(gameId);

  return (
    <div className="game-details-page">
      <div className="details-left">
        <h1 className="hero-title-main">{game.title}</h1>
        
        <div className="game-customer-rating">
          <div className="star-rating">
            <FaStar className="star-icon" />
            <span>{game.rating || "4.8"}</span>
          </div>
          <div className="nav-divider-small"></div>
          <div className="epic-rating-tag">Epic Rating</div>
        </div>

        <div className="details-banner-container">
          <img src={game.banner || game.image} alt={game.title} className="details-banner-img" />
        </div>

        <div className="details-content">
          <h2 className="section-title">About This Game</h2>
          <p className="details-description">{game.description}</p>
          
          <div className="details-metadata-grid">
            <div className="genre-section">
              <h3 className="section-subtitle">Genres</h3>
              <div className="tag-container">
                {game.tags && game.tags.map((tag, idx) => (
                  <span key={idx} className="genre-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="details-right">
        <div className="details-buy-box">
          <div className="age-rating-box">
            <div className="rating-badge">18+</div>
            <div className="rating-desc">Extreme Violence, Strong Language</div>
          </div>

          <span className="card-type">Base Game</span>
          <div className="details-price-tag">
            {!game.price || game.price === 0 ? "Free" : `₹${game.price.toLocaleString()}`}
          </div>
          
          <div className="buy-btns-row">
            {isInLibrary ? (
              <button 
                className="buy-button in-library"
                onClick={() => navigate("/library")}
              >
                <FaThLarge /> In Library
              </button>
            ) : (
              <button 
                className="buy-button"
                onClick={() => {
                  addToCart(game);
                  toast.success(`${game.title} added to cart!`);
                }}
              >
                Buy Now
              </button>
            )}
          </div>

          <button 
            className={`add-wishlist-btn ${isWishlisted ? "active" : ""}`}
            onClick={() => {
              toggleWishlist(game);
              if (!isWishlisted) {
                toast.success(`${game.title} added to wishlist!`);
              } else {
                toast.info(`${game.title} removed from wishlist`);
              }
            }}
          >
            <FaPlusCircle /> {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
          </button>

          <button 
            className="add-wishlist-btn gift-btn"
            onClick={() => {
              addGift(game);
              toast.success(`${game.title} added to gifts!`);
              navigate("/gift");
            }}
          >
            <FaGift /> Gift 
            <span className="gift-new-badge">New!</span>
          </button>

          <div className="details-meta-list">
            <div className="meta-row">
              <span className="meta-label">Epic Rewards</span>
              <span className="meta-value accent-blue">Earn 5% Back</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Developer</span>
              <span className="meta-value">{game.developer || "Unknown"}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Publisher</span>
              <span className="meta-value">{game.publisher || "Unknown"}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Release Date</span>
              <span className="meta-value">{game.release || "TBD"}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Platform</span>
              <span className="meta-value"><FaWindows /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;