"use client"
import { useSelector } from "react-redux"
import { Container, Box, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import Header from "./components/Header"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import FilterBar from "./components/FilterBar"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"

function App() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isFormOpen = useSelector((state) => state.ui.isFormOpen)
  const darkMode = useSelector((state) => state.ui.darkMode)

  // Use TouchBackend for mobile devices and HTML5Backend for desktop
  const backendForDND = isMobile ? TouchBackend : HTML5Backend

  return (
    <DndProvider backend={backendForDND}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          transition: "all 0.3s ease",
        }}
      >
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Header />
          <FilterBar />
          {isFormOpen && <TaskForm />}
          <TaskList />
        </Container>
      </Box>
    </DndProvider>
  )
}

export default App

