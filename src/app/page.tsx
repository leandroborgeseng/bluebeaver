import { SiteHeader } from "@/components/landing/site-header"
import { HeroSection } from "@/components/landing/hero-section"
import { PositioningSection } from "@/components/landing/positioning-section"
import { AreasSection } from "@/components/landing/areas-section"
import { DifferentialsSection } from "@/components/landing/differentials-section"
import { ProcessSection } from "@/components/landing/process-section"
import { CtaSection } from "@/components/landing/cta-section"
import { ContactSection } from "@/components/landing/contact-section"
import { SiteFooter } from "@/components/landing/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <SiteHeader />
      <main className="flex min-h-0 flex-1 flex-col" id="conteudo-principal">
        <HeroSection />
        <PositioningSection />
        <AreasSection />
        <DifferentialsSection />
        <ProcessSection />
        <ContactSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}
