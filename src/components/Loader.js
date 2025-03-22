import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      <CircularProgress />
    </div>
  );
};

export default Loader;
