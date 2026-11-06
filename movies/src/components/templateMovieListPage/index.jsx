import { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";


function MovieListPageTemplate({ movies, title, action }) {

  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortOrder, setSortOrder] = useState("default");
  const [minRating, setMinRating] = useState(0);
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => m.vote_average >= minRating);
  if (sortOrder === "highest") {
    displayedMovies.sort((a, b) => b.vote_average - a.vote_average);
  }

  if (sortOrder === "lowest") {
    displayedMovies.sort((a, b) => a.vote_average - b.vote_average);
  }
  if (sortOrder === "newest") {
    displayedMovies.sort((a, b) =>
      (b.release_date || "").localeCompare(a.release_date || "")
    );
  }

  if (sortOrder === "oldest") {
    displayedMovies.sort((a, b) =>
      (a.release_date || "").localeCompare(b.release_date || "")
    );
  }

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
          <TextField
            select
            label="Sort Movies"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          >
            <MenuItem value="default">Default Order</MenuItem>
            <MenuItem value="highest">Highest Rated First</MenuItem>
            <MenuItem value="lowest">Lowest Rated First</MenuItem>
            <MenuItem value="newest">Newest Releases First</MenuItem>
            <MenuItem value="oldest">Oldest Releases First</MenuItem>
          </TextField>
          <TextField
            select
            label="Minimum Rating"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            fullWidth
            sx={{ mt: 2 }}
          >
            <MenuItem value={0}>All Ratings</MenuItem>
            <MenuItem value={6}>6+ Rating</MenuItem>
            <MenuItem value={7}>7+ Rating</MenuItem>
            <MenuItem value={8}>8+ Rating</MenuItem>
            <MenuItem value={9}>9+ Rating</MenuItem>
          </TextField>
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>

      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
