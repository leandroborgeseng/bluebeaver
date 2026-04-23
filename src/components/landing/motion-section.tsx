"use client"

import { type ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

type MotionSectionProps = {
  id?: string
  className?: string
  children: ReactNode
  delay?: number
}

export function MotionSection({ id, className, children, delay = 0 }: MotionSectionProps) {
  const reduce = useReducedMotion()
  return (
    <motion.section
      id={id}
      className={cn("relative", className)}
      initial={reduce ? undefined : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{
        delay,
        duration: 0.48,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.section>
  )
}
