import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { GameContext } from "../context/GameContext";
import GameCard from "../components/GameCard";

const Browse = () => {
  const [searchParams] = useSearchParams();
  const { games, loading } = useContext(GameContext);

  const query = searchParams.get("search") || "";
  const [filtered, setFiltered] = useState([]);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    if (!games) return;
    let result = [...games].filter(game =>
      game.title.toLowerCase().includes(query.toLowerCase())
    );

    if (sort === "low") result.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sort === "high") result.sort((a, b) => (b.price || 0) - (a.price || 0));

    setFiltered(result);
  }, [query, sort, games]);

  if (loading) return <div className="loading">Loading Games...</div>;

  return (
    <div className="home browse-page">
      <div className="section-header">
        <h1 className="section-title">
          {query ? `Results for "${query}"` : "Browse Games"}
        </h1>
        <div className="browse-filters">
          <select className="sort-select" onChange={(e) => setSort(e.target.value)}>
            <option value="default">Sort by: Relevance</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="game-grid">
        {filtered.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
        {filtered.length === 0 && <p className="no-results">No games found matching your search.</p>}
      </div>
    </div>
  );
};

export default Browse;