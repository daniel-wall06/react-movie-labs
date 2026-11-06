import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";



const formControl = {
  width: "100%",
  backgroundColor: "#ffffff",
};
export default function FilterMoviesCard(props) {
    const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); 
  };



  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };


   return (
    <TextField
      select
      label="Genre"
      value={props.genreFilter}
      onChange={handleGenreChange}
      fullWidth
    >
      {genres.map((genre) => (
        <MenuItem key={genre.id} value={genre.id}>
          {genre.name}
        </MenuItem>
      ))}
    </TextField>
  );
}