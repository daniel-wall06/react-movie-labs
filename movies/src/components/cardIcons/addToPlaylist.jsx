import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const AddToPlaylistIcon = ({ movie }) => {

  const context = useContext(MoviesContext);
  const isInPlaylist = context.playlist.includes(movie.id);

  const handleAddToPlaylist = (e) => {
    e.preventDefault();
    context.addToPlaylist(movie);
  };

  return (
    <IconButton
      aria-label={isInPlaylist ? "already in playlist" : "add to playlist"}
      onClick={handleAddToPlaylist}
      disabled={isInPlaylist}
    >
      {isInPlaylist ? (
        <PlaylistAddCheckIcon color="success" fontSize="large" />
      ) : (
        <PlaylistAddIcon color="primary" fontSize="large" />
      )}
    </IconButton>
  );
};

export default AddToPlaylistIcon;