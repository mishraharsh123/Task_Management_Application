"use client"

import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

interface TaskHeaderProps {
  onAddTask: () => void
}

export function TaskHeader({ onAddTask }: TaskHeaderProps) {
  return (
    <div className="flex items-center justify-between py-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <p className="text-muted-foreground">Organize your tasks efficiently</p>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button onClick={onAddTask} className="gap-1">
          <PlusCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Add Task</span>
        </Button>
      </div>
    </div>
  )
}

