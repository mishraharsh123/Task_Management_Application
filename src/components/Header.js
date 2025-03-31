"use client"
import { useDispatch, useSelector } from "react-redux"
import { AppBar, Toolbar, Typography, Button, IconButton, Box, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import AddIcon from "@mui/icons-material/Add"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import { openForm } from "../redux/slices/uiSlice"
import { toggleDarkMode } from "../redux/slices/uiSlice"

const Header = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const darkMode = useSelector((state) => state.ui.darkMode)

  return (
    <AppBar
      position="static"
      color="primary"
      elevation={0}
      sx={{
        mb: 4,
        borderRadius: 1,
        background: theme.palette.primary.main,
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
            Task Manager
          </Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
            Organize your tasks efficiently
          </Typography>
        </Box>

        <IconButton color="inherit" onClick={() => dispatch(toggleDarkMode())} sx={{ mr: 1 }}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={() => dispatch(openForm())}
          size={isMobile ? "small" : "medium"}
        >
          {isMobile ? "Add" : "Add Task"}
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header

