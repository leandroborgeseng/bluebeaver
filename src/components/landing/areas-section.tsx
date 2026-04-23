import { Code2, Cpu, Workflow } from "lucide-react"

import { MotionSection } from "@/components/landing/motion-section"
import { SectionContainer } from "@/components/landing/section-container"
import { cn } from "@/lib/utils"

const areas = [
  {
    title: "Software",
    icon: Code2,
    items: [
      "Sistemas desenvolvidos sob medida",
      "Integrações complexas entre sistemas",
      "Plataformas inteligentes e escaláveis",
    ],
  },
  {
    title: "Hardware",
    icon: Cpu,
    items: [
      "Desenvolvimento de dispositivos dedicados",
      "Instrumentação e controle",
      "Integração entre sistemas físicos e digitais",
    ],
  },
  {
    title: "Automação",
    icon: Workflow,
    items: [
      "Automação de processos críticos",
      "Sistemas embarcados",
      "Integração de equipamentos e infraestrutura",
    ],
  },
] as const

export function AreasSection() {
  return (
    <MotionSection
      id="atuacao"
      className="border-b border-border/50 bg-background/60"
    >
      <SectionContainer>
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          Áreas de atuação
        </h2>
        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((block) => (
            <div
              key={block.title}
              className={cn(
                "group flex h-full min-h-0 flex-col",
                "rounded-2xl border border-border/70 bg-white p-6",
                "shadow-sm shadow-foreground/5",
                "transition",
                "hover:-translate-y-0.5 hover:border-bb-primary/20 hover:shadow-md"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 min-h-10 min-w-10 items-center justify-center rounded-2xl bg-bb-primary/10 text-bb-primary"
                  aria-hidden
                >
                  <block.icon className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {block.title}
                </h3>
              </div>
              <ul className="mt-4 flex list-none flex-col gap-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {block.items.map((line) => (
                  <li key={line} className="flex gap-2.5 pl-0">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bb-secondary/90"
                      aria-hidden
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionContainer>
    </MotionSection>
  )
}
