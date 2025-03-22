import { useState, useCallback } from "react";
import { TextField } from "@mui/material";
import debounce from "lodash.debounce";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((q) => onSearch(q), 500),
    [onSearch]
  );

  return (
    <TextField
      fullWidth
      label="Search Movies"
      variant="outlined"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        debouncedSearch(e.target.value);
      }}
      sx={{
        marginTop: "1.5rem",
        width: "40%",
        
      }}
    />
  );
};

export default SearchBar;
