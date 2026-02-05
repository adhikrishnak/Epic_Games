import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

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

  const login = (email, password) => {
    // ✅ Hardcoded admin
    if (email === "epicgames@epic.com" && password === "epic123") {
      const adminUser = {
        email,
        role: "admin",
        cart: [],
        library: [],
        wishlist: [],
        gifts: [],
      };
      setCurrentUser(adminUser);
      return true;
    }

    // ✅ Normal user
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
  setCurrentUser(null);
  localStorage.removeItem("cart");
};

  const updateUserData = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.email === updatedUser.email ? updatedUser : u))
    );
    setCurrentUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ users, currentUser, signup, login, logout, updateUserData, setUsers, setCurrentUser }}>
  {children}
</AuthContext.Provider>
  );
};