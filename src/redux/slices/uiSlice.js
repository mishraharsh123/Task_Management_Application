import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isFormOpen: false,
  editingTask: null,
  darkMode: localStorage.getItem("darkMode") === "true",
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openForm: (state) => {
      state.isFormOpen = true
    },
    closeForm: (state) => {
      state.isFormOpen = false
      state.editingTask = null
    },
    setEditingTask: (state, action) => {
      state.editingTask = action.payload
      state.isFormOpen = true
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      localStorage.setItem("darkMode", state.darkMode)
    },
  },
})

export const { openForm, closeForm, setEditingTask, toggleDarkMode } = uiSlice.actions

export default uiSlice.reducer

