"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  IconButton,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import CloseIcon from "@mui/icons-material/Close"
import { addTask, updateTask } from "../redux/slices/tasksSlice"
import { closeForm } from "../redux/slices/uiSlice"

const TaskForm = () => {
  const dispatch = useDispatch()
  const editingTask = useSelector((state) => state.ui.editingTask)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("medium")
  const [dueDate, setDueDate] = useState(null)
  const [titleError, setTitleError] = useState(false)

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description || "")
      setPriority(editingTask.priority)
      setDueDate(editingTask.dueDate ? new Date(editingTask.dueDate) : null)
    }
  }, [editingTask])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) {
      setTitleError(true)
      return
    }

    const taskData = {
      title,
      description,
      priority,
      dueDate: dueDate ? dueDate.toISOString() : null,
    }

    if (editingTask) {
      dispatch(updateTask({ id: editingTask.id, ...taskData }))
    } else {
      dispatch(addTask(taskData))
    }

    dispatch(closeForm())
  }

  return (
    <Card sx={{ mb: 3, position: "relative" }}>
      <IconButton size="small" onClick={() => dispatch(closeForm())} sx={{ position: "absolute", right: 8, top: 8 }}>
        <CloseIcon />
      </IconButton>

      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {editingTask ? "Edit Task" : "Add New Task"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Task Title"
            name="title"
            autoFocus
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              if (e.target.value.trim()) setTitleError(false)
            }}
            error={titleError}
            helperText={titleError ? "Title is required" : ""}
          />

          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            name="description"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Priority</FormLabel>
            <RadioGroup row name="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <FormControlLabel value="low" control={<Radio />} label="Low" />
              <FormControlLabel value="medium" control={<Radio />} label="Medium" />
              <FormControlLabel value="high" control={<Radio />} label="High" />
            </RadioGroup>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due Date (Optional)"
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth sx={{ mt: 2 }} />}
              sx={{ mt: 2, width: "100%" }}
            />
          </LocalizationProvider>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
        <Button onClick={() => dispatch(closeForm())}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {editingTask ? "Update" : "Create"}
        </Button>
      </CardActions>
    </Card>
  )
}

export default TaskForm

