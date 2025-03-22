import { createContext, useReducer, useEffect } from "react";

export const FavoritesContext = createContext();

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (state.some((movie) => movie.imdbID === action.payload.imdbID)) {
        return state; // Prevent duplicates
      }
      return [...state, action.payload];

    case "REMOVE_FAVORITE":
      return state.filter((movie) => movie.imdbID !== action.payload.imdbID);

    default:
      return state;
  }
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};
