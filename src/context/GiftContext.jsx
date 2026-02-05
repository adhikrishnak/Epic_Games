import { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const GiftContext = createContext();

export const GiftProvider = ({ children }) => {
  const { currentUser, setUsers, setCurrentUser } = useContext(AuthContext);

  const addGift = (gift) => {
    if (!currentUser) return;
    const updatedGifts = [...(currentUser.gifts || []), gift];
    const updatedUser = { ...currentUser, gifts: updatedGifts };

    setUsers((prev) =>
      prev.map((u) => (u.email === updatedUser.email ? updatedUser : u))
    );
    setCurrentUser(updatedUser);
  };

  const removeGift = (id) => {
    if (!currentUser) return;
    const updatedGifts = (currentUser.gifts || []).filter((g) => g.id !== id);
    const updatedUser = { ...currentUser, gifts: updatedGifts };

    setUsers((prev) =>
      prev.map((u) => (u.email === updatedUser.email ? updatedUser : u))
    );
    setCurrentUser(updatedUser);
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