import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser, refreshUser } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  // Sync internal state with currentUser.cart
  useEffect(() => {
    if (currentUser?.cart) {
      setCartItems(currentUser.cart);
    } else {
      setCartItems([]);
    }
  }, [currentUser]);

  const addToCart = async (game) => {
    if (!currentUser) return;
    try {
      const resp = await fetch("/api/users/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentUser.email, gameId: game._id || game.id }),
      });
      if (resp.ok) {
        await refreshUser();
      }
    } catch (err) {
      console.error("Cart error:", err);
    }
  };

  const removeFromCart = async (gameId) => {
    if (!currentUser) return;
    try {
      const resp = await fetch("/api/users/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentUser.email, gameId }),
      });
      if (resp.ok) {
        await refreshUser();
      }
    } catch (err) {
      console.error("Cart error:", err);
    }
  };

  const clearCart = async () => {
    // Implement clear on backend if needed, or just iterate removes
    // For now, we'll assume checkout clears it
  };

  const checkout = async () => {
    if (!currentUser) return;
    try {
      const resp = await fetch("/api/users/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentUser.email }),
      });
      if (resp.ok) {
        await refreshUser();
        return true;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
    return false;
  };

  // Calculate total, handling both objects and potential ID strings from cache
  const cartTotal = cartItems.reduce((total, item) => {
    // If it's a string ID, we can't get the price without the games list, but Cart.jsx handles re-population for display.
    // However, to be safe here, we try to use it if it's an object.
    const price = typeof item === 'object' ? (parseFloat(item.price) || 0) : 0;
    return total + price;
  }, 0).toFixed(2);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};