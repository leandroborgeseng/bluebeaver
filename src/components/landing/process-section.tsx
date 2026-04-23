"use client"

import { useReducedMotion } from "framer-motion"
import { motion } from "framer-motion"

import { SectionContainer } from "@/components/landing/section-container"
import { cn } from "@/lib/utils"

const etapas = [
  "Entendimento profundo do problema",
  "Engenharia da solução",
  "Desenvolvimento e integração",
  "Implantação e evolução contínua",
] as const

export function ProcessSection() {
  const reduce = useReducedMotion()

  return (
    <section
      id="como-atuamos"
      className="border-b border-border/50 bg-background/60"
    >
      <SectionContainer>
        <h2 className="max-w-3xl text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          Uma abordagem estruturada para problemas complexos
        </h2>
        <ol className="relative mt-10 max-w-3xl space-y-0 sm:mt-12">
          {etapas.map((etapa, index) => (
            <li
              key={etapa}
              className="relative flex gap-4 sm:gap-5"
            >
              {index < etapas.length - 1 && (
                <div
                  className="absolute left-[1.1rem] top-12 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-bb-primary/35 to-transparent"
                  aria-hidden
                />
              )}
              <motion.div
                className={cn(
                  "z-[1] flex h-9 w-9 min-h-9 min-w-9 items-center justify-center",
                  "rounded-2xl border border-bb-primary/25 bg-white text-sm font-bold text-bb-primary"
                )}
                initial={reduce ? undefined : { opacity: 0, scale: 0.92 }}
                whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ delay: index * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {String(index + 1).padStart(2, "0")}
              </motion.div>
              <motion.p
                className="min-h-12 flex-1 self-center text-pretty py-1 text-base font-medium text-foreground sm:min-h-10 sm:py-2 sm:text-lg"
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ delay: 0.05 + index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {etapa}
              </motion.p>
            </li>
          ))}
        </ol>
      </SectionContainer>
    </section>
  )
}
