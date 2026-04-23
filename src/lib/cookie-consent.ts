const STORAGE_KEY = "bb-cookie-preferences" as const

export type CookieConsentValue = "all" | "essentials"

export function getStoredCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === "all" || raw === "essentials") return raw
    return null
  } catch {
    return null
  }
}

export function setStoredCookieConsent(v: CookieConsentValue): void {
  try {
    localStorage.setItem(STORAGE_KEY, v)
  } catch {
    /* em modo privado, ignorar */
  }
}

/**
 * Pode chamar a partir de futura integração (GTM, Analytics) só se getStoredCookieConsent() === "all"
 */
/** Chamar só no cliente (p.ex. efeito ou evento) antes de carregar GTM, analytics, etc. */
export function canUseOptionalCookies(): boolean {
  if (typeof window === "undefined") return false
  return getStoredCookieConsent() === "all"
}

export { STORAGE_KEY as COOKIE_PREFERENCES_KEY }
