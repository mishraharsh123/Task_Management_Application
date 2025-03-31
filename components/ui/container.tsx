import type React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className={cn("container mx-auto px-4 py-6 md:py-10", className)} {...props}>
        {children}
      </div>
    </div>
  )
}

