import { useEffect, useState } from "react";
import { 
  Box, Stack, Card, CardMedia, CardContent, Typography, Button, Dialog, DialogActions, 
  DialogContent, DialogContentText, DialogTitle, Pagination 
} from "@mui/material";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [removalSuccess, setRemovalSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10; 

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleOpen = (movie) => {
    setSelectedMovie(movie);
    setRemovalSuccess(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMovie(null);
    setRemovalSuccess(false);
  };

  const removeFavorite = () => {
    if (selectedMovie) {
      const updatedFavorites = favorites.filter((movie) => movie.imdbID !== selectedMovie.imdbID);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setRemovalSuccess(true);

      setTimeout(() => {
        handleClose();
      }, 1500);
    }
  };

  
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = favorites.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ mt: 3, px: 2 }}>
      {favorites.length === 0 ? (
        <Typography variant="h6" textAlign="center">
          No favorite movies yet.
        </Typography>
      ) : (
        <>
          <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={3}>
            {currentMovies.map((movie) => (
              <Card 
                key={movie.imdbID} 
                sx={{ 
                  width: 280, 
                  transition: "transform 0.3s ease, box-shadow 0.3s ease", 
                  "&:hover": { 
                    transform: "scale(1.05)", 
                    boxShadow: 6 
                  } 
                }}
              >
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

         
          {favorites.length > moviesPerPage && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={Math.ceil(favorites.length / moviesPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}

     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{removalSuccess ? "Success" : "Remove from Favorites"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {removalSuccess 
              ? `"${selectedMovie?.Title}" has been successfully removed from your favorites.` 
              : `Are you sure you want to remove "${selectedMovie?.Title}" from your favorites?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!removalSuccess && (
            <>
              <Button onClick={handleClose} color="primary">Cancel</Button>
              <Button onClick={removeFavorite} color="error">Remove</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Favorites;
