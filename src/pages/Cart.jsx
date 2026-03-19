import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { GameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaShoppingBag, FaShieldAlt } from "react-icons/fa";

const Cart = () => {
  const { cartItems: rawCart, removeFromCart, checkout } = useContext(CartContext);
  const { games, loading } = useContext(GameContext);
  const [checkedOut, setCheckedOut] = useState(false);
  const navigate = useNavigate();

  const cartItems = (rawCart || []).map(item => {
    if (typeof item === 'string') {
      return games.find(g => String(g._id || g.id) === item);
    }
    return item;
  }).filter(Boolean);

  if (loading && cartItems.length === 0 && (rawCart?.length || 0) > 0 && !checkedOut) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">SYNCING CART</p>
      </div>
    );
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item?.price || 0),
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    checkout();
    setCheckedOut(true);
    setTimeout(() => navigate("/library"), 2000);
  };

  if (cartItems.length === 0 && !checkedOut) {
    return (
      <div className="collection-page">
        <div className="empty-state">
          <FaShoppingBag className="empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Check out our store for some great titles.</p>
          <button className="primary" onClick={() => navigate("/")}>Shop for Games</button>
        </div>
      </div>
    );
  }

  return (
    <div className="collection-page">
      <h1 className="hero-title-main">My Cart</h1>
      <div className="cart-container">
        <div className="cart-left">
          <div className="cart-items-list">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div 
                  key={item._id || item.id} 
                  className="cart-item-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="cart-item-img-wrapper" onClick={() => navigate(`/game/${item._id || item.id}`)}>
                    <img src={item.image} alt={item.title} className="cart-item-img" />
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-header">
                      <span className="card-type">Base Game</span>
                      <h3 className="cart-item-title">{item.title}</h3>
                    </div>
                    <div className="cart-item-utils">
                      <span className="self-refund-tag"><FaShieldAlt /> Self-Refundable</span>
                    </div>
                    <div className="cart-item-actions">
                      <button className="remove-btn" onClick={() => removeFromCart(item._id || item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-price">
                    <span>₹{Number(item.price || 0).toLocaleString()}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="cart-right">
          <div className="details-buy-box cart-summary-box">
            <h2 className="section-title">Games and Apps Summary</h2>
            <div className="summary-details">
              <div className="meta-row">
                <span className="meta-label">Subtotal</span>
                <span className="meta-value">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="meta-row total-row">
                <span className="meta-label">Total</span>
                <span className="meta-value">₹{subtotal.toLocaleString()}</span>
              </div>
            </div>
            <button 
              className="buy-button" 
              onClick={handleCheckout}
              disabled={checkedOut}
            >
              Check Out
            </button>
            <p className="secondary-text center-text">Earn 5% Back in Epic Rewards</p>
          </div>
        </div>
      </div>

      {checkedOut && (
        <motion.div 
          className="checkout-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="checkout-modal">
            <div className="success-icon">✓</div>
            <h2>Thank you for your purchase!</h2>
            <p>Your receipt has been emailed to you.</p>
            <p className="redirect-text">Redirecting to Library...</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;