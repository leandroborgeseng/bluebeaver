# Deploy no Coolify (Docker Compose)

Este repositório inclui `Dockerfile` (Next.js **standalone**) e `docker-compose.yaml` prontos para o Coolify.

## Pré-requisitos

- Servidor com [Coolify](https://coolify.io/) instalado
- Repositório Git: `https://github.com/leandroborgeseng/bluebeaver`
- DNS apontando para o servidor (se usar domínio próprio)

## Criar o recurso

1. **Project** → **Environment** → **+ Add Resource**
2. **Public Repository** (ou GitHub App) → URL do repositório, branch `main`
3. **Build Pack**: **Docker Compose**
4. **Docker Compose location**: `docker-compose.yaml` (raiz do repo; o Coolify usa `.yaml` por omissão)
5. **Base directory**: `/` (vazio)

## Rede e domínio

1. No serviço **`web`**, abra **General**
2. **Ports Exposes** (porta interna): `3000`
3. **Domains / FQDN**: ex. `https://www.seudominio.com`
4. Não adicione `ports: "3000:3000"` no compose — o Coolify gere o proxy (Traefik/Caddy) e o HTTPS

## Variáveis de ambiente

Defina no Coolify (**Environment Variables**). Ver [`.env.example`](./.env.example).

| Variável | Quando | Descrição |
|----------|--------|-----------|
| `NEXT_PUBLIC_CONTACT_EMAIL` | Build | E-mail visível na página |
| `NEXT_PUBLIC_CONTACT_PHONES` | Build | Telefones (opcional; senão usa defaults em código) |
| `NEXT_PUBLIC_CONTACT_ADDRESSES_JSON` | Build | Moradas em JSON (opcional) |
| `NEXT_PUBLIC_WHATSAPP_E164` | Build | WhatsApp só dígitos (opcional) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Runtime | SMTP do formulário |
| `EMAIL_FROM`, `EMAIL_TO` | Runtime | Remetente e destinatário do e-mail |

Variáveis `NEXT_PUBLIC_*` entram na imagem no **build**. Depois de alterá-las, faça **Redeploy** (rebuild).

SMTP e `EMAIL_*` são lidas em **runtime** — basta reiniciar/redeploy sem rebuild, salvo se o Coolify rebuildar sempre.

## Deploy

1. **Deploy** no painel (ou push na branch ligada ao recurso)
2. Aguarde build (`npm ci` + `npm run build` dentro do Docker)
3. Confirme health check verde e abra o domínio

## Teste local (opcional)

```bash
docker compose up --build
```

Abra `http://localhost:3000` — localmente pode precisar de `ports: ["3000:3000"]` temporário no compose; **não** commite isso para o Coolify.

## Resolução de problemas

- **502 / Bad Gateway**: porta exposta no Coolify deve ser `3000`; logs do container em **Logs**
- **Formulário sem e-mail**: confirme `SMTP_*` e `EMAIL_FROM` / `EMAIL_TO`
- **Contacto errado na UI**: variáveis `NEXT_PUBLIC_*` exigem novo build após alteração
