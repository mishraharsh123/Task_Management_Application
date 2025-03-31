import type { Task } from "@/lib/types"
import { SortableTask } from "@/components/sortable-task"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface TaskListProps {
  tasks: Task[]
  onToggleStatus: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, onToggleStatus, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Alert className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>No tasks found. Create a new task to get started!</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-3 py-4">
      {tasks.map((task) => (
        <SortableTask key={task.id} task={task} onToggleStatus={onToggleStatus} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}

