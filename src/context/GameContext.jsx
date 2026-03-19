import { createContext, useState, useEffect } from "react";

export const GameContext = createContext();

const API_URL = "/api/games";
const FALLBACK_GAMES_URL = "/games.json";

const mapGames = (data) =>
  (data || []).map((g) => ({
    ...g,
    id: g._id || g.id,
  }));

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState(() => {
    const savedGames = localStorage.getItem("cached_games");
    return savedGames ? JSON.parse(savedGames) : [];
  });
  const [loading, setLoading] = useState(!games.length); // Only show loading if cache is empty

  // ✅ Load games from backend
  useEffect(() => {
    fetchGames();
  }, []);

  const loadFallbackGames = async () => {
    const res = await fetch(FALLBACK_GAMES_URL);
    if (!res.ok) {
      throw new Error(`Fallback games request failed with status ${res.status}`);
    }

    const data = await res.json();
    const mapped = mapGames(data);
    setGames(mapped);
    localStorage.setItem("cached_games", JSON.stringify(mapped));
  };

  const fetchGames = async () => {
    setLoading(true); // Always set loading to true while fetching for sync awareness
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        console.error("Server returned error:", res.status);
        await loadFallbackGames();
        return;
      }
      const data = await res.json();
      const mapped = mapGames(data);
      setGames(mapped);
      localStorage.setItem("cached_games", JSON.stringify(mapped));
    } catch (err) {
      console.error("Failed to fetch games from API:", err);
      try {
        await loadFallbackGames();
      } catch (fallbackErr) {
        console.error("Failed to load fallback games:", fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  };

  const addGame = async (gameData) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gameData),
      });

      if (!res.ok) throw new Error("Failed to add game");

      const newGame = await res.json();
      // Ensure the new game has 'id' property for frontend
      const mappedNewGame = { ...newGame, id: newGame._id };
      
      setGames((prev) => [mappedNewGame, ...prev]);
      return mappedNewGame;
    } catch (err) {
      console.error("Failed to add game:", err);
      throw err;
    }
  };

  const updateGame = async (id, updatedData) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update game");

      const updatedGame = await res.json();
      const mappedUpdatedGame = { ...updatedGame, id: updatedGame._id };

      setGames((prev) =>
        prev.map((g) => (g.id === id ? mappedUpdatedGame : g))
      );
    } catch (err) {
      console.error("Failed to update game:", err);
      throw err;
    }
  };

  const deleteGame = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete game");

      setGames((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      console.error("Failed to delete game:", err);
      throw err;
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
