import { type ReactNode } from "react"

import { cn } from "@/lib/utils"

type SectionContainerProps = {
  children: ReactNode
  className?: string
  tight?: boolean
}

export function SectionContainer({
  children,
  className,
  tight = false,
}: SectionContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
        tight ? "py-12 sm:py-16" : "py-16 sm:py-20 lg:py-24",
        className
      )}
    >
      {children}
    </div>
  )
}
