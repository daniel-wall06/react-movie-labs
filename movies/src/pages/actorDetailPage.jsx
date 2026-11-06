import { useParams } from "react-router";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { getActorDetails } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ActorMovies from "../components/actorMovies";

const ActorDetailsPage = () => {
  const { id } = useParams();
  const {
  data: actor,
  error,
  isPending,
  isError,
} = useQuery({
  queryKey: ["actor", { id }],
  queryFn: getActorDetails,
});

if (isPending) {
  return <Spinner />;
}

if (isError) {
  return <Typography color="error">{error.message}</Typography>;
}

  return (
  <Box sx={{ p: 3 }}>
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: "#f1f5f9",
      }}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          {actor.profile_path && (
            <Box
              component="img"
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              sx={{
                width: "100%",
                borderRadius: 3,
              }}
            />
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#101070", mb: 2 }}
          >
            {actor.name}
          </Typography>

          <Typography variant="h6" sx={{ mb: 1 }}>
            Biography
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
            {actor.biography || "No biography available."}
          </Typography>

          <Typography variant="body2">
            <strong>Birthday:</strong> {actor.birthday || "Unknown"}
          </Typography>

          <Typography variant="body2">
            <strong>Place of Birth:</strong>{" "}
            {actor.place_of_birth || "Unknown"}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
    <ActorMovies actorId={id} />
  </Box>
);
};

export default ActorDetailsPage;