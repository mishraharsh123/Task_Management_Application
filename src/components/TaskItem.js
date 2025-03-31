"use client"
import { useDispatch } from "react-redux"
import { Card, CardContent, Typography, Checkbox, IconButton, Box, Chip, Tooltip, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import { format } from "date-fns"
import { toggleTaskStatus, deleteTask } from "../redux/slices/tasksSlice"
import { setEditingTask } from "../redux/slices/uiSlice"

const TaskItem = ({ task }) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const priorityColors = {
    low: theme.palette.info.main,
    medium: theme.palette.warning.main,
    high: theme.palette.error.main,
  }

  const handleToggleStatus = () => {
    dispatch(toggleTaskStatus(task.id))
  }

  const handleEdit = () => {
    dispatch(setEditingTask(task))
  }

  const handleDelete = () => {
    dispatch(deleteTask(task.id))
  }

  return (
    <Card 
      sx={{ 
        opacity: task.status === 'complete' ? 0.7 : 1,
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
            <DragIndicatorIcon 
              sx={{ 
                color: 'text.secondary',
                cursor: 'grab',
                mr: 1
              }} 
            />
            <Checkbox
              checked={task.status === 'complete'}
              onChange={handleToggleStatus}
              color="primary"
            />
          </Box>
          
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography 
                variant="subtitle1" 
                component="h3" 
                sx={{ 
                  fontWeight: 500,
                  textDecoration: task.status === 'complete' ? 'line-through' : 'none',
                  color: task.status === 'complete' ? 'text.secondary' : 'text.primary',
                  mr: 1,
                }}
              >
                {task.title}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                <Chip 
                  label={task.priority}
                  size="small"
                  sx={{ 
                    bgcolor: `${priorityColors[task.priority]}20`,
                    color: priorityColors[task.priority],
                    fontWeight: 500,
                  }}
                />
                
                {task.dueDate && (
                  <Tooltip title="Due date">
                    <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', color: 'text.secondary' }}>
                      <CalendarTodayIcon sx={{ fontSize: '0.875rem', mr: 0.5 }} />
                      {format(new Date(task.dueDate), 'MMM d')}
                    </Box>
                  </Tooltip>
                )}
              </Box>
            </Box>
            
            {task.description && (
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  mt: 0.5,\
                  textDecoration: task.status === 'complete\' ? \'line-through\' : \'none
                  mt: 0.5,
                  textDecoration: task.status === 'complete' ? 'line-through' : 'none',
                  opacity: task.status === 'complete' ? 0.7 : 1,
                }}
              >
                {task.description}
              </Typography>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', ml: 1 }}>
            <IconButton 
              size="small" 
              onClick={handleEdit}
              sx={{ mr: 0.5 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={handleDelete}
              color="error"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TaskItem

