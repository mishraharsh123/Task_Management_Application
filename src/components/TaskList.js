"use client"
import { useSelector } from "react-redux"
import { Box, Typography, Alert, AlertTitle } from "@mui/material"
import TaskItem from "./TaskItem"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
import { reorderTasks } from "../redux/slices/tasksSlice"

const TaskList = () => {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks.tasks)
  const { status, sortBy, sortDirection } = useSelector((state) => state.filters)

  // Filter tasks based on status
  const filteredTasks = tasks.filter((task) => {
    if (status === "all") return true
    return task.status === status
  })

  // Sort tasks based on sortBy and sortDirection
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "createdAt") {
      return sortDirection === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === "dueDate") {
      if (!a.dueDate) return sortDirection === "asc" ? 1 : -1
      if (!b.dueDate) return sortDirection === "asc" ? -1 : 1
      return sortDirection === "asc"
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    } else if (sortBy === "priority") {
      const priorityValues = { high: 3, medium: 2, low: 1 }
      return sortDirection === "asc"
        ? priorityValues[a.priority] - priorityValues[b.priority]
        : priorityValues[b.priority] - priorityValues[a.priority]
    }
    return 0
  })

  const handleDragEnd = (result) => {
    if (!result.destination) return

    dispatch(
      reorderTasks({
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      }),
    )
  }

  if (sortedTasks.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        <AlertTitle>No tasks found</AlertTitle>
        Create a new task to get started!
      </Alert>
    )
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom sx={{ ml: 1 }}>
        {status === "all" ? "All Tasks" : status === "complete" ? "Completed Tasks" : "Incomplete Tasks"}(
        {sortedTasks.length})
      </Typography>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef} sx={{ mt: 2 }}>
              {sortedTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        mb: 2,
                        transform: snapshot.isDragging ? "rotate(1deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    >
                      <TaskItem task={task} />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  )
}

export default TaskList

