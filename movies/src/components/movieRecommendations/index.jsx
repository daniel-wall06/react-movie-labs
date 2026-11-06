import { useQuery } from "@tanstack/react-query";
import { getMovieRecommendations } from "../../api/tmdb-api";
import Spinner from "../spinner";
import { Link } from "react-router";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const MovieRecommendations = ({ movieId }) => {
    const { data: recommendations, error, isPending, isError } = useQuery({
        queryKey: ['recommendations', { id: movieId }],
        queryFn: getMovieRecommendations,
    });
    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
       <div style={{ padding: "24px 0" }}>
            <Typography
  variant="h5"
  sx={{
    fontWeight: "bold",
    color: "#101070",
    mb: 3,
  }}
>
  Recommended Movies
</Typography>
            {recommendations.results.length > 0 ? (
  <Grid container spacing={2}>
    {recommendations.results.slice(0, 12).map((recommendedMovie) => (
                        <Grid
  key={recommendedMovie.id}
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
  to={`/movies/${recommendedMovie.id}`}
  style={{
    textDecoration: "none",
    color: "inherit",
  }}
>
                                    <CardMedia
                                        component="img"
                                        image={`https://image.tmdb.org/t/p/w500${recommendedMovie.poster_path}`}
                                        alt={recommendedMovie.title}
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
    {recommendedMovie.title}
  </Typography>
</CardContent>
                                   </Link>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <p>No recommendations available for this movie.</p>
            )}
        </div>
    );
};
export default MovieRecommendations;