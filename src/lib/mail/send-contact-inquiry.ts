import nodemailer from "nodemailer"

import type { ContactInquiryPayload } from "@/lib/validations/contact-inquiry"

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

/**
 * Cria o transporte SMTP. Variáveis: SMTP_HOST, SMTP_PORT (ex. 587),
 * SMTP_USER, SMTP_PASS, EMAIL_FROM, EMAIL_TO.
 */
function createTransport() {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const port = parseInt(process.env.SMTP_PORT || "587", 10) || 587
  if (!host || !user || !pass) {
    return null
  }
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

export function isSmtpReady(): boolean {
  return (
    createTransport() !== null &&
    Boolean((process.env.EMAIL_FROM || "").trim()) &&
    getEmailTo().length > 0
  )
}

export function getEmailTo(): string {
  return (process.env.EMAIL_TO || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "").trim()
}

export async function sendContactInquiry(
  p: ContactInquiryPayload
): Promise<{ ok: true } | { ok: false; error: string }> {
  const transport = createTransport()
  const to = getEmailTo()
  const from = (process.env.EMAIL_FROM || "").trim()
  if (!transport || !to || !from) {
    return { ok: false, error: "E-mail ainda não configurado no servidor." }
  }
  const subject = `[Site BlueBeaver] Contacto: ${p.name} • ${p.email}`
  const text = [
    `Novo contacto a partir do site bluebeaver (formulário).`,
    ``,
    `Nome: ${p.name}`,
    `E-mail: ${p.email}`,
    `Telefone: ${p.phone}`,
    p.company ? `Empresa / entidade: ${p.company}` : `Empresa / entidade: —`,
    ``,
    `Mensagem:`,
    p.message,
  ].join("\n")
  const html = `
  <h2>Contacto — BlueBeaver</h2>
  <table style="font-family:system-ui,sans-serif;font-size:15px">
    <tr><td><strong>Nome</strong></td><td>${esc(p.name)}</td></tr>
    <tr><td><strong>E-mail</strong></td><td><a href="mailto:${esc(p.email)}">${esc(p.email)}</a></td></tr>
    <tr><td><strong>Telefone</strong></td><td>${esc(p.phone)}</td></tr>
    <tr><td><strong>Empresa</strong></td><td>${p.company ? esc(p.company) : "—"}</td></tr>
  </table>
  <h3 style="font-family:system-ui,sans-serif">Mensagem</h3>
  <pre style="font-family:system-ui,sans-serif;white-space:pre-wrap">${esc(
    p.message
  )}</pre>
  `
  try {
    await transport.sendMail({ from, to, replyTo: p.email, subject, text, html })
    return { ok: true }
  } catch (e) {
    console.error("[sendContactInquiry]", e)
    return { ok: false, error: "Falha ao enviar. Tente de novo em instantes." }
  }
}
