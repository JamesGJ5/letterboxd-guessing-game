import useMediaQuery from "@mui/material/useMediaQuery";

function FilmPoster({ filmPosterURL, filmBackdropImageURL }) {
  const useLandscapeImage = useMediaQuery("(max-height: 400px)");
  const backgroundImageURL = (useLandscapeImage) ? filmBackdropImageURL : filmPosterURL;
  return (
    <div className="img" style={{ backgroundImage: `url(${backgroundImageURL})` }} />
  );
}

export default FilmPoster;