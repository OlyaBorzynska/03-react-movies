import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import "./App.module.css";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit = async (query: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const queryMovies = await fetchMovies(query);
      if (queryMovies.length === 0) {
        toast("No movies found for your request.");
      }
      setMovies(queryMovies);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {movies.length > 0 && <MovieGrid onSelect={() => {}} movies={movies} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <Toaster />
    </>
  );
}
