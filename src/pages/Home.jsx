import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { GameContext } from "../context/GameContext";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const { games } = useContext(GameContext);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

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
            <p className="hero-subtitle">MAJOR UPDATE — {game.release}</p>

            {/* ✅ Description with See More */}
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

            <div className="hero-buttons">
              <button onClick={() => navigate(`/game/${game.id}`)}>
                Play For Free
              </button>
              <button className="secondary" onClick={() => addToCart(game)}>
                Add to Cart ₹{game.price}
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
                <span>₹{g.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;