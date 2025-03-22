import { useEffect, useState } from "react";
import { 
  Box, Stack, Card, CardMedia, CardContent, Typography, Button, Dialog, DialogActions, 
  DialogContent, DialogContentText, DialogTitle 
} from "@mui/material";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleOpen = (movie) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMovie(null);
  };

  const removeFavorite = () => {
    if (selectedMovie) {
      const updatedFavorites = favorites.filter((movie) => movie.imdbID !== selectedMovie.imdbID);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      handleClose();
    }
  };

  return (
    <Box sx={{ mt: 3, px: 2 }}>
      {favorites.length === 0 ? (
        <Typography variant="h6" textAlign="center">
          No favorite movies yet.
        </Typography>
      ) : (
        <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={3}>
          {favorites.map((movie) => (
            <Card key={movie.imdbID} sx={{ width: 280 }}>
              <CardMedia component="img" image={movie.Poster} alt={movie.Title} sx={{ height: 300 }} />
              <CardContent>
                <Typography variant="h6" noWrap>{movie.Title}</Typography>
                <Button 
                  variant="contained" 
                  color="error" 
                  fullWidth 
                  onClick={() => handleOpen(movie)}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Remove from Favorites</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove "{selectedMovie?.Title}" from your favorites?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={removeFavorite} color="error">Remove</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Favorites;
