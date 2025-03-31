"use client"

import { ThemeProvider } from "@/components/theme-provider"
import TaskManager from "@/components/task-manager"

export default function Home() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="task-manager-theme">
      <TaskManager />
    </ThemeProvider>
  )
}

