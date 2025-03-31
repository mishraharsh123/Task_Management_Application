import { createSlice } from "@reduxjs/toolkit"

// Load filters from localStorage
const loadFilters = () => {
  try {
    const filters = localStorage.getItem("filters")
    return filters ? JSON.parse(filters) : { status: "all", sortBy: "createdAt", sortDirection: "desc" }
  } catch (error) {
    console.error("Error loading filters from localStorage:", error)
    return { status: "all", sortBy: "createdAt", sortDirection: "desc" }
  }
}

// Save filters to localStorage
const saveFilters = (filters) => {
  try {
    localStorage.setItem("filters", JSON.stringify(filters))
  } catch (error) {
    console.error("Error saving filters to localStorage:", error)
  }
}

const initialState = loadFilters()

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.status = action.payload
      saveFilters(state)
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
      saveFilters(state)
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload
      saveFilters(state)
    },
  },
})

export const { setStatusFilter, setSortBy, setSortDirection } = filtersSlice.actions

export default filtersSlice.reducer

