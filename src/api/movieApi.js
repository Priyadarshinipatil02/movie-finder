import axios from "axios";

const API_KEY = "92213979";
const BASE_URL = "https://www.omdbapi.com/";

export const fetchMovies = async (query) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { s: query, apikey: API_KEY },
      headers: { "Content-Type": "application/json" },
    });
    return response.data.Search || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { i: id, apikey: API_KEY },
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
