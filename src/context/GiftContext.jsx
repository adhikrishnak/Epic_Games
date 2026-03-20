import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const GiftContext = createContext();

export const GiftProvider = ({ children }) => {
  const { currentUser, setCurrentUser, refreshUser } = useContext(AuthContext);
  const [giftItems, setGiftItems] = useState([]);
  const [locallyRemovedGiftIds, setLocallyRemovedGiftIds] = useState([]);

  const getItemId = (item) =>
    typeof item === "string" ? item : item?._id || item?.id;

  useEffect(() => {
    const storageKey = currentUser?.email
      ? `removed_gifts_${currentUser.email}`
      : null;

    if (!storageKey) {
      setLocallyRemovedGiftIds([]);
      return;
    }

    const saved = localStorage.getItem(storageKey);
    setLocallyRemovedGiftIds(saved ? JSON.parse(saved) : []);
  }, [currentUser?.email]);

  useEffect(() => {
    if (currentUser?.gifts) {
      setGiftItems(
        currentUser.gifts.filter((item) => {
          const itemId = getItemId(item);
          return !locallyRemovedGiftIds.includes(String(itemId));
        })
      );
    } else {
      setGiftItems([]);
    }
  }, [currentUser, locallyRemovedGiftIds]);

  const persistRemovedGiftIds = (ids) => {
    if (!currentUser?.email) return;
    localStorage.setItem(`removed_gifts_${currentUser.email}`, JSON.stringify(ids));
  };

  const addGift = async (game) => {
    if (!currentUser) return;

    const gameId = String(game._id || game.id);
    if (locallyRemovedGiftIds.includes(gameId)) {
      const nextRemovedIds = locallyRemovedGiftIds.filter((id) => id !== gameId);
      setLocallyRemovedGiftIds(nextRemovedIds);
      persistRemovedGiftIds(nextRemovedIds);
    }

    try {
      const resp = await fetch("/api/users/gifts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentUser.email, gameId }),
      });
      if (resp.ok) {
        await refreshUser();
      }
    } catch (err) {
      console.error("Gift error:", err);
    }
  };

  const removeGift = async (id) => {
    if (!currentUser) return false;

    const previousGifts = currentUser.gifts || [];
    const nextGifts = previousGifts.filter((item) => {
      const itemId = getItemId(item);
      return String(itemId) !== String(id);
    });
    const nextRemovedIds = Array.from(new Set([...locallyRemovedGiftIds, String(id)]));

    setGiftItems(nextGifts);
    setLocallyRemovedGiftIds(nextRemovedIds);
    persistRemovedGiftIds(nextRemovedIds);
    setCurrentUser({ ...currentUser, gifts: nextGifts });

    try {
      const resp = await fetch("/api/users/gifts/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentUser.email, gameId: id }),
      });

      if (resp.ok) {
        await refreshUser();
        return true;
      }

      if (resp.status === 404) {
        console.warn("Gift remove endpoint is unavailable; keeping local gift state in sync.");
        return true;
      }

      setGiftItems(previousGifts);
      setLocallyRemovedGiftIds(locallyRemovedGiftIds);
      persistRemovedGiftIds(locallyRemovedGiftIds);
      setCurrentUser({ ...currentUser, gifts: previousGifts });
    } catch (err) {
      console.error("Gift remove error:", err);
      setGiftItems(previousGifts);
      setLocallyRemovedGiftIds(locallyRemovedGiftIds);
      persistRemovedGiftIds(locallyRemovedGiftIds);
      setCurrentUser({ ...currentUser, gifts: previousGifts });
      return false;
    }

    return true;
  };

  return (
    <GiftContext.Provider
      value={{
        giftItems,
        addGift,
        removeGift,
      }}
    >
      {children}
    </GiftContext.Provider>
  );
};
