import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import { getMovieRecommendations } from '../api/tmdb-api'
// import useMovie from "../hooks/useMovie";   Redundant
import MovieRecommendations from "../components/movieRecommendations";


const MoviePage = (props) => {
  const { id } = useParams();
    const { data: movie, error, isPending, isError  } = useQuery({
    queryKey: ['movie', {id: id}],
    queryFn: getMovie,
  })


  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
  <MovieDetails movie={movie} />
</PageTemplate>

<MovieRecommendations movieId={id} />
          <h2>Recommended Movies</h2>


        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
