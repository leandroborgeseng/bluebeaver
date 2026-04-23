"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Cookie } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  getStoredCookieConsent,
  setStoredCookieConsent,
  type CookieConsentValue,
} from "@/lib/cookie-consent"

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (getStoredCookieConsent() === null) setVisible(true)
    })
    return () => cancelAnimationFrame(id)
  }, [])

  const choose = (v: CookieConsentValue) => {
    setStoredCookieConsent(v)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          key="cookie-banner"
          className="pointer-events-auto fixed bottom-0 left-0 right-0 z-[100] w-full p-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0))] sm:p-4"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          role="region"
          aria-label="Consentimento de cookies e dados"
        >
          <div
            className={cn(
              "mx-auto w-full max-w-3xl",
              "rounded-2xl border border-border/80 bg-background/95 p-4",
              "shadow-2xl shadow-foreground/10",
              "backdrop-blur-xl sm:p-5",
              /* Em ecram largos: texto + botões; sem w-full no grupo de botões a esmagar o texto */
              "flex flex-col gap-4 md:flex-row md:items-start md:gap-6"
            )}
          >
            <div className="flex w-full min-w-0 flex-1 gap-3">
              <span
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-bb-primary/10 text-bb-primary"
                aria-hidden
              >
                <Cookie className="size-4" strokeWidth={1.8} />
              </span>
              <div className="min-w-0 flex-1 self-stretch pr-0">
                <p className="text-base font-medium text-foreground">
                  Cookies e privacidade
                </p>
                <p className="mt-1.5 break-words text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Utilizamos cookies necessários para o sítio funcionar e, com o
                  teu acordo, métricas para perceber como é usado, em linha com
                  a LGPD. Podes recusar os que não forem essenciais.
                </p>
              </div>
            </div>

            <div
              className={cn(
                "flex w-full shrink-0 flex-col gap-2.5",
                "md:mt-0 md:w-52 md:min-w-52",
                "lg:w-60 lg:min-w-60"
              )}
            >
              <Button
                type="button"
                className="h-12 min-h-12 w-full"
                variant="cta"
                onClick={() => choose("all")}
              >
                Aceitar
              </Button>
              <button
                type="button"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 min-h-12 w-full !rounded-2xl px-4 text-sm font-medium"
                )}
                onClick={() => choose("essentials")}
              >
                Apenas essenciais
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
