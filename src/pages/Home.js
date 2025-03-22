import { useEffect, useState } from "react";
import { fetchMovies } from "../api/movieApi";
import { Container } from "@mui/material";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch initial movies when the component mounts
  useEffect(() => {
    const fetchInitialMovies = async () => {
      setLoading(true);
      const results = await fetchMovies("Avengers"); // Change to any keyword you want
      setMovies(results);
      setLoading(false);
    };

    fetchInitialMovies();
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    const results = await fetchMovies(query);
    console.log("Movie Results:", results);
    setMovies(results);
    setLoading(false);
  };

  return (
    <Container>
      <SearchBar onSearch={handleSearch} />
      {loading ? <Loader /> : <MovieList movies={movies} />}
    </Container>
  );
};

export default Home;
