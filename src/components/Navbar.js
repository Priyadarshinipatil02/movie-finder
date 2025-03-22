import { AppBar, Toolbar, Typography, Switch, Grid, useMediaQuery, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { styled } from "@mui/system";
import { DarkMode, LightMode, Menu } from "@mui/icons-material";

// Custom styled switch
const ThemeSwitch = styled(Switch)({
  width: 50,
  height: 30,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 4,
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
    },
  },
  "& .MuiSwitch-thumb": {
    width: 22,
    height: 22,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  "& .MuiSwitch-track": {
    backgroundColor: "#ccc",
    borderRadius: 20,
  },
});

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screens

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: darkMode ? "0px 4px 10px 0px #00000080" : "0px 4px 10px 0px #00000040",
        backgroundImage: darkMode
          ? "linear-gradient(180deg, #1a1a1a 0%, rgba(0, 0, 0, 0) 100%)"
          : "linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%)",
        color: darkMode ? "white" : "black",
      }}
    >
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          
          {/* Logo */}
          <Grid item xs={6} sm={3} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "16px", sm: "20px", md: "24px" },
                fontWeight: "bold",
              }}
            >
              Movie Finder
            </Typography>
          </Grid>

          {/* Navigation Links - Hidden on Mobile */}
          {!isMobile && (
            <Grid item sm={6} md={5} sx={{ textAlign: "center" }}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: location.pathname === "/" ? (darkMode ? "#4da6ff" : "#001d40") : darkMode ? "#e0e0e0" : "#333",
                  fontSize: "18px",
                  fontWeight: location.pathname === "/" ? "bold" : "normal",
                  margin: "0 15px",
                }}
              >
                Home
              </Link>
              <Link
                to="/favorites"
                style={{
                  textDecoration: "none",
                  color: location.pathname === "/favorites" ? (darkMode ? "#4da6ff" : "#001d40") : darkMode ? "#e0e0e0" : "#333",
                  fontSize: "18px",
                  fontWeight: location.pathname === "/favorites" ? "bold" : "normal",
                  margin: "0 15px",
                }}
              >
                Favorites
              </Link>
            </Grid>
          )}

          {/* Mobile Menu or Dark Mode Toggle */}
          <Grid item xs={6} sm={3} md={3} sx={{ textAlign: "right" }}>
            {isMobile ? (
              <Menu sx={{ fontSize: "28px", cursor: "pointer" }} />
            ) : (
              <ThemeSwitch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                icon={<LightMode sx={{ fontSize: "18px", color: "#ffcc00" }} />}
                checkedIcon={<DarkMode sx={{ fontSize: "18px", color: "#4da6ff" }} />}
              />
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
