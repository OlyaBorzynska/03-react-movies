import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import "./App.module.css";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

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

  const hideModal = () => {
    setIsShowModal(false);
    setSelectedMovie(null);
  };
  const showModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsShowModal(true);
  };

  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {movies.length > 0 && <MovieGrid onSelect={showModal} movies={movies} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isShowModal && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={hideModal} />
      )}
      <Toaster />
    </>
  );
}
