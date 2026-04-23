# Deploy no Railway (BlueBeaver)

Este projeto é **Next.js** (Node). O `next start` lê a variável de ambiente `PORT` automaticamente; o Railway injeta `PORT` em tempo de execução.

## Build local (igual à produção)

```bash
npm install
npm run build
npm run start
```

## Criar o projeto no Railway

1. Aceda a [https://railway.com](https://railway.com) e inicie sessão.
2. Crie um **novo projeto** (por exemplo, “New project” → “Empty project” ou “Deploy from GitHub”).
3. Ligue o repositório **GitHub** e escolha o branch que deseja publicar.
4. O Railway deteta **Next.js** (Nixpacks) e executa, em geral, `npm install` e `npm run build`, arrancando com `npm run start` (ou o comando de start definido no `package.json`).

### Variáveis de ambiente

- Não é obrigatório definir `PORT` — o Railway define-a.
- Pode deixar `NODE_ENV=production` implícito no build.

## Domínio personalizado e HTTPS

1. No serviço web do Railway, abra **Settings** → **Networking** → **Custom domain**.
2. **Adicionar domínio**: indique o domínio (ex.: `www.empresa.com` ou `empresa.com`).
3. O Railway apresenta instruções de DNS. Em geral:
   - **Subdomínio** (`www`): crie um registo **CNAME** no seu DNS apontando para o destino fornecido pelo Railway (o hostname deles).
   - **Apex (domínio raiz)**: o Railway costuma oferecer um **A record** (endereço IPv4) ou, em alternativa, o uso de CNAME no apex via o seu fornecedor de DNS, conforme a documentação atual.
4. Aguarde a **propagação** DNS (alguns minutos a algumas horas) e a **emissão automática de certificado** TLS/HTTPS (normalmente vía Let’s Encrypt).

Quando o domínio estiver validado, o tráfego passa a ser servido em **HTTPS** automaticamente.

## Evolução PWA (service worker)

A app inclui `public/pwa/placeholder-service-worker.js` (comentado) e um caminho claro para substituição por `sw.js` e registo a partir de um efeito no cliente ou por uma ferramenta de PWA, quando a estratégia de cache estiver definida.
