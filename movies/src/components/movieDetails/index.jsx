import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import MovieCredits from "../movieCredits";




const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  // Don't miss this!
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Paper
  elevation={2}
  sx={{
    p: 3,
    mb: 3,
    borderRadius: 3,
    backgroundColor: "#f1f5f9",
  }}
>
  <Typography
    variant="h5"
    sx={{
      fontWeight: "bold",
      color: "#101070",
      mb: 2,
    }}
  >
    Overview
  </Typography>

  <Typography
    variant="body1"
    sx={{
      lineHeight: 1.8,
      color: "#334155",
    }}
  >
    {movie.overview}
  </Typography>
</Paper>


      <Paper
  component="ul"
  elevation={2}
  sx={{
    ...root,
    mb: 3,
    borderRadius: 3,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
  }}
>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>
      <Paper
  component="ul"
  elevation={2}
  sx={{
    ...root,
    mb: 3,
    borderRadius: 3,
    backgroundColor: "#f1f5f9",
    gap: 1,
  }}
>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      <Paper
  component="ul"
  elevation={2}
  sx={{
    ...root,
    mb: 3,
    borderRadius: 3,
    backgroundColor: "#f1f5f9",
    gap: 1,
  }}
>
        <li>
          <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
        </li>
        {movie.production_countries?.map((country) => (
          <li key={country.iso_3166_1}>
            <Chip label={country.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>
<MovieCredits movieId={movie.id} />
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};
export default MovieDetails;
