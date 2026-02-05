import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const GameContext = createContext();

const initialGames = [
  {
    id: uuidv4(),
    title: "Genshin Impact",
    tagline: "A futuristic open-world RPG.",
    rating: "4.6",
    tags: ["Character Customization", "Great for Beginners"],
    price: 1999,
    image: "/images/genshin.jpg",
    banner: "/images/genshin-banner.jpg",
    description: "Explore Teyvat with Zibai and Columbina in this massive update.",
    developer: "miHoYo",
    publisher: "miHoYo",
    release: "Jan 2026",
    refund: "Self-Refundable",
    rewards: "Earn 5% Back",
    featured: true,
  },
  {
    id: uuidv4(),
    title: "Black Ops 6",
    tagline: "Tactical shooter with stealth mechanics.",
    rating: "4.3",
    tags: ["Multiplayer", "Shooter"],
    price: 1499,
    image: "/images/shadow.jpg",
    banner: "/images/blackops-banner.jpg",
    description: "Engage in covert missions with advanced weaponry and tactical gameplay.",
    developer: "Activision",
    publisher: "Activision",
    release: "Dec 2025",
    refund: "Self-Refundable",
    rewards: "Earn 5% Back",
    featured: false,
  },
  {
    id: uuidv4(),
    title: "Forza 5",
    tagline: "High-octane racing experience.",
    rating: "4.8",
    tags: ["Racing", "Open World"],
    price: 999,
    image: "/images/forza5.jpg",
    banner: "/images/forza-banner.jpg",
    description: "Race across stunning landscapes with realistic physics and dynamic weather.",
    developer: "Playground Games",
    publisher: "Xbox Game Studios",
    release: "Nov 2025",
    refund: "Self-Refundable",
    rewards: "Earn 5% Back",
    featured: false,
  },
];

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState(() => {
    const saved = localStorage.getItem("games");
    return saved ? JSON.parse(saved) : initialGames;
  });

  useEffect(() => {
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  const addGame = (game) => {
    const newGame = {
      id: uuidv4(),
      title: game.title || "Untitled Game",
      price: Number(game.price) || 0,
      image: game.image || "/images/placeholder.jpg",
      banner: game.banner || "/images/placeholder-banner.jpg",
      description: game.description || "No description available",
      developer: game.developer || "Unknown",
      publisher: game.publisher || "Unknown",
      release: game.release || "TBA",
      refund: "Self-Refundable",
      rewards: "Earn 5% Back",
      featured: game.featured || false,
    };
    setGames((prev) => [...prev, newGame]);
  };

  const updateGame = (id, updatedData) => {
    setGames((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updatedData } : g))
    );
  };

  const [searchQuery, setSearchQuery] = useState(""); // ✅ new state


  const deleteGame = (id) => {
    setGames((prev) => prev.filter((g) => g.id !== id));
  };

  // ✅ Helper for Navbar search
  const searchGames = (query) => {
    if (!query.trim()) return [];
    return games.filter((g) =>
      g.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <GameContext.Provider value={{ games, addGame, updateGame, deleteGame, searchGames }}>
      {children}
    </GameContext.Provider>
  );
};