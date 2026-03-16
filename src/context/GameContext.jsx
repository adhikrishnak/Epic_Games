import { createContext, useState, useEffect } from "react";

export const GameContext = createContext();

const API_PATH = "/api/games";
// ✅ Dynamic API URL: Use VITE_API_URL from Vercel/Dashbord in production
const BASE_URL = import.meta.env.VITE_API_URL || "";

const API_URL = `${BASE_URL}${API_PATH}`;

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch from Backend
  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      const mapped = data.map((g) => ({
        ...g,
        id: g._id || g.id
      }));
      setGames(mapped);
    } catch (err) {
      console.error("Failed to fetch games from API:", err);
    } finally {
      setLoading(false);
    }
  };

  const addGame = async (game) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...game,
          price: Number(game.price) || 0
        }),
      });
      const saved = await res.json();
      const newGame = { ...saved, id: saved._id };
      setGames((prev) => [newGame, ...prev]);
    } catch (err) {
      console.error("Failed to add game to database:", err);
    }
  };

  const updateGame = async (id, updatedData) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const updated = await res.json();
      const mappedGame = { ...updated, id: updated._id };
      setGames((prev) =>
        prev.map((g) => (g.id === id ? mappedGame : g))
      );
    } catch (err) {
      console.error("Failed to update game in database:", err);
    }
  };

  const deleteGame = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setGames((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      console.error("Failed to delete game from database:", err);
    }
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