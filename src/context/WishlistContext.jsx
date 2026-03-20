import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { currentUser, refreshUser } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (currentUser?.wishlist) {
      setWishlistItems(currentUser.wishlist);
    } else {
      setWishlistItems([]);
    }
  }, [currentUser]);

  const toggleWishlist = async (game) => {
    if (!currentUser) return;
    try {
      const resp = await fetch("/api/users/wishlist/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentUser.email, gameId: game._id || game.id }),
      });
      if (resp.ok) {
        await refreshUser();
      }
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };

  const removeFromWishlist = async (id) => {
    if (!currentUser || !isInWishlist(id)) return;

    try {
      const resp = await fetch("/api/users/wishlist/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentUser.email, gameId: id }),
      });

      if (resp.ok) {
        await refreshUser();
      }
    } catch (err) {
      console.error("Wishlist remove error:", err);
    }
  };

  const isInWishlist = (id) => {
    return wishlistItems.some((item) => {
      const itemId = typeof item === "string" ? item : (item._id || item.id);
      return String(itemId) === String(id);
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
