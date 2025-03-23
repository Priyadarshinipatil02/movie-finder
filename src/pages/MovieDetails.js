import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Container, Typography, Card, CardMedia, CardContent, Stack, Box } from "@mui/material";

const API_KEY = "92213979";

const MovieDetails = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        setMovie(response.data);
      } catch (err) {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );

  if (error) return <Typography color="error" textAlign="center">{error}</Typography>;

  return (
    <Container>
      {movie && (
        <Card sx={{ maxWidth: 900, margin: "auto", mt: 4, p: 3, borderRadius: 3 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            
            <Box flexShrink={0} sx={{ textAlign: "center" }}>
              <CardMedia
                component="img"
                image={movie.Poster}
                alt={movie.Title}
                sx={{ borderRadius: 2, width: { xs: "100%", md: 300 }, height: "auto" }}
              />
            </Box>

            
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {movie.Title} ({movie.Year})
              </Typography>
              <Typography variant="h6">
                ⭐ {movie.imdbRating} | 🎭 {movie.Genre} | ⏳ {movie.Runtime}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>{movie.Plot}</Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>🎬 Directed by: {movie.Director}</Typography>
              <Typography variant="body2">✍️ Written by: {movie.Writer}</Typography>
              <Typography variant="body2">🎭 Starring: {movie.Actors}</Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>🏆 Awards: {movie.Awards}</Typography>
              <Typography variant="body2">💰 Box Office: {movie.BoxOffice}</Typography>
              <Typography variant="body2">🌍 Language: {movie.Language}</Typography>
            </CardContent>
          </Stack>
        </Card>
      )}
    </Container>
  );
};

export default MovieDetails;
