import { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser, updateUserData } = useContext(AuthContext);

  // ✅ Add to cart
  const addToCart = (game) => {
    if (!currentUser) return;

    const updatedCart = [...(currentUser.cart || []), game];
    const updatedUser = { ...currentUser, cart: updatedCart };

    updateUserData(updatedUser);
  };

  // ✅ Remove from cart
  const removeFromCart = (id) => {
    if (!currentUser) return;

    const updatedCart = (currentUser.cart || []).filter((g) => g.id !== id);
    const updatedUser = { ...currentUser, cart: updatedCart };

    updateUserData(updatedUser);
  };

  // ✅ Checkout → move cart to library
  const checkout = () => {
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      library: [...(currentUser.library || []), ...(currentUser.cart || [])],
      cart: [],
    };

    updateUserData(updatedUser);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: currentUser?.cart || [],
        addToCart,
        removeFromCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};