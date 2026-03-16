import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ Load users from localStorage
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    let parsed = saved ? JSON.parse(saved) : [];

    // ✅ Ensure admin exists in users
    if (!parsed.find((u) => u.email === "epicgames@epic.com")) {
      parsed.push({
        email: "epicgames@epic.com",
        password: "epic123",
        role: "admin",
        cart: [],
        library: [],
        wishlist: [],
        gifts: [],
      });
    }

    return parsed;
  });

  // ✅ Load currentUser from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ✅ Persist users
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // ✅ Persist currentUser
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  // ✅ Signup
  const signup = (newUser) => {
    const userWithData = {
      ...newUser,
      role: "user",
      cart: [],
      library: [],
      wishlist: [],
      gifts: [],
    };
    setUsers((prev) => [...prev, userWithData]);
    setCurrentUser(userWithData);
  };

  // ✅ Login
  const login = (email, password) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  // ✅ Logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  // ✅ Update user data
  const updateUserData = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.email === updatedUser.email ? updatedUser : u))
    );
    setCurrentUser(updatedUser);
  };

  // ✅ Remove from library
  const removeFromLibrary = (id) => {
    if (!currentUser) return;
    const updatedLibrary = (currentUser.library || []).filter((g) => g.id !== id);
    const updatedUser = { ...currentUser, library: updatedLibrary };

    setUsers((prev) =>
      prev.map((u) => (u.email === updatedUser.email ? updatedUser : u))
    );
    setCurrentUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        signup,
        login,
        logout,
        updateUserData,
        setUsers,
        setCurrentUser,
        removeFromLibrary,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};