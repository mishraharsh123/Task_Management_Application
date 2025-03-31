import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

// Load tasks from localStorage
const loadTasks = () => {
  try {
    const tasks = localStorage.getItem("tasks")
    return tasks ? JSON.parse(tasks) : []
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error)
    return []
  }
}

// Save tasks to localStorage
const saveTasks = (tasks) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error)
  }
}

const initialState = {
  tasks: loadTasks(),
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description,
        priority: action.payload.priority,
        status: "incomplete",
        createdAt: new Date().toISOString(),
        dueDate: action.payload.dueDate,
      }
      state.tasks = [newTask, ...state.tasks]
      saveTasks(state.tasks)
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map((task) => (task.id === action.payload.id ? { ...task, ...action.payload } : task))
      saveTasks(state.tasks)
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
      saveTasks(state.tasks)
    },
    toggleTaskStatus: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? {
              ...task,
              status: task.status === "complete" ? "incomplete" : "complete",
            }
          : task,
      )
      saveTasks(state.tasks)
    },
    reorderTasks: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload
      const result = Array.from(state.tasks)
      const [removed] = result.splice(sourceIndex, 1)
      result.splice(destinationIndex, 0, removed)
      state.tasks = result
      saveTasks(state.tasks)
    },
  },
})

export const { addTask, updateTask, deleteTask, toggleTaskStatus, reorderTasks } = tasksSlice.actions

export default tasksSlice.reducer

