import { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";

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
      <Grid size={12} sx={{ px: 3, pt: 3, pb: 2 }}>
        <TextField
          fullWidth
          label="Search Movies"
          placeholder="Search movies by title..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Grid>

      <Grid size={12} sx={{ px: 3, pb: 3 }}>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            borderRadius: 3,
            backgroundColor: "#f1f5f9",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 4 }}>
              <FilterCard
                onUserInput={handleChange}
                titleFilter={nameFilter}
                genreFilter={genreFilter}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                select
                label="Sort Movies"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                fullWidth
              >
                <MenuItem value="default">Default Order</MenuItem>
                <MenuItem value="highest">Highest Rated First</MenuItem>
                <MenuItem value="lowest">Lowest Rated First</MenuItem>
                <MenuItem value="newest">Newest Releases First</MenuItem>
                <MenuItem value="oldest">Oldest Releases First</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                select
                label="Minimum Rating"
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                fullWidth
              >
                <MenuItem value={0}>All Ratings</MenuItem>
                <MenuItem value={6}>6+ Rating</MenuItem>
                <MenuItem value={7}>7+ Rating</MenuItem>
                <MenuItem value={8}>8+ Rating</MenuItem>
                <MenuItem value={9}>9+ Rating</MenuItem>
              </TextField>
            </Grid>

          </Grid>
        </Paper>
      </Grid>
      <Grid size={12}>
        <MovieList action={action} movies={displayedMovies} />
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;
