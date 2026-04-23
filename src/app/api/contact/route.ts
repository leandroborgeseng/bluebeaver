import { NextResponse, type NextRequest } from "next/server"

import { isSmtpReady, sendContactInquiry } from "@/lib/mail/send-contact-inquiry"
import { parseContactInquiryForSend } from "@/lib/validations/contact-inquiry"

export async function POST(request: NextRequest) {
  if (!isSmtpReady()) {
    return NextResponse.json(
      { error: "E-mail ainda não configurado no servidor (SMTP)." },
      { status: 503 }
    )
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 })
  }
  const parsed = parseContactInquiryForSend(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }
  const sent = await sendContactInquiry(parsed.data)
  if (!sent.ok) {
    return NextResponse.json({ error: sent.error }, { status: 500 })
  }
  return NextResponse.json({ ok: true as const })
}
