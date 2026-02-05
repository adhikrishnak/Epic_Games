import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { GameContext } from "../context/GameContext";

const Browse = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { games } = useContext(GameContext);

  const query = searchParams.get("search") || "";
  const [filtered, setFiltered] = useState(games);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    let result = games.filter(game =>
      game.title.toLowerCase().includes(query.toLowerCase())
    );

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    else if (sort === "high") result.sort((a, b) => b.price - a.price);

    setFiltered(result);
  }, [query, sort, games]);

  return (
    <div className="browse">
      <div className="browse-header">
        <h1>Browse Games</h1>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="default">Sort by</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="browse-grid">
        {filtered.map(game => (
          <div key={game.id} className="browse-card" onClick={() => navigate(`/game/${game.id}`)}>
            <img src={game.image} alt={game.title} />
            <div>
              <h3>{game.title}</h3>
              <span>₹{game.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;