import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProviderComponent } from "./context/ThemeContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter> 
    <ThemeProviderComponent>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </ThemeProviderComponent>
  </BrowserRouter>
);
