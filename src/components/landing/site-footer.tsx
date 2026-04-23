import { BrandLogo } from "@/components/brand/brand-logo"
import { SectionContainer } from "@/components/landing/section-container"

export function SiteFooter() {
  return (
    <footer
      className="border-t border-border/50 bg-white text-muted-foreground"
    >
      <SectionContainer
        className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        tight
      >
        <div>
          <BrandLogo size="footer" />
          <p className="mt-2.5 text-sm sm:mt-3 sm:text-base">
            Engenharia e tecnologia
          </p>
        </div>
        <p className="text-xs sm:text-sm">
          Todos os direitos reservados
        </p>
      </SectionContainer>
    </footer>
  )
}
