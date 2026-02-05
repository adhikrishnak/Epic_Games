import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = () => {
  const { cartItems, removeFromCart, checkout } = useContext(CartContext);
  const [checkedOut, setCheckedOut] = useState(false);
  const navigate = useNavigate();

  // ✅ Force price to be numeric
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item?.price || 0),
    0
  );

  const handleCheckout = () => {
    checkout();
    setCheckedOut(true);
    setTimeout(() => navigate("/library"), 1500);
  };

  return (
    <div className="epic-cart">
      <div className="cart-items">
        <h1>My Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) =>
            item && item.id ? (
              <div key={item.id} className="cart-game">
                <img
                  src={item.image || "/images/placeholder.jpg"}
                  alt={item.title || "Untitled"}
                />
                <div className="cart-details">
                  <h2>{item.title || "Untitled Game"}</h2>
                  <p className="edition">Base Game</p>
                  <p className="price">₹{Number(item.price) || 0}</p>
                  <p className="meta">Self-Refundable · Earn 5% Back</p>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ) : null
          )
        )}
      </div>

      <div className="cart-summary">
        <h2>Games and Apps Summary</h2>
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <button className="checkout" onClick={handleCheckout}>
          Check Out
        </button>
        <p className="rewards">Epic Rewards Balance: ₹74.98</p>

        {checkedOut && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="checkout-confirm"
          >
            ✅ Purchase Complete! Redirecting to Library...
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;