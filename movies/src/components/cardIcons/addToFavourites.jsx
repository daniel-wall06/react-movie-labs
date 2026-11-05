
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavouriteIcon from "@mui/icons-material/Favorite";

const AddToFavouritesIcon = ({ movie }) => {

  const context = useContext(MoviesContext);

  const handleAddToFavourites = (e) => {
    e.preventDefault();
    context.addToFavorites(movie);
  };
  
  return (
    <IconButton
      aria-label="add to favourites"
      onClick={handleAddToFavourites}
    >
      <FavouriteIcon color="primary" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;
