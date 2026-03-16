import { createContext, useState, useEffect } from "react";

export const GameContext = createContext();

const API_URL = "/api/games";

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load games from localStorage or fetch from JSON
  useEffect(() => {
    const savedGames = localStorage.getItem("epic_games_catalog");
    if (savedGames) {
      setGames(JSON.parse(savedGames));
      setLoading(false);
    } else {
      fetchGames();
    }
  }, []);

  // ✅ Auto-save changes to localStorage
  useEffect(() => {
    if (games.length > 0) {
      localStorage.setItem("epic_games_catalog", JSON.stringify(games));
    }
  }, [games]);

  const fetchGames = async () => {
    try {
      const res = await fetch("/games.json");
      const data = await res.json();

      const mapped = data.map((g, idx) => ({
        ...g,
        id: g._id || g.id || `game-${idx}`
      }));
      setGames(mapped);
    } catch (err) {
      console.error("Failed to fetch games from JSON:", err);
    } finally {
      setLoading(false);
    }
  };

  const addGame = async (game) => {
    try {
      // In static mode, we just update local state
      const newGame = {
        ...game,
        id: `game-${Date.now()}`,
        price: Number(game.price) || 0
      };
      setGames((prev) => [newGame, ...prev]);
    } catch (err) {
      console.error("Failed to add game locally:", err);
    }
  };

  const updateGame = async (id, updatedData) => {
    setGames((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updatedData } : g))
    );
  };

  const deleteGame = async (id) => {
    setGames((prev) => prev.filter((g) => g.id !== id));
  };

  // Search helper for Navbar
  const searchGames = (query) => {
    if (!query.trim()) return [];
    return games.filter((g) =>
      g.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <GameContext.Provider
      value={{ games, loading, addGame, updateGame, deleteGame, searchGames }}
    >
      {children}
    </GameContext.Provider>
  );
};