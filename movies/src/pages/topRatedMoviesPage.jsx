import {getTopRatedMovies} from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from '../components/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToPlaylist from "../components/cardIcons/addToPlaylist";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";

const TopRatedMoviesPage = () => {
  const [page, setPage] = useState(1);
    const { data, error, isPending, isError } = useQuery({
      queryKey: ['topRated', { page }],
      queryFn: getTopRatedMovies,
    });
    
    if (isPending) {
        return <Spinner />
      }
      
      if (isError) {
        return <h1>{error.message}</h1>
      }
    
      const movies = data.results;
    
    return (
  <>
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => (
        <>
          <AddToFavouritesIcon movie={movie} />
          <AddToPlaylist movie={movie} />
        </>
      )}
    />

    <Pagination
      count={Math.min(data.total_pages, 500)}
      page={page}
      onChange={(event, value) => setPage(value)}
      color="primary"
      sx={{
        display: "flex",
        justifyContent: "center",
        my: 3
      }}
    />
  </>
);
    };
export default TopRatedMoviesPage;
    
      