import { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const GiftContext = createContext();

export const GiftProvider = ({ children }) => {
  const { currentUser, refreshUser } = useContext(AuthContext);

  const addGift = async (game) => {
    if (!currentUser) return;
    try {
      const resp = await fetch("/api/users/gifts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentUser.email, gameId: game._id || game.id }),
      });
      if (resp.ok) {
        await refreshUser();
      }
    } catch (err) {
      console.error("Gift error:", err);
    }
  };

  const removeGift = async (id) => {
    if (!currentUser) return;
    // For now, removing a gift could be similar to removing from cart
    // But usually gifts are managed in the send-to-friend flow
  };

  return (
    <GiftContext.Provider
      value={{
        giftItems: currentUser?.gifts || [],
        addGift,
        removeGift,
      }}
    >
      {children}
    </GiftContext.Provider>
  );
};