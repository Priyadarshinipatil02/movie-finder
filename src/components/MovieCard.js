import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MovieCard = ({ movie }) => {
  const { favorites, dispatch } = useContext(FavoritesContext);

  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: movie });
      toast.error(`${movie.Title} removed from favorites!`, { position: "top-center" });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: movie });
      toast.success(`${movie.Title} Successfully added to favorites!`, { position: "top-center" });
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 250,
        m: 2,
        boxShadow: 3,
        borderRadius: 2,
        transition: "transform 0.3s, box-shadow 0.3s, background-color 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
          backgroundColor: "#f5f5f5",
          border: "2px solid #1976d2",
          cursor: "pointer",
        },
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={movie.Poster}
        alt={movie.Title}
        sx={{
          transition: "opacity 0.3s",
          "&:hover": { opacity: 0.8 },
        }}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {movie.Title}
        </Typography>
        <Button component={Link} to={`/movie/${movie.imdbID}`} sx={{ mt: 1 }}>
          Details
        </Button>
        <Button
          onClick={handleFavorite}
          color={isFavorite ? "error" : "primary"}
          sx={{ mt: 1 }}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
