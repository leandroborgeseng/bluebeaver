# BlueBeaver

Landing page institucional (Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion).

## Comandos

```bash
npm install
npm run dev
```

```bash
npm run build
npm run start
```

Aplicação de produção alinhada a `process.env.PORT` (definida por plataformas como o Railway) via [CLI do `next start`](https://nextjs.org/docs/api-reference/cli/next#next-start).

## PWA e deploy

- Manifesto: `public/manifest.json` — atalho para instalação futura e `theme-color`.
- Evolução de service worker: comentado em `public/pwa/placeholder-service-worker.js`.
- **Deploy (Railway, domínio, DNS e HTTPS)**: [RAILWAY.md](./RAILWAY.md).

O logotipo oficial está em `public/brand/bluebeaver-logo.png`. Cores da interface seguem a marca: azul `#0066B2`, verde de destaque `#28B400` (além do laranja CTA do layout).

### Contacto (telefones, moradas, e-mail, WhatsApp)

- Telefone e moradas (São Paulo + Franca) vêm de [`src/lib/contact-data.ts`](src/lib/contact-data.ts) por omissão; o `.env` substitui se preenchido.
- Copie [`.env.example`](./.env.example) para `.env.local` e preencha `NEXT_PUBLIC_*` só se quiseres valores diferentes.
- No [Railway](./RAILWAY.md) (ou outro alojamento), adicione as mesmas variáveis no serviço (tab *Variables*).
- E-mail: `NEXT_PUBLIC_CONTACT_EMAIL` (o `mailto:` e o bloco na página usam este valor).

### Formulário de contacto (e-mail)

- Os botões **Falar com um especialista** abrem um diálogo; o envio é `POST` em `/api/contact` e o servidor envia e-mail com **Nodemailer** (SMTP).
- Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`, `EMAIL_TO` (ver [`.env.example`](./.env.example)). No Railway, define-as como variáveis do serviço (não `NEXT_PUBLIC_`).

### Consentimento de cookies (LGPD)

- Banner em `CookieConsentBanner` (layout): **Aceitar** (grava `all` no `localStorage`) ou **Apenas essenciais** (`essentials`).
- Chave: `bb-cookie-preferences`. Antes de carregar GTM, Matomo, etc., use `canUseOptionalCookies()` de `src/lib/cookie-consent.ts` (só no cliente).

### PWA e ícones

Os ícones em `public/icons/` podem ser regenerados a partir do logótipo (ex. `sharp`) se alterar a arte final.
