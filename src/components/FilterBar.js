"use client"

import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Box, Button, Menu, MenuItem, Chip, ListItemIcon, ListItemText, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import FilterListIcon from "@mui/icons-material/FilterList"
import SortIcon from "@mui/icons-material/Sort"
import CheckIcon from "@mui/icons-material/Check"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import { setStatusFilter, setSortBy, setSortDirection } from "../redux/slices/filtersSlice"

const FilterBar = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const { status, sortBy, sortDirection } = useSelector((state) => state.filters)

  const [filterAnchorEl, setFilterAnchorEl] = React.useState(null)
  const [sortAnchorEl, setSortAnchorEl] = React.useState(null)

  const openFilterMenu = (event) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const closeFilterMenu = () => {
    setFilterAnchorEl(null)
  }

  const openSortMenu = (event) => {
    setSortAnchorEl(event.currentTarget)
  }

  const closeSortMenu = () => {
    setSortAnchorEl(null)
  }

  const handleStatusChange = (newStatus) => {
    dispatch(setStatusFilter(newStatus))
    closeFilterMenu()
  }

  const handleSortByChange = (newSortBy) => {
    dispatch(setSortBy(newSortBy))
    closeSortMenu()
  }

  const handleSortDirectionChange = () => {
    dispatch(setSortDirection(sortDirection === "asc" ? "desc" : "asc"))
  }

  const getStatusLabel = () => {
    switch (status) {
      case "complete":
        return "Completed"
      case "incomplete":
        return "Incomplete"
      default:
        return "All"
    }
  }

  const getSortByLabel = () => {
    switch (sortBy) {
      case "createdAt":
        return "Date Created"
      case "dueDate":
        return "Due Date"
      case "priority":
        return "Priority"
      default:
        return "Date Created"
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 3,
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Chip
          label={`Status: ${getStatusLabel()}`}
          onClick={openFilterMenu}
          deleteIcon={<FilterListIcon />}
          onDelete={openFilterMenu}
        />

        <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={closeFilterMenu}>
          <MenuItem onClick={() => handleStatusChange("all")}>
            <ListItemIcon>{status === "all" && <CheckIcon fontSize="small" />}</ListItemIcon>
            <ListItemText>All Tasks</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleStatusChange("incomplete")}>
            <ListItemIcon>{status === "incomplete" && <CheckIcon fontSize="small" />}</ListItemIcon>
            <ListItemText>Incomplete</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleStatusChange("complete")}>
            <ListItemIcon>{status === "complete" && <CheckIcon fontSize="small" />}</ListItemIcon>
            <ListItemText>Completed</ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Chip
          label={`Sort: ${getSortByLabel()}`}
          onClick={openSortMenu}
          deleteIcon={<SortIcon />}
          onDelete={openSortMenu}
        />

        <Button size="small" variant="outlined" onClick={handleSortDirectionChange} sx={{ minWidth: "auto", p: "4px" }}>
          {sortDirection === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </Button>

        <Menu anchorEl={sortAnchorEl} open={Boolean(sortAnchorEl)} onClose={closeSortMenu}>
          <MenuItem onClick={() => handleSortByChange("createdAt")}>
            <ListItemIcon>{sortBy === "createdAt" && <CheckIcon fontSize="small" />}</ListItemIcon>
            <ListItemText>Date Created</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleSortByChange("dueDate")}>
            <ListItemIcon>{sortBy === "dueDate" && <CheckIcon fontSize="small" />}</ListItemIcon>
            <ListItemText>Due Date</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleSortByChange("priority")}>
            <ListItemIcon>{sortBy === "priority" && <CheckIcon fontSize="small" />}</ListItemIcon>
            <ListItemText>Priority</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}

export default FilterBar

