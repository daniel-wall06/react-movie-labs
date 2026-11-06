import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToPlaylist from '../components/cardIcons/addToPlaylist'
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';
import { useState } from "react";
import Pagination from "@mui/material/Pagination";


const HomePage = (props) => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['discover', { page }],
    queryFn: getMovies,
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
 const movies = Array.isArray(data) ? data : (data?.results ?? []);


 return (
  <>
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <AddToFavouritesIcon movie={movie} />
            <AddToPlaylist movie={movie} />
          </>
        );
      }}
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
export default HomePage;
