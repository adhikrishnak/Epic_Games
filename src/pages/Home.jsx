import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { GameContext } from "../context/GameContext";
import { WishlistContext } from "../context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
import GameCard from "../components/GameCard";

const Home = () => {
  const { games, loading } = useContext(GameContext);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ Auto slideshow every 5s
  useEffect(() => {
    if (games.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % Math.min(games.length, 6));
    }, 6000);
    return () => clearInterval(timer);
  }, [games.length]);

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">UNREAL ENGINE</p>
    </div>
  );

  const featuredGames = games.slice(0, 6);
  const activeGame = featuredGames[activeIndex] || featuredGames[0];

  if (!activeGame && !loading) {
    return (
      <div className="home">
        <div className="empty-state">
          <h2>No games found</h2>
          <p>Please check your database connection or seed the database.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <div 
          className="hero-main"
          onClick={() => navigate(`/game/${activeGame.id}`)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeGame.id}
              src={activeGame.banner || activeGame.image}
              alt={activeGame.title}
              className="hero-banner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          <div className="hero-content">
            <span className="hero-tag">Out Now</span>
            <h1 className="hero-title-main">{activeGame.title}</h1>
            <p className="hero-description">{activeGame.description?.slice(0, 160)}...</p>
            <div className="hero-actions">
              <button className="primary">Buy Now</button>
            </div>
          </div>
        </div>

        <div className="hero-sidebar">
          {featuredGames.map((game, idx) => (
            <div
              key={game.id}
              className={`hero-thumbnail ${idx === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(idx)}
            >
              <img src={game.image} alt={game.title} className="thumb-img" />
              <span className="thumb-title">{game.title}</span>
              {idx === activeIndex && <div className="thumb-progress"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* GAMES GRID */}
      <section className="browse-section">
        <div className="section-header">
          <h2 className="section-title">Games Discover</h2>
          <button className="secondary">View More</button>
        </div>
        <div className="game-grid">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;