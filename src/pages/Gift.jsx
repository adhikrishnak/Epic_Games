import { useContext } from "react";
import { GiftContext } from "../context/GiftContext";
import { motion } from "framer-motion";

const Gift = () => {
  const { giftItems, removeGift } = useContext(GiftContext);

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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <img src={gift.image} alt={gift.title} />
            <div className="epic-card-info">
              <h3>{gift.title}</h3>
              <p>₹{gift.price}</p>
              <button
                className="epic-btn secondary"
                onClick={() => removeGift(gift.id)}
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