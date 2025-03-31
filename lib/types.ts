export interface Task {
  id: string
  title: string
  description: string
  status: "complete" | "incomplete"
  priority: "high" | "medium" | "low"
  createdAt: string
  dueDate?: string
}

