import { createTheme } from "@mui/material/styles"
import { red, blue, grey } from "@mui/material/colors"

// Create a theme instance based on user preference
const getTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: blue[600],
      },
      secondary: {
        main: darkMode ? blue[300] : blue[700],
      },
      error: {
        main: red[500],
      },
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: darkMode ? grey[100] : grey[900],
        secondary: darkMode ? grey[400] : grey[700],
      },
    },
    typography: {
      fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: darkMode ? "0 2px 8px rgba(0, 0, 0, 0.3)" : "0 2px 8px rgba(0, 0, 0, 0.1)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
  })

// Get initial theme based on localStorage
const initialDarkMode = localStorage.getItem("darkMode") === "true"
const theme = getTheme(initialDarkMode)

export default theme

