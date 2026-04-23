"use client"

import { motion, useReducedMotion } from "framer-motion"

import { CtaEspecialistaAction } from "@/components/contact/contact-inquiry-root"
import { buttonVariants } from "@/components/ui/button"
import { TechHeroBackground } from "@/components/landing/tech-hero-bg"
import { SectionContainer } from "@/components/landing/section-container"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const reduce = useReducedMotion()

  return (
    <section
      className="relative border-b border-border/50 bg-background/40"
      id="inicio"
    >
      <TechHeroBackground />
      <SectionContainer
        className="relative z-10 pb-20 pt-10 sm:pb-28 sm:pt-12 lg:pt-16"
        tight
      >
        <div className="max-w-3xl">
          <motion.p
            className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-bb-primary sm:text-sm"
            initial={reduce ? undefined : { opacity: 0, y: 6 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0, ease: [0.16, 1, 0.3, 1] }}
          >
            BlueBeaver
          </motion.p>
          <motion.h1
            className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl sm:leading-tight md:text-5xl md:leading-[1.08] lg:text-[3.2rem] lg:leading-[1.06]"
            initial={reduce ? undefined : { opacity: 0, y: 14 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
          >
            Soluções que não podem falhar.
          </motion.h1>
          <motion.p
            className="mt-5 text-lg font-medium text-bb-primary/95 sm:text-xl"
            initial={reduce ? undefined : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Engenharia de software, hardware e automação para ambientes
            críticos.
          </motion.p>
          <motion.p
            className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg"
            initial={reduce ? undefined : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            Projetamos e desenvolvemos sistemas sob medida para operações onde
            precisão, confiabilidade e integração são essenciais.
          </motion.p>
          <motion.div
            className="mt-8 w-full max-w-sm sm:mt-10"
            initial={reduce ? undefined : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <CtaEspecialistaAction
              className={cn(
                buttonVariants({ variant: "cta" }),
                "inline-flex min-h-12 w-full min-w-0 items-center justify-center gap-2"
              )}
            >
              <span aria-hidden>👉</span>
              Falar com um especialista
            </CtaEspecialistaAction>
          </motion.div>
        </div>
      </SectionContainer>
    </section>
  )
}
