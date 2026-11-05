
import { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToMustWatch from "../components/cardIcons/addToMustWatch";

const UpcomingMoviesPage = () => {
  const [movies, setMovies] = useState([]);

  const addToFavorites = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, favorite: true } : m
    );
    setMovies(updatedMovies);
  };

  useEffect(() => {
    getUpcomingMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      selectFavorite={addToFavorites}
    />
  );
};

export default UpcomingMoviesPage;
