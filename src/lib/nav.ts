export const mainNav = [
  { id: "atuacao", href: "#atuacao", label: "Atuação" },
  { id: "diferenciais", href: "#diferenciais", label: "Diferenciais" },
  { id: "como-atuamos", href: "#como-atuamos", label: "Como atuamos" },
  { id: "contato", href: "#contato", label: "Contato" },
] as const

export type MainNavId = (typeof mainNav)[number]["id"]
