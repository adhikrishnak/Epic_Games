import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import ScrollToTop from "./components/ScrollToTop";

import { AuthProvider } from "./context/AuthContext";
import { GameProvider } from "./context/GameContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { GiftProvider } from "./context/GiftContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ScrollToTop />
    <AuthProvider>
      <GameProvider>
        <CartProvider>
          <WishlistProvider>
            <GiftProvider>
              <App />
            </GiftProvider>
          </WishlistProvider>
        </CartProvider>
      </GameProvider>
    </AuthProvider>
  </BrowserRouter>
);
