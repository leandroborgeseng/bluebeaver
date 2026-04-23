import type { OfficeAddress } from "@/lib/contact-types"

/** Valores padrão (repositório). Podem ser sobrepostas por variáveis NEXT_PUBLIC_*. */
export const defaultPhones: readonly string[] = ["(16) 3030-0445"]

export const defaultAddresses: OfficeAddress[] = [
  {
    label: "São Paulo",
    lines: [
      "Av. Paulista, 1636 - Conj. 1504",
      "Cerqueira César - São Paulo/SP",
      "CEP 01310-200",
    ],
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Av.%20Paulista%2C%201636%2C%20Conj%201504%2C%20Cerqueira%20C%C3%A9sar%2C%20S%C3%A3o%20Paulo%20-%20SP",
  },
  {
    label: "Franca",
    lines: [
      "Av. Ismael Alonso Y Alonso, 1219 - Conj. 1508",
      "Centro - Franca/SP",
      "CEP 14400-770",
    ],
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Av.%20Ismael%20Alonso%20Y%20Alonso%2C%201219%2C%20Franca%20-%20SP",
  },
]
