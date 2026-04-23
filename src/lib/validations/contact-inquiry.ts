import { z } from "zod"

const digits = (s: string) => s.replace(/\D/g, "")

const inquiryFields = {
  name: z
    .string()
    .trim()
    .min(2, { message: "Indique pelo menos 2 carateres." })
    .max(100, { message: "Máximo 100 carateres." }),
  email: z
    .string()
    .trim()
    .email({ message: "E-mail inválido." })
    .max(254, { message: "E-mail demasiado longo." }),
  phone: z
    .string()
    .trim()
    .min(8, { message: "Indique o telefone." })
    .max(32, { message: "Telefone inválido." })
    .refine((p) => digits(p).length >= 8, {
      message: "O número deve ter pelo menos 8 dígitos.",
    }),
  company: z
    .string()
    .max(200, { message: "Máximo 200 carateres." })
    .default("")
    .transform((s) => s.trim() === "" ? undefined : s.trim()),
  message: z
    .string()
    .trim()
    .min(20, { message: "A mensagem deve ter pelo menos 20 carateres." })
    .max(8000, { message: "Máximo 8000 carateres." }),
} as const

const apiBody = z
  .object({
    ...inquiryFields,
    honey: z.string().optional(),
  })
  .strict()
  .refine(
    (d) => d.honey == null || d.honey.length === 0,
    { message: "Nok" }
  )

export type ContactInquiryPayload = {
  name: string
  email: string
  phone: string
  company?: string
  message: string
}

/** Formulário no browser (RHF) — `company` e `honey` em string, podem ser "". */
export const contactInquiryFormSchema = z.object({
  name: inquiryFields.name,
  email: inquiryFields.email,
  phone: inquiryFields.phone,
  company: z
    .string()
    .max(200, { message: "Máximo 200 carateres." }),
  message: inquiryFields.message,
  honey: z.string(),
})

export type ContactInquiryForm = z.infer<typeof contactInquiryFormSchema>

export function parseContactInquiryForSend(
  b: unknown
):
  | { success: true; data: ContactInquiryPayload }
  | { success: false; error: string } {
  const p = apiBody.safeParse(b)
  if (!p.success) {
    const m = p.error.issues[0]
    if (m?.code === "custom" && m.message === "Nok")
      return { success: false, error: "Pedido inválido." }
    return { success: false, error: m?.message ?? "Dados inválidos." }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { honey, ...d } = p.data
  return { success: true, data: d as ContactInquiryPayload }
}
