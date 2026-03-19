import { useContext, useState } from "react";
import { GiftContext } from "../context/GiftContext";
import { AuthContext } from "../context/AuthContext";
import { GameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaGift, FaTrash, FaSearch, FaTimes, FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const UserSelectionModal = ({ isOpen, onClose, game, onSend }) => {
  const { users } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user => 
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        className="modal-content gifting-modal" 
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
      >
        <div className="modal-header">
          <h3>Send "{game?.title}" to a Friend</h3>
          <button className="close-btn" onClick={onClose}><FaTimes /></button>
        </div>

        <div className="modal-body">
          <div className="search-bar modal-search">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by display name or email" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>

          <div className="user-list">
            {filteredUsers.length === 0 ? (
              <div className="no-users">No users found</div>
            ) : (
              filteredUsers.map(user => (
                <div key={user.email} className="user-item">
                  <div className="user-info">
                    <div className="user-avatar-mini"><FaUserAlt /></div>
                    <div className="user-text">
                      <span className="user-display-name">{user.displayName}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                  </div>
                  <button 
                    className="send-btn-small"
                    onClick={() => onSend(user.email)}
                  >
                    Send
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="modal-footer">
          <p className="footer-note">This game will be added directly to your friend's library.</p>
        </div>
      </motion.div>
    </div>
  );
};

const Gift = () => {
  const { giftItems: rawGifts, removeGift } = useContext(GiftContext);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const { games, loading } = useContext(GameContext);
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const giftItems = (rawGifts || []).map(item => {
    if (typeof item === 'string') {
      return games.find(g => String(g._id || g.id) === item);
    }
    return item;
  }).filter(Boolean);

  if (loading && giftItems.length === 0 && (rawGifts?.length || 0) > 0) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">SYNCING GIFTS</p>
    </div>
  );

  const handleOpenModal = (game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleSendGift = async (recipientEmail) => {
    try {
      const resp = await fetch("/api/users/send-gift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderEmail: currentUser.email,
          recipientEmail: recipientEmail,
          gameId: selectedGame._id || selectedGame.id
        })
      });

      if (resp.ok) {
        toast.success(`"${selectedGame.title}" sent to ${recipientEmail}!`);
        setIsModalOpen(false);
        // Refresh currentUser state localy (optimistic or re-fetch)
        const updatedGifts = (currentUser.gifts || []).filter(g => (g._id || g.id) !== (selectedGame._id || selectedGame.id));
        setCurrentUser({ ...currentUser, gifts: updatedGifts });
      } else {
        const data = await resp.json();
        toast.error(data.message || "Failed to send gift");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div className="collection-page">
      <div className="collection-header">
        <h1 className="hero-title-main">Gifts</h1>
      </div>

      {giftItems.length === 0 ? (
        <div className="empty-state">
          <FaGift className="empty-icon" />
          <h2>Your Gift box is empty.</h2>
          <p>Gifting games is a great way to share the fun with your friends!</p>
          <button className="primary" onClick={() => navigate("/")}>Explore Store</button>
        </div>
      ) : (
        <div className="game-grid">
          {giftItems.map((game, index) => (
            <motion.div
              key={`${game._id || game.id}-${index}`}
              className="game-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="card-image-wrapper" onClick={() => navigate(`/game/${game._id || game.id}`)}>
                <img src={game.image} alt={game.title} className="card-image" />
              </div>
              <div className="card-info">
                <span className="card-type">Gifted Game</span>
                <h4 className="card-title">{game.title}</h4>
                <div className="collection-actions">
                  <button 
                    className="add-to-cart-btn-collection"
                    onClick={() => handleOpenModal(game)}
                  >
                    Send to Friend
                  </button>
                  <button 
                    className="remove-btn-icon" 
                    title="Remove Gift"
                    onClick={() => {
                      removeGift(game._id || game.id);
                      toast.info(`${game.title} removed from gifts`);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <UserSelectionModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            game={selectedGame}
            onSend={handleSendGift}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gift;