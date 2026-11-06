import { useQuery } from "@tanstack/react-query";
import { getActorMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import { Link } from "react-router";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ActorMovies = ({ actorId }) => {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ["actorMovies", { id: actorId }],
        queryFn: getActorMovieCredits,
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <Typography color="error">{error.message}</Typography>;
    }

    const movies = data.cast
        .filter((movie) => movie.poster_path)
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 12);

    
return (
  <div style={{ padding: "24px 0" }}>
    <Typography
      variant="h5"
      sx={{ fontWeight: "bold", color: "#101070", mb: 3 }}
    >
      Known For
    </Typography>

    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid
          key={movie.id}
          size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
        >
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              overflow: "hidden",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
            <Link
              to={`/movies/${movie.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                sx={{
                  width: "100%",
                  aspectRatio: "2 / 3",
                  objectFit: "cover",
                }}
              />

              <CardContent sx={{ p: 1.5 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {movie.title}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
);

};

export default ActorMovies;