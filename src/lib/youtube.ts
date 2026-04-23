/** Accepts raw video id or a typical YouTube / youtu.be URL. */
export function toYoutubeId(input: string): string | null {
  const s = input.trim()
  if (!s) return null
  if (s.length === 11 && !s.includes("http")) {
    if (/^[\w-]{11}$/.test(s)) return s
  }
  try {
    const u = new URL(s, "https://youtube.com")
    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1) || null
    }
    if (u.searchParams.get("v")) {
      return u.searchParams.get("v")
    }
    const p = u.pathname
    if (p.includes("/embed/")) {
      return p.split("/embed/")[1]?.split("?")[0] || null
    }
  } catch {
    return null
  }
  return null
}
