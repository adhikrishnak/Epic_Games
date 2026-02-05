import { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";
import { v4 as uuidv4 } from "uuid";

const AdminDashboard = () => {
  const { games, addGame, updateGame, deleteGame } = useContext(GameContext);
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    banner: "",
    featured: false,
    description: "",
    developer: "",
    publisher: "",
    release: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.price) {
      alert("Title and price are required!");
      return;
    }

    if (editingId) {
      // ✅ Update existing game
      updateGame(editingId, form);
      setEditingId(null);
    } else {
      // ✅ Add new game with required fields
      const newGame = {
        id: uuidv4(), // unique ID
        title: form.title,
        price: Number(form.price) || 0,
        image: form.image || "/images/placeholder.jpg",
        banner: form.banner || "/images/placeholder-banner.jpg",
        featured: form.featured,
        description: form.description || "No description available",
        developer: form.developer || "Unknown",
        publisher: form.publisher || "Unknown",
        release: form.release || "TBA",
        refund: "Self-Refundable",
        rewards: "Earn 5% Back",
      };
      addGame(newGame);
    }

    // reset form
    setForm({
      title: "",
      price: "",
      image: "",
      banner: "",
      featured: false,
      description: "",
      developer: "",
      publisher: "",
      release: "",
    });
  };

  const handleEdit = (game) => {
    setForm(game);
    setEditingId(game.id);
  };

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          placeholder="Game Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <input
          type="text"
          placeholder="Banner URL"
          value={form.banner}
          onChange={(e) => setForm({ ...form, banner: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Developer"
          value={form.developer}
          onChange={(e) => setForm({ ...form, developer: e.target.value })}
        />
        <input
          type="text"
          placeholder="Publisher"
          value={form.publisher}
          onChange={(e) => setForm({ ...form, publisher: e.target.value })}
        />
        <input
          type="text"
          placeholder="Release Date"
          value={form.release}
          onChange={(e) => setForm({ ...form, release: e.target.value })}
        />

        <label>
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Featured
        </label>

        {form.image && (
          <div className="preview">
            <img src={form.image} alt="Preview" />
          </div>
        )}

        <button>{editingId ? "Update Game" : "Add Game"}</button>
      </form>

      <div className="admin-list">
        {games.map((game) => (
          <div key={game.id} className="admin-item">
            <img src={game.image} alt={game.title} className="admin-thumb" />
            <span>{game.title}</span>
            <div>
              <button className="secondary" onClick={() => handleEdit(game)}>
                Edit
              </button>
              <button className="admin" onClick={() => deleteGame(game.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;