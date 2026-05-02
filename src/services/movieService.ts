import axios from "axios";
import type { Movie } from "../types/movie";

const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesResponse {
  results: Movie[];
}

export async function fetchMovies(query: string) {
  const { data } = await axios.get<MoviesResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        query: query,
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    },
  );
  return data.results;
}
