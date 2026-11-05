import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToPlaylistIcon = ({ movie }) => {

  const context = useContext(MoviesContext);

  const handleAddToPlaylist = (e) => {
    e.preventDefault();
    context.addToPlaylist(movie);
  };
  
  return (
 <IconButton
  aria-label="add to must watch"
  onClick={handleAddToPlaylist}
>
  <PlaylistAddIcon color="primary" />
</IconButton>
  );
};

export default AddToPlaylistIcon;