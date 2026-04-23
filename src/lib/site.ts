/**
 * E-mail e links de contacto. O e-mail é lido de NEXT_PUBLIC_CONTACT_EMAIL
 * (ver .env.example). Em dev, usa .env.local.
 */
export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contato@bluebeaver.com"

export const contactMailto = `mailto:${encodeURIComponent(
  contactEmail
)}?subject=${encodeURIComponent("Contato | BlueBeaver")}`
