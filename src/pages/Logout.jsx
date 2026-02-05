import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();              // clear currentUser
    navigate("/login");    // ✅ force redirect to login page
  }, [logout, navigate]);

  return null; // no blank screen, just redirect
};

export default Logout;