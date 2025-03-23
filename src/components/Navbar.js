import { useState, useContext } from "react";
import { AppBar, Toolbar, Typography, Switch, Grid, useMediaQuery, useTheme, Drawer, IconButton, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { styled } from "@mui/system";
import { DarkMode, LightMode, Menu, Close } from "@mui/icons-material";

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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [menuOpen, setMenuOpen] = useState(false);

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
            <Link to="/" style={{ textDecoration: "none", color: darkMode ? "white" : "black" }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "16px", sm: "20px", md: "24px" },
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Movie Finder
              </Typography>
            </Link>
          </Grid>

          {/* Desktop Menu */}
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

          {/* Mobile Menu Icon */}
          <Grid item xs={6} sm={3} md={3} sx={{ textAlign: "right" }}>
            {isMobile ? (
              <IconButton onClick={() => setMenuOpen(true)}>
                <Menu sx={{ fontSize: "28px", color: darkMode ? "white" : "black" }} />
              </IconButton>
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

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box sx={{ width: 250, padding: "20px", backgroundColor: darkMode ? "#1a1a1a" : "#fff", height: "100%" }}>
          {/* Close Button */}
          <IconButton onClick={() => setMenuOpen(false)} sx={{ float: "right" }}>
            <Close sx={{ fontSize: "28px", color: darkMode ? "white" : "black" }} />
          </IconButton>

          {/* Menu Items */}
          <Box sx={{ display: "flex", flexDirection: "column", mt: 4 }}>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: "none",
                color: location.pathname === "/" ? (darkMode ? "#4da6ff" : "#001d40") : darkMode ? "#e0e0e0" : "#333",
                fontSize: "20px",
                fontWeight: location.pathname === "/" ? "bold" : "normal",
                padding: "10px",
              }}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: "none",
                color: location.pathname === "/favorites" ? (darkMode ? "#4da6ff" : "#001d40") : darkMode ? "#e0e0e0" : "#333",
                fontSize: "20px",
                fontWeight: location.pathname === "/favorites" ? "bold" : "normal",
                padding: "10px",
              }}
            >
              Favorites
            </Link>
          </Box>

          {/* Dark Mode Toggle */}
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <ThemeSwitch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              icon={<LightMode sx={{ fontSize: "18px", color: "#ffcc00" }} />}
              checkedIcon={<DarkMode sx={{ fontSize: "18px", color: "#4da6ff" }} />}
            />
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
