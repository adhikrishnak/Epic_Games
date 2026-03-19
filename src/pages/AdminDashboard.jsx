import { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";
import { FaEdit, FaTrash, FaPlus, FaCloudUploadAlt } from "react-icons/fa";

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
    tags: "",
    rating: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFree = String(form.price).toLowerCase() === "free" || Number(form.price) === 0;

    if (!form.title || (form.price === "" && form.price !== 0)) {
      alert("Title and price are required!");
      return;
    }

    const payload = {
      ...form,
      price: isFree ? 0 : Number(form.price) || 0,
      tags: typeof form.tags === "string" ? form.tags.split(",").map(t => t.trim()).filter(t => t) : form.tags,
    };

    if (editingId) {
      updateGame(editingId, payload);
      setEditingId(null);
    } else {
      addGame(payload);
    }

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
      tags: "",
      rating: "",
    });
  };

  const handleEdit = (game) => {
    setForm({
      ...game,
      tags: Array.isArray(game.tags) ? game.tags.join(", ") : "",
    });
    setEditingId(game._id || game.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="admin-page">
      <h1 className="hero-title-main" style={{ marginBottom: "40px" }}>
        {editingId ? "Edit Game" : "Add New Game"}
      </h1>

      <form onSubmit={handleSubmit} className="admin-form">
        <h3>General Information</h3>
        <input
          type="text"
          placeholder="Game Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price (e.g., 1499 or Free)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        
        <input
          type="text"
          placeholder="Portrait Image URL (Thumbnail)"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <input
          type="text"
          placeholder="Landscape Banner URL (Hero)"
          value={form.banner}
          onChange={(e) => setForm({ ...form, banner: e.target.value })}
        />

        <textarea
          placeholder="Game Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <h3>Details & Metadata</h3>
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
          placeholder="Release Date (e.g. Oct 20, 2023)"
          value={form.release}
          onChange={(e) => setForm({ ...form, release: e.target.value })}
        />
        <input
          type="text"
          placeholder="Rating (0-5)"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
        />
        <input
          className="full-width"
          type="text"
          placeholder="Genres / Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Feature this game on Home Page
        </label>

        {form.image && (
          <div className="preview">
            <img src={form.image} alt="Preview" />
          </div>
        )}

        <button className="primary" type="submit">
          {editingId ? <><FaCloudUploadAlt /> Update Game</> : <><FaPlus /> Add Game to Store</>}
        </button>
        {editingId && (
          <button type="button" className="secondary" onClick={() => setEditingId(null)}>Cancel Edit</button>
        )}
      </form>

      <h2 className="section-title" style={{ marginBottom: "20px" }}>Management List ({games.length} Games)</h2>
      <div className="admin-list">
        {games.map((game) => (
          <div key={game._id || game.id} className="admin-item">
            <img src={game.image} alt={game.title} className="admin-thumb" />
            <span>{game.title}</span>
            <div className="admin-actions">
              <button className="secondary" onClick={() => handleEdit(game)}>
                <FaEdit /> Edit
              </button>
              <button className="admin-btn-delete" onClick={() => deleteGame(game._id || game.id)}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;