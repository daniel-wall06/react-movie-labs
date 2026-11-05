
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";

const AddToMustWatch = ({ movie }) => {
  return (
    <IconButton aria-label="add to must watch">
      <PlaylistAddIcon color="primary" />
    </IconButton>
  );
};

export default AddToMustWatch;
