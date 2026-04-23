import { MotionSection } from "@/components/landing/motion-section"
import { SectionContainer } from "@/components/landing/section-container"
import { AbstractLines } from "@/components/landing/abstract-lines"

export function PositioningSection() {
  return (
    <MotionSection
      id="posicionamento"
      className="border-b border-border/50 bg-white"
    >
      <SectionContainer>
        <div className="grid gap-8 lg:grid-cols-[1fr_min(36%,18rem)] lg:items-start lg:gap-16">
          <div>
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Engenharia aplicada a problemas complexos
            </h2>
            <div className="mt-6 max-w-3xl space-y-4 text-pretty text-base leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg">
              <p>
                A BlueBeaver atua na interseção entre software, hardware e
                automação, desenvolvendo soluções proprietárias para desafios
                que não possuem resposta pronta.
              </p>
              <p>
                Trabalhamos com projetos sob medida em ambientes de alta
                criticidade, onde falhas não são aceitáveis e a integração entre
                sistemas é essencial.
              </p>
              <p>
                Grande parte das nossas soluções envolve desenvolvimento interno
                e projetos sob confidencialidade, garantindo exclusividade e
                alto nível técnico.
              </p>
            </div>
          </div>
          <div className="relative h-32 min-h-[8rem] overflow-hidden rounded-2xl border border-border/60 bg-muted/30 sm:h-40 sm:min-h-40 lg:min-h-[12rem]">
            <AbstractLines className="absolute inset-0" />
          </div>
        </div>
      </SectionContainer>
    </MotionSection>
  )
}
