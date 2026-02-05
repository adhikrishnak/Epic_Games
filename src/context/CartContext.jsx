import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser, updateUserData } = useContext(AuthContext);


  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add to cart
  const addToCart = (game) => {
  const updatedCart = [...cartItems, game];
  setCartItems(updatedCart);

  if (currentUser) {
    const updatedUser = { ...currentUser, cart: updatedCart };
    updateUserData(updatedUser);
  }
};


  // ✅ Remove from cart
  const removeFromCart = (id) => {
  const updatedCart = cartItems.filter((g) => g.id !== id);
  setCartItems(updatedCart);

  if (currentUser) {
    const updatedUser = { ...currentUser, cart: updatedCart };
    updateUserData(updatedUser);
  }
};


  // ✅ Checkout → move cart to library
  const checkout = () => {
  console.log("Checkout triggered", cartItems);

  if (currentUser) {
    const updatedUser = {
      ...currentUser,
      library: [...(currentUser.library || []), ...cartItems],
      cart: [],
    };

    updateUserData(updatedUser);
  }

  setCartItems([]);
  localStorage.removeItem("cart");
};


  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};