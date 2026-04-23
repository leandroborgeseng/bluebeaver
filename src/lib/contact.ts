/**
 * Dados de contacto: env (Railway / .env.local) sobrepõe estes padrão em
 * `contact-data.ts`.
 */
import { defaultAddresses, defaultPhones } from "@/lib/contact-data"
import { contactEmail } from "@/lib/site"

import type { OfficeAddress } from "@/lib/contact-types"

export type { OfficeAddress } from "@/lib/contact-types"

const splitPhones = (raw: string | undefined) =>
  (raw || "")
    .split(/[|,;]/)
    .map((s) => s.trim())
    .filter(Boolean)

const parseAddresses = (raw: string | undefined): OfficeAddress[] => {
  if (!raw) return []
  try {
    const d = JSON.parse(raw) as unknown
    if (!Array.isArray(d)) return []
    return d
      .filter(
        (x: unknown) =>
          x && typeof x === "object" && "lines" in (x as OfficeAddress)
      )
      .map((x) => {
        const o = x as OfficeAddress
        return {
          label: o.label,
          lines: Array.isArray(o.lines) ? o.lines : [],
          mapUrl: o.mapUrl,
        }
      })
      .filter((o) => o.lines.length > 0)
  } catch {
    return []
  }
}

const envPhones = splitPhones(process.env.NEXT_PUBLIC_CONTACT_PHONES)
const envAddresses = parseAddresses(
  process.env.NEXT_PUBLIC_CONTACT_ADDRESSES_JSON
)

export const contact = {
  email: contactEmail,
  phones: envPhones.length > 0 ? envPhones : [...defaultPhones],
  addresses: envAddresses.length > 0 ? envAddresses : defaultAddresses,
  whatsappE164: (process.env.NEXT_PUBLIC_WHATSAPP_E164 || "").replace(
    /\D/g,
    ""
  ),
} as const

/** Dados além do e-mail (telemóvel, moradas, WhatsApp). */
export function hasExtendedContactData(): boolean {
  return (
    contact.phones.length > 0 ||
    contact.addresses.length > 0 ||
    (contact.whatsappE164?.length ?? 0) > 0
  )
}

export const whatsappHref = contact.whatsappE164
  ? `https://wa.me/${contact.whatsappE164}`
  : null
