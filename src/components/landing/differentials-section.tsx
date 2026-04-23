import { Check } from "lucide-react"

import { MotionSection } from "@/components/landing/motion-section"
import { SectionContainer } from "@/components/landing/section-container"

const items = [
  "Engenharia multidisciplinar (software + hardware + automação)",
  "Desenvolvimento sob medida para cada cenário",
  "Alta confiabilidade operacional",
  "Integração completa entre sistemas",
  "Tecnologias desenvolvidas internamente",
  "Experiência em ambientes críticos",
] as const

export function DifferentialsSection() {
  return (
    <MotionSection
      id="diferenciais"
      className="border-b border-border/50 bg-white"
    >
      <SectionContainer>
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          Capacidade técnica aplicada na prática
        </h2>
        <ul
          className="mt-8 max-w-3xl space-y-0 divide-y divide-border/80 sm:mt-10"
        >
          {items.map((line) => (
            <li
              key={line}
              className="flex min-h-14 items-start gap-3 py-3.5 sm:min-h-12 sm:items-center"
            >
              <span
                className="mt-0.5 flex h-7 w-7 min-h-7 min-w-7 items-center justify-center rounded-xl bg-bb-secondary/12 text-bb-secondary"
                aria-hidden
              >
                <Check className="size-4" strokeWidth={2.5} />
              </span>
              <span className="text-pretty text-base leading-relaxed text-foreground sm:text-lg">
                {line}
              </span>
            </li>
          ))}
        </ul>
      </SectionContainer>
    </MotionSection>
  )
}
