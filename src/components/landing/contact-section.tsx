import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { MotionSection } from "@/components/landing/motion-section"
import { SectionContainer } from "@/components/landing/section-container"
import { buttonVariants } from "@/components/ui/button"
import { contact, hasExtendedContactData, whatsappHref } from "@/lib/contact"
import { contactMailto } from "@/lib/site"
import { cn } from "@/lib/utils"

function telHref(phone: string) {
  const d = phone.replace(/\D/g, "")
  if (d.length === 10 || d.length === 11) {
    return `tel:+55${d}`
  }
  const t = phone.replace(/\s/g, "")
  if (t.startsWith("+")) return `tel:${t}`
  if (d.length) return `tel:+${d}`
  return "tel:"
}

export function ContactSection() {
  return (
    <MotionSection
      id="contato"
      className="border-b border-border/50 bg-background/60"
    >
      <SectionContainer>
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          Contato
        </h2>
        <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          Fale com a equipa para analisar o seu cenário. Telefone, e-mail, morada
          e canais de mensagem estão abaixo.
        </p>
        <div className="mt-8 grid gap-6 sm:mt-10 md:grid-cols-2">
          <div className="flex min-h-12 flex-col gap-3 rounded-2xl border border-border/70 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              E-mail
            </h3>
            <a
              className={cn(
                buttonVariants({ variant: "ctaSubtle" }),
                "inline-flex w-full max-w-sm items-center justify-center gap-2 no-underline sm:w-auto"
              )}
              href={contactMailto}
            >
              <Mail className="size-4 shrink-0" aria-hidden />
              {contact.email}
            </a>
          </div>

          {contact.phones.length > 0 && (
            <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Telefone
              </h3>
              <ul className="flex flex-col gap-2">
                {contact.phones.map((p) => (
                  <li key={p}>
                    <a
                      className="inline-flex min-h-12 items-center gap-2 text-base font-medium text-bb-primary underline-offset-2 hover:underline"
                      href={telHref(p)}
                    >
                      <Phone className="size-4 shrink-0" aria-hidden />
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {whatsappHref && (
            <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-white p-5 shadow-sm sm:p-6 md:col-span-1">
              <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                WhatsApp
              </h3>
              <a
                className={cn(
                  buttonVariants({ variant: "brand" }),
                  "min-h-12 w-full max-w-sm justify-center sm:w-auto"
                )}
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4 shrink-0" aria-hidden />
                Conversar no WhatsApp
              </a>
            </div>
          )}

          {contact.addresses.length > 0 && (
            <div
              className={cn(
                "flex flex-col gap-4 rounded-2xl border border-border/70 bg-white p-5 shadow-sm sm:p-6",
                "md:col-span-2"
              )}
            >
              <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Moradas
              </h3>
              <ul className="grid gap-5 sm:grid-cols-2">
                {contact.addresses.map((a) => (
                  <li key={a.lines[0] + (a.label || "")} className="flex gap-3">
                    <MapPin
                      className="mt-0.5 size-5 shrink-0 text-bb-primary"
                      aria-hidden
                    />
                    <div>
                      {a.label ? (
                        <p className="font-medium text-foreground">{a.label}</p>
                      ) : null}
                      {a.lines.map((line) => (
                        <p
                          key={line}
                          className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                        >
                          {line}
                        </p>
                      ))}
                      {a.mapUrl ? (
                        <a
                          className="mt-2 inline-flex text-sm font-medium text-bb-primary hover:underline"
                          href={a.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver no mapa
                        </a>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {process.env.NODE_ENV === "development" &&
            !hasExtendedContactData() && (
              <p className="text-sm text-amber-800/90 md:col-span-2">
                [Dev] Defina{" "}
                <code className="rounded bg-muted px-1 text-xs">.env.local</code>{" "}
                com telefones e moradas — ver{" "}
                <code className="text-xs">.env.example</code>.
              </p>
            )}
        </div>
      </SectionContainer>
    </MotionSection>
  )
}
