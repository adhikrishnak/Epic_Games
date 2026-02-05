import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  // ✅ Only allow admin
  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedAdmin;