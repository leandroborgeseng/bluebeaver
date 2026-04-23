import { CtaEspecialistaAction } from "@/components/contact/contact-inquiry-root"
import { buttonVariants } from "@/components/ui/button"
import { SectionContainer } from "@/components/landing/section-container"
import { cn } from "@/lib/utils"

export function CtaSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-border/50 bg-bb-primary/5"
      id="proposta"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: [
            "radial-gradient(50%_60% at 0% 100%, rgba(0,102,178,0.16), transparent)",
            "radial-gradient(40% 50% at 100% 0%, rgba(40,180,0,0.08), transparent)",
          ].join(", "),
        }}
        aria-hidden
      />
      <SectionContainer className="relative z-0">
        <div className="max-w-3xl">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Se o seu problema é simples, não somos a melhor opção.
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
            Mas se envolve complexidade, integração e alto nível técnico,
            podemos construir uma solução sob medida para sua operação.
          </p>
          <CtaEspecialistaAction
            className={cn(
              buttonVariants({ variant: "cta" }),
              "mt-8 inline-flex min-h-12 min-w-[10rem] items-center justify-center gap-2 sm:mt-10"
            )}
          >
            <span className="shrink-0" aria-hidden>👉</span>
            Falar com um especialista
          </CtaEspecialistaAction>
        </div>
      </SectionContainer>
    </section>
  )
}
