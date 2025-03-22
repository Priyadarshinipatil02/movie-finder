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
    <Card sx={{ maxWidth: 250, m: 2 }}>
      <CardMedia component="img" height="300" image={movie.Poster} alt={movie.Title} />
      <CardContent>
        <Typography variant="h6">{movie.Title}</Typography>
        <Button component={Link} to={`/movie/${movie.imdbID}`}>
          Details
        </Button>
        <Button onClick={handleFavorite} color={isFavorite ? "error" : "primary"}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
