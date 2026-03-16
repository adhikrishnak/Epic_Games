import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { GameContext } from "../context/GameContext";
import { WishlistContext } from "../context/WishlistContext";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const Home = () => {
  const { games } = useContext(GameContext);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  // ✅ Auto slideshow every 5s
  useEffect(() => {
    if (games.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % games.length);
      setExpanded(false); // collapse description when slide changes
    }, 5000);
    return () => clearInterval(timer);
  }, [games.length]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % games.length);
    setExpanded(false);
  };
  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + games.length) % games.length);
    setExpanded(false);
  };

  const game = games.length > 0 ? games[index] : null;

  return (
    <div className="home">
      {/* HERO SECTION */}
      {game && (
        <section
          className="hero"
          style={{
            backgroundImage: `url(${game.banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            position: "relative",
          }}
        >
          <motion.div
            key={game.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1 className="hero-title">{game.title}</h1>

            <p className="hero-detail">
              {expanded
                ? game.description
                : game.description?.slice(0, 150) + "..."}
            </p>
            {game.description && game.description.length > 150 && (
              <button
                className="see-more"
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? "See less" : "See more"}
              </button>
            )}

            <div className="hero-price-label">
              {!game.price || game.price === 0 ? "Free" : `₹${game.price}`}
            </div>

            <div className="hero-buttons">
              <button className="primary" onClick={() => navigate(`/game/${game.id}`)}>
                {!game.price || game.price === 0 ? "Play For Free" : `Buy Now`}
              </button>
              <button className="wishlist" onClick={() => {
                addToWishlist(game);
                toast.success(`${game.title} added to wishlist!`);
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path>
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Navigation Arrows */}
          <div className="hero-nav">
            <button onClick={prevSlide}><FaArrowLeft /></button>
            <button onClick={nextSlide}><FaArrowRight /></button>
          </div>
        </section>
      )}

      {/* POPULAR GAMES */}
      <section className="game-row">
        <h2>Popular Games</h2>
        <div className="game-grid">
          {games.map((g) => (
            <div
              key={g.id}
              className="game-card"
              onClick={() => navigate(`/game/${g.id}`)}
            >
              <img src={g.image} alt={g.title} />
              <div>
                <h3>{g.title}</h3>
                <span>{!g.price || g.price === 0 ? "Free" : `₹${g.price}`}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;