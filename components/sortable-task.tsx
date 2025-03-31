"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { Task } from "@/lib/types"
import { TaskItem } from "@/components/task-item"

interface SortableTaskProps {
  task: Task
  onToggleStatus: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export function SortableTask({ task, onToggleStatus, onEdit, onDelete }: SortableTaskProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskItem task={task} onToggleStatus={onToggleStatus} onEdit={onEdit} onDelete={onDelete} />
    </div>
  )
}

