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
        <div>
            <h2>Recommended Movies</h2>
            {recommendations.results.length > 0 ? (
                <Grid container spacing={2}>
                    {recommendations.results.map((recommendedMovie) => (
                        <Grid key={recommendedMovie.id} size={{ xs: 12, sm: 6, md: 3 }}>
                            <Card>
                                <Link to={`/movies/${recommendedMovie.id}`}>
                                    <CardMedia
                                        component="img"
                                        image={`https://image.tmdb.org/t/p/w500${recommendedMovie.poster_path}`}
                                        alt={recommendedMovie.title}
                                        sx={{ height: 350, objectFit: "cover" }}
                                    />
                             

                                <CardContent>
                                    <Typography variant="h6">
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