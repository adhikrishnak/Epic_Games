import { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { currentUser, setUsers, setCurrentUser } = useContext(AuthContext);

  const addToWishlist = (game) => {
    if (!currentUser) return;
    const updatedWishlist = [...(currentUser.wishlist || []), game];
    const updatedUser = { ...currentUser, wishlist: updatedWishlist };

    setUsers((prev) =>
      prev.map((u) => (u.email === updatedUser.email ? updatedUser : u))
    );
    setCurrentUser(updatedUser);
  };

  const removeFromWishlist = (id) => {
    if (!currentUser) return;
    const updatedWishlist = (currentUser.wishlist || []).filter((g) => g.id !== id);
    const updatedUser = { ...currentUser, wishlist: updatedWishlist };

    setUsers((prev) =>
      prev.map((u) => (u.email === updatedUser.email ? updatedUser : u))
    );
    setCurrentUser(updatedUser);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems: currentUser?.wishlist || [],
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};