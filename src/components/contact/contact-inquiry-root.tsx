"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type UseFormRegister } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  contactInquiryFormSchema,
  type ContactInquiryForm,
} from "@/lib/validations/contact-inquiry"

type Ctx = {
  openForm: () => void
  closeForm: () => void
}

const ContactInquiryContext = createContext<Ctx | null>(null)

export function useContactInquiry(): Ctx {
  const c = useContext(ContactInquiryContext)
  if (!c) {
    throw new Error(
      "useContactInquiry deve usarse dentro de ContactInquiryProvider"
    )
  }
  return c
}

export function ContactInquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const openForm = useCallback(() => setOpen(true), [])
  const closeForm = useCallback(() => setOpen(false), [])
  const v = useMemo(
    () => ({ openForm, closeForm }) satisfies Ctx,
    [openForm, closeForm]
  )
  return (
    <ContactInquiryContext.Provider value={v}>
      {children}
      <ContactInquiryFormDialog open={open} onOpenChange={setOpen} />
    </ContactInquiryContext.Provider>
  )
}

/** Estilos via `className` (p.ex. `buttonVariants` + outras). */
export function CtaEspecialistaAction({
  className,
  children,
  onBeforeOpen,
}: {
  className?: string
  children: ReactNode
  /** P.ex. fechar o menu mobile antes de abrir o formulário. */
  onBeforeOpen?: () => void
}) {
  const { openForm } = useContactInquiry()
  return (
    <button
      type="button"
      onClick={() => {
        onBeforeOpen?.()
        openForm()
      }}
      className={className}
    >
      {children}
    </button>
  )
}

function def(): ContactInquiryForm {
  return { name: "", email: "", phone: "", company: "", message: "", honey: "" }
}

function ContactInquiryFormDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
}) {
  const [formError, setFormError] = useState<string | null>(null)
  const [ok, setOk] = useState(false)
  const { register, handleSubmit, formState, reset } =
    useForm<ContactInquiryForm>({
      resolver: zodResolver(contactInquiryFormSchema),
      defaultValues: def(),
    })
  const { errors, isSubmitting } = formState

  const onSubmit = handleSubmit(async (data) => {
    if (data.honey && data.honey.length > 0) {
      return
    }
    setFormError(null)
    setOk(false)
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || "",
        message: data.message,
        honey: "",
      }),
    })
    const json = (await res
      .json()
      .catch(() => ({}))) as { error?: string }
    if (!res.ok) {
      setFormError(
        json.error || "Não foi possível enviar. Tente de novo em instantes."
      )
      return
    }
    setOk(true)
    reset(def())
  })

  const close = (n: boolean) => {
    if (!n) {
      setFormError(null)
      setOk(false)
      reset(def())
    }
    onOpenChange(n)
  }

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent
        className="flex !z-[120] w-[calc(100%-1.5rem)] max-w-lg flex-col gap-0 !rounded-2xl p-0"
        showCloseButton
      >
        <form
          className="max-h-[min(88dvh,680px)] overflow-y-auto p-4 sm:p-5"
          onSubmit={onSubmit}
          noValidate
        >
          <DialogHeader className="pr-4 text-left">
            <DialogTitle className="text-lg font-semibold sm:text-xl">
              Falar com um especialista
            </DialogTitle>
            <DialogDescription className="pt-0.5 text-pretty text-sm sm:text-sm">
              Preenche o formulário. A equipa responde por e-mail com a referência
              do teu pedido.
            </DialogDescription>
          </DialogHeader>
          {ok && (
            <p
              className="mb-2 mt-3 rounded-xl border border-bb-secondary/30 bg-bb-secondary/10 px-3 py-2.5 text-sm text-foreground"
              role="status"
            >
              Obrigado! Recebemos a tua mensagem. Entraremos em contacto em
              breve.
            </p>
          )}
          {formError && (
            <p
              className="mb-2 mt-3 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
              role="alert"
            >
              {formError}
            </p>
          )}

          <div className="mt-3 flex flex-col gap-3">
            <HoneypotField register={register} />

            <Field
              id="inquiry-name"
              label="Nome completo"
              required
              error={errors.name?.message}
            >
              <Input
                id="inquiry-name"
                className="min-h-10 w-full"
                autoComplete="name"
                disabled={isSubmitting}
                aria-invalid={!!errors.name}
                {...register("name")}
              />
            </Field>
            <Field
              id="inquiry-email"
              label="E-mail"
              required
              error={errors.email?.message}
            >
              <Input
                id="inquiry-email"
                type="email"
                className="min-h-10 w-full"
                autoComplete="email"
                disabled={isSubmitting}
                aria-invalid={!!errors.email}
                {...register("email")}
              />
            </Field>
            <Field
              id="inquiry-phone"
              label="Telefone"
              required
              error={errors.phone?.message}
            >
              <Input
                id="inquiry-phone"
                type="tel"
                className="min-h-10 w-full"
                autoComplete="tel"
                placeholder="(00) 0000-0000"
                disabled={isSubmitting}
                aria-invalid={!!errors.phone}
                {...register("phone")}
              />
            </Field>
            <Field id="inquiry-company" label="Empresa ou entidade" error={errors.company?.message}>
              <Input
                id="inquiry-company"
                className="min-h-10 w-full"
                autoComplete="organization"
                disabled={isSubmitting}
                aria-invalid={!!errors.company}
                {...register("company")}
              />
            </Field>
            <Field
              id="inquiry-message"
              label="Em que te podemos ajudar?"
              required
              error={errors.message?.message}
            >
              <Textarea
                id="inquiry-message"
                className="min-h-28 w-full resize-y"
                rows={5}
                autoComplete="off"
                disabled={isSubmitting}
                aria-invalid={!!errors.message}
                placeholder="Descreve o contexto, o ambiente (software, hardware, automação) e o prazo, se fizer sentido."
                {...register("message")}
              />
            </Field>
          </div>
          <div className="mt-5 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="h-12 !rounded-2xl"
              onClick={() => close(false)}
              disabled={isSubmitting}
            >
              Fechar
            </Button>
            <Button
              type="submit"
              className="h-12 !rounded-2xl"
              variant="cta"
              disabled={isSubmitting}
            >
              {isSubmitting ? "A enviar…" : "Enviar pedido"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function HoneypotField({
  register,
}: {
  register: UseFormRegister<ContactInquiryForm>
}) {
  return (
    <div className="h-0 overflow-hidden opacity-0" aria-hidden>
      <input type="text" autoComplete="off" tabIndex={-1} {...register("honey")} />
    </div>
  )
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <Label className="mb-1" htmlFor={id}>
        {label}{" "}
        {required ? <span className="text-bb-cta">*</span> : null}
      </Label>
      {children}
      {error && (
        <p className="mt-0.5 text-xs text-destructive">{error}</p>
      )}
    </div>
  )
}
