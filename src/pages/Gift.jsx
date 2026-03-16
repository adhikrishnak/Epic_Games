import { useContext } from "react";
import { GiftContext } from "../context/GiftContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Gift = () => {
  const { giftItems, removeGift } = useContext(GiftContext);
  const navigate = useNavigate();

  if (!giftItems || giftItems.length === 0) {
    return (
      <div className="gift empty-gift">
        <h1>Your Gifts</h1>
        <p>No gifts yet.</p>
      </div>
    );
  }

  return (
    <div className="gift epic-page">
      <h1 className="epic-title">My Gifts</h1>
      <div className="epic-grid">
        {giftItems.map((gift, index) => (
          <motion.div
            key={`${gift.id}-${index}`} // ✅ unique key
            className="epic-card"
            onClick={() => navigate(`/game/${gift.id}`)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <img src={gift.image} alt={gift.title} />
            <div className="epic-card-info">
              <h3>{gift.title}</h3>
              <p>{!gift.price || gift.price === 0 ? "Free" : `₹${gift.price}`}</p>
              <button
                className="epic-btn secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  removeGift(gift.id);
                }}
              >
                Remove
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gift;