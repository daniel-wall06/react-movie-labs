import {getNowPlayingMovies} from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist'

const NowPlayingMoviesPage = () => {
    const { data, error, isPending, isError } = useQuery({
      queryKey: ['nowPlaying'],
      queryFn: getNowPlayingMovies,
    });
    
    if (isPending) {
        return <Spinner />
      }
      
      if (isError) {
        return <h1>{error.message}</h1>
      }
    
      const movies = data.results;
    
    return (
        <PageTemplate
          title="Movies Playing Now"
          movies={movies}
          action={(movie) => {
            return <AddToPlaylistIcon movie={movie} />
          }}
        />
      );
    };
export default NowPlayingMoviesPage;
    
      