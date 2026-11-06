import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import PageTemplate from '../components/templateMovieListPage';
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToPlaylist from "../components/cardIcons/addToPlaylist";
import Pagination from "@mui/material/Pagination";



const UpcomingPage = () => {
  const [page, setPage] = useState(1);
const { data, error, isPending, isError } = useQuery({
  queryKey: ['upcoming', { page }],
  queryFn: getUpcomingMovies,
});

if (isPending) {
  return <Spinner />;
}

if (isError) {
  return <h1>{error.message}</h1>;
}

const movies = data.results;
  
  return (
  <>
    <PageTemplate
      title="Upcoming Movies"
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
export default UpcomingPage;