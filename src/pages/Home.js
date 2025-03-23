import { useEffect, useState } from "react";
import { fetchMovies } from "../api/movieApi";
import { Container, Button, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("Avengers"); 

  
  const fetchMovieData = async (searchQuery) => {
    setLoading(true);
    setError(false);

    try {
      const results = await fetchMovies(searchQuery);
      if (results.length === 0) {
        throw new Error("No movies found");
      }
      setMovies(results);
    } catch (err) {
      setError(true);
      setMovies([]); 
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchMovieData(query);
  }, []);


  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) return;
    setQuery(searchQuery); 
    fetchMovieData(searchQuery);
  };

  
  const handleRetry = () => {
    fetchMovieData(query);
  };

  
  const handleReset = () => {
    setQuery("Avengers"); 
    fetchMovieData("Avengers");
  };

  return (
    <Container>
      <SearchBar onSearch={handleSearch} />

      {loading && <Loader />}

      {error && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Typography variant="h6" color="error">
            No movies found for "{query}". Try again or reset.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleRetry} sx={{ mt: 2, mr: 2 }}>
            Retry
          </Button>
          <Button variant="contained" color="secondary" onClick={handleReset} sx={{ mt: 2 }}>
            Reset
          </Button>
        </div>
      )}

      {!loading && !error && <MovieList movies={movies} />}
    </Container>
  );
};

export default Home;