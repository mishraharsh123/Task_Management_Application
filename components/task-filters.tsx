"use client"

import { Filter, ArrowDownAZ, ArrowUpAZ } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface TaskFiltersProps {
  filterStatus: string
  setFilterStatus: (status: string) => void
  sortBy: string
  setSortBy: (sortBy: string) => void
  sortDirection: "asc" | "desc"
  setSortDirection: (direction: "asc" | "desc") => void
}

export function TaskFilters({
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
}: TaskFiltersProps) {
  const getStatusLabel = () => {
    switch (filterStatus) {
      case "complete":
        return "Completed"
      case "incomplete":
        return "Incomplete"
      default:
        return "All"
    }
  }

  const getSortLabel = () => {
    switch (sortBy) {
      case "createdAt":
        return "Date Created"
      case "dueDate":
        return "Due Date"
      case "priority":
        return "Priority"
      default:
        return "Date Created"
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Showing:</span>
        <Badge variant="outline">{getStatusLabel()}</Badge>

        <span className="text-sm font-medium ml-2">Sort:</span>
        <Badge variant="outline">{getSortLabel()}</Badge>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
          className="h-8 w-8"
        >
          {sortDirection === "asc" ? <ArrowUpAZ className="h-4 w-4" /> : <ArrowDownAZ className="h-4 w-4" />}
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter & Sort</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setFilterStatus("all")}>
              All Tasks
              {filterStatus === "all" && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("incomplete")}>
              Incomplete Tasks
              {filterStatus === "incomplete" && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("complete")}>
              Completed Tasks
              {filterStatus === "complete" && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setSortBy("createdAt")}>
              Date Created
              {sortBy === "createdAt" && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("dueDate")}>
              Due Date
              {sortBy === "dueDate" && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("priority")}>
              Priority
              {sortBy === "priority" && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setSortDirection("asc")}>
              Ascending
              {sortDirection === "asc" && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortDirection("desc")}>
              Descending
              {sortDirection === "desc" && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

