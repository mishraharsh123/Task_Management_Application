"use client"

import { format } from "date-fns"
import { Calendar, Edit, GripVertical, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Task } from "@/lib/types"

interface TaskItemProps {
  task: Task
  onToggleStatus: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export function TaskItem({ task, onToggleStatus, onEdit, onDelete }: TaskItemProps) {
  const priorityColors = {
    low: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
    medium: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    high: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  }

  return (
    <Card className={`${task.status === "complete" ? "opacity-70" : ""}`}>
      <CardContent className="p-4 flex items-start gap-3">
        <div className="flex items-center h-full pt-1">
          <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
        </div>

        <Checkbox
          checked={task.status === "complete"}
          onCheckedChange={() => onToggleStatus(task.id)}
          className="mt-1"
        />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className={`font-medium ${task.status === "complete" ? "line-through text-muted-foreground" : ""}`}>
              {task.title}
            </h3>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={priorityColors[task.priority]}>
                {task.priority}
              </Badge>

              {task.dueDate && (
                <div className="text-xs flex items-center text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {format(new Date(task.dueDate), "MMM d")}
                </div>
              )}
            </div>
          </div>

          {task.description && (
            <p
              className={`text-sm mt-1 ${task.status === "complete" ? "text-muted-foreground" : "text-muted-foreground"}`}
            >
              {task.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => onEdit(task)} className="h-8 w-8">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

