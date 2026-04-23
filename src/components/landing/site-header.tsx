"use client"

import { useState } from "react"
import { Menu } from "lucide-react"

import { BrandLogo } from "@/components/brand/brand-logo"
import { CtaEspecialistaAction } from "@/components/contact/contact-inquiry-root"
import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { mainNav } from "@/lib/nav"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-2xl supports-backdrop-filter:bg-background/60"
    >
      <div className="mx-auto flex h-16 sm:h-[4.25rem] max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a
          href="#inicio"
          className="group flex min-h-12 min-w-0 shrink-0 items-center"
        >
          <BrandLogo size="header" priority />
        </a>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Principal"
        >
          {mainNav.map((item) => (
            <a
              key={item.id}
              className="rounded-2xl px-3.5 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-bb-primary/5 hover:text-foreground"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CtaEspecialistaAction
            className={cn(
              buttonVariants({ variant: "cta" }),
              "hidden sm:inline-flex",
              "items-center justify-center"
            )}
          >
            <span className="hidden lg:inline" aria-hidden>👉</span>
            Falar com um especialista
          </CtaEspecialistaAction>
          <Button
            type="button"
            variant="ghost"
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="size-5" strokeWidth={1.75} />
          </Button>
        </div>
      </div>
      <CtaEspecialistaAction
        className={cn(
          buttonVariants({ variant: "cta" }),
          "w-full !min-w-0 sm:hidden",
          "min-h-12",
          "inline-flex items-center justify-center gap-2 rounded-none border-0"
        )}
      >
        <span className="shrink-0" aria-hidden>👉</span>
        Falar com um especialista
      </CtaEspecialistaAction>

      <Sheet open={open} onOpenChange={setOpen} modal>
        <SheetContent
          side="right"
          className="flex w-[min(100%,22rem)] flex-col gap-6 p-0 sm:max-w-sm"
          showCloseButton
        >
          <SheetHeader className="flex flex-col gap-3 border-b border-border/80 px-4 pb-4 text-left">
            <BrandLogo size="sheet" />
            <SheetTitle className="text-lg font-semibold">Navegação</SheetTitle>
          </SheetHeader>
          <nav
            className="flex flex-col gap-0.5 px-2"
            aria-label="Mobile"
          >
            {mainNav.map((item) => (
              <a
                key={item.id}
                className="min-h-12 rounded-2xl px-3 py-3.5 text-base font-medium text-foreground active:bg-muted"
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto border-t border-border/80 p-4">
            <CtaEspecialistaAction
              onBeforeOpen={() => setOpen(false)}
              className={cn(
                buttonVariants({ variant: "cta" }),
                "inline-flex w-full !min-w-0 items-center justify-center gap-2"
              )}
            >
              <span className="shrink-0" aria-hidden>👉</span>
              Falar com um especialista
            </CtaEspecialistaAction>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
