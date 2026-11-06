import React from "react";
import MovieCard from "../movieCard/";
import Grid from "@mui/material/Grid";

const MovieList = ({ movies, action }) => {
  return (
    <Grid container spacing={3} sx={{ px: 3 }}>
      {movies.map((movie) => (
        <Grid
          key={movie.id}
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
        >
          <MovieCard movie={movie} action={action} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
