import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const MovieCredits = ({ movieId }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: movieId }],
    queryFn: getMovieCredits,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography color="error">{error.message}</Typography>;
  }

  const actors = data.cast.slice(0, 6);

  return (
    <div>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#101070", mb: 2 }}>
       Cast
      </Typography>

  <Grid container spacing={2}>
  {actors.map((actor) => (
    <Grid
      key={actor.id}
      size={{ xs: 6, sm: 4, md: 2 }}
    >
     <Card
  sx={{
    height: "100%",
    borderRadius: 3,
    overflow: "hidden",
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: 4,
    },
  }}
>
  <CardMedia
    component="img"
    image={
      actor.profile_path
        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
        : "https://placehold.co/185x278?text=No+Photo"
    }
    alt={actor.name}
    sx={{
      aspectRatio: "2 / 3",
      objectFit: "cover",
    }}
  />

  <CardContent sx={{ p: 1.5 }}>
    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
      {actor.name}
    </Typography>

    <Typography variant="caption" color="text.secondary">
      {actor.character}
    </Typography>
  </CardContent>
</Card>
    </Grid>
  ))}
</Grid>
    </div>
  );
};

export default MovieCredits;