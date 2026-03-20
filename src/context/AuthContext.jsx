import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      fetchAllUsers();
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]); // Sync on every user state change (library, cart, etc.)

  // Separate effect for polling to avoid rapid interval resets
  useEffect(() => {
    if (currentUser) {
      const interval = setInterval(refreshUser, 30000);
      return () => clearInterval(interval);
    }
  }, [currentUser?.email]);

  const fetchAllUsers = async () => {
    try {
      const resp = await fetch("/api/users");
      if (resp.ok) {
        const data = await resp.json();
        setUsers(data.filter(u => u.email !== currentUser?.email));
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  // ✅ Refresh User Data from Server
  const refreshUser = async () => {
    if (!currentUser || !currentUser.email) return;
    try {
      const resp = await fetch(`/api/users/me?email=${currentUser.email}`);
      if (resp.ok) {
        const data = await resp.json();
        if (data && data.email) {
          setCurrentUser(data);
        }
      } else if (resp.status === 404) {
        // Force logout if user no longer exists (fixes 'zombie' accounts)
        console.warn("User not found on server. Clearing session.");
        logout();
      }
    } catch (err) {
      console.error("Failed to refresh user:", err);
    }
  };

  const signup = async (newUser) => {
    try {
      const resp = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await resp.json();
      if (resp.ok) {
        setCurrentUser(data);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: "Network error" };
    }
  };

  const login = async (email, password) => {
    try {
      const resp = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await resp.json();
      if (resp.ok) {
        setCurrentUser(data);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: "Network error" };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const clearNotifications = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch("/api/users/notifications/clear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentUser.email }),
      });
      if (res.ok) {
        const updatedUser = { ...currentUser, notifications: [] };
        setCurrentUser(updatedUser);
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }
    } catch (err) {
      console.error("Failed to clear notifications:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        login,
        signup,
        logout,
        refreshUser,
        clearNotifications,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
