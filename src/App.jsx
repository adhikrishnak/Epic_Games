import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Browse from "./pages/Browse";
import GameDetails from "./pages/GameDetails";
import Cart from "./pages/Cart";
import Library from "./pages/Library";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Wishlist from "./pages/Wishlist";
import Gift from "./pages/Gift";
import Logout from "./pages/Logout";

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdmin from "./components/ProtectedAdmin";

// ✅ Context Providers
import { GameProvider } from "./context/GameContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { GiftProvider } from "./context/GiftContext";

const App = () => {
  return (
    <GameProvider>
      <CartProvider>
        <WishlistProvider>
          <GiftProvider>
            <Navbar />
            <Routes>
              {/* Auth */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Public */}
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />

              {/* Protected */}
              <Route
                path="/game/:id"
                element={
                  <ProtectedRoute>
                    <GameDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/library"
                element={
                  <ProtectedRoute>
                    <Library />
                  </ProtectedRoute>
                }
              />

              {/* Admin Only */}
              <Route
                path="/admin"
                element={
                  <ProtectedAdmin>
                    <AdminDashboard />
                  </ProtectedAdmin>
                }
              />

              {/* User Features */}
              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gift"
                element={
                  <ProtectedRoute>
                    <Gift />
                  </ProtectedRoute>
                }
              />
              <Route path="/logout" element={<Logout />} />

              {/* ✅ Policy Pages */}
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/refund" element={<Refund />} />
            </Routes>

            {/* ✅ Footer always visible */}
            <Footer />
          </GiftProvider>
        </WishlistProvider>
      </CartProvider>
    </GameProvider>
  );
};

export default App;