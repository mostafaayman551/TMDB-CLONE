import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w1280";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "bearer " + TMDB_TOKEN,
    "Content-Type": "application/json",
  },
});

// fetch data from TMDB
export const fetchDataFromApi = async (endpoint, params = {}) => {
  try {
    const response = await axiosInstance.get(endpoint, { params });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

// fetch Genres from TMDB
export const fetchGenres = async () => {
  try {
    const [movieGenres, tvGenres] = await Promise.all([
      fetchDataFromApi(`/genre/movie/list`),
      fetchDataFromApi(`/genre/tv/list`),
    ]);
    const allGenres = [...movieGenres.genres, ...tvGenres.genres];
    return allGenres;
  } catch (error) {
    toast.error(error.message);
  }
};

// fetch Backdrop from TMDB
export const fetchBackdrop = async () => {
  try {
    const popularMovies = await fetchDataFromApi(`/movie/popular`);
    const moviesBackdrops = popularMovies.results
      .map((m) => m.backdrop_path)
      .filter((path) => path);
    return moviesBackdrops;
  } catch (error) {
    toast.error(error.message);
  }
};
