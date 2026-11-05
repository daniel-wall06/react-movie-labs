import { useQuery } from "@tanstack/react-query";
import { getMovieRecommendations } from "../../api/tmdb-api";
import Spinner from "../spinner";

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
                recommendations.results.map((recommendedMovie) => (
                    <p key={recommendedMovie.id}>
                        {recommendedMovie.title}
                    </p>
                ))
            ) : (
                <p>No recommendations available for this movie.</p>
            )}
        </div>
    );
};
export default MovieRecommendations;