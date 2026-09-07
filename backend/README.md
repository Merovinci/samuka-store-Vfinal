# Samuka Store — Backend

API em Node.js + Express + SQL Server, para o admin gerenciar catálogo,
categorias, banners, marcas e a configuração de "quantos itens aparecem em
Destaques da Semana / Mais Vendidos".

## O que este backend cobre (e o que não cobre)

- ✅ SQL Injection: todas as consultas usam parâmetros vinculados (`.input()`
  da biblioteca `mssql`) — nunca concatenação de string em SQL.
- ✅ Senhas: nunca armazenadas em texto puro, sempre com hash bcrypt.
- ✅ Login: JWT com expiração de 8h, rate limit rígido (8 tentativas/15min).
- ✅ Abuso de API / força-bruta: rate limiting geral (200 req/15min por IP).
- ⚠️ DDoS volumétrico "de verdade" (milhares de IPs simultâneos): isso é
  resolvido na borda da rede, não na aplicação. A Vercel já tem alguma
  mitigação por padrão; se quiser uma camada extra, coloque o domínio
  atrás da Cloudflare (modo proxy, é grátis no plano free).
- ⚠️ "Esconder que é um backend": não existe essa proteção de verdade — quem
  quiser vai descobrir que existe uma API observando o tráfego do navegador,
  não importa o quanto o código pareça outra coisa. O que genuinamente
  ajuda (e este projeto já faz): não expor qual framework roda por trás
  (`x-powered-by` desativado), nunca devolver stack trace/erros internos
  pro cliente, e nunca revelar em mensagens de erro se um usuário existe ou
  não. Isso é proteção real; "disfarçar a sintaxe" não é.

## 1. Configurar o banco (SQL Server)

Recomendado: **Azure SQL Database** (SQL Server gerenciado na nuvem — fácil
de conectar a partir da Vercel, sem precisar expor um servidor próprio na
internet). Depois de criar o banco:

```bash
# Rode o conteúdo de db/schema.sql no seu banco (Azure Portal > Query Editor,
# ou Azure Data Studio / SSMS conectado no seu servidor)
```

## 2. Configurar as variáveis de ambiente

```bash
cp .env.example .env
```

Preencha `DB_SERVER`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` com os dados do seu
Azure SQL, e gere um `JWT_SECRET` forte:

```bash
openssl rand -hex 32
```

## 3. Instalar dependências

```bash
npm install
```

## 4. Criar o usuário admin

Defina `ADMIN_USERNAME` no `.env` (ex: `samuka_admin`) e rode:

```bash
npm run seed:admin
```

Se você **não** definir `ADMIN_PASSWORD` no `.env`, o script gera uma senha
aleatória forte na hora e mostra no terminal **uma única vez** — ninguém
(nem eu) escolhe ou vê essa senha por você. Copie e guarde num cofre de
senhas assim que aparecer.

## 5. Rodar localmente

```bash
npm run dev
```

API disponível em `http://localhost:4000/api/...`.

## 6. Testar o login

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"seu_usuario","password":"sua_senha"}'
```

Isso devolve um `token` — use-o no header `Authorization: Bearer <token>`
para criar/editar/apagar produtos, categorias, banners, marcas e alterar as
configurações.

## 7. Deploy na Vercel

1. Suba esta pasta `backend/` como um repositório separado no GitHub (ou
   como um segundo projeto dentro do mesmo repo, se preferir monorepo).
2. Na Vercel: **Add New → Project** → importe o repositório.
3. Em **Settings → Environment Variables**, adicione: `DB_SERVER`,
   `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_PORT`, `JWT_SECRET`,
   `ALLOWED_ORIGIN` (o domínio do seu site, ex:
   `https://samukastore.vercel.app`). **Nunca** coloque essas variáveis no
   código — só no painel da Vercel.
4. Deploy. A API fica em `https://seu-backend.vercel.app/api/...`.
5. Rode `npm run seed:admin` **localmente** (apontando pro mesmo banco de
   produção via `.env`) pra criar o admin — não é algo que roda automático
   no deploy.

## Endpoints

| Método | Rota | Autenticação |
|---|---|---|
| POST | `/api/auth/login` | pública (rate-limited) |
| GET | `/api/products` | pública |
| GET | `/api/products/:id` | pública |
| POST/PUT/DELETE | `/api/products` | admin |
| GET | `/api/categories` | pública |
| POST/PUT/DELETE | `/api/categories` | admin |
| GET | `/api/banners` | pública |
| POST/PUT/DELETE | `/api/banners` | admin |
| GET | `/api/brands` | pública |
| POST/PUT/DELETE | `/api/brands` | admin |
| GET | `/api/settings` | pública |
| PUT | `/api/settings` | admin |

## Importante: isso ainda não está ligado ao front-end

Por instrução sua, **não alterei nenhum arquivo do front-end**. Isso
significa que, por enquanto, o backend existe e funciona sozinho, mas
`src/data/products.js`, `banners.js`, `brands.js` etc. do front continuam
sendo os arquivos estáticos de sempre — o site não está lendo do banco
ainda.

Quando você quiser ligar os dois, o que precisa mudar (só nessa hora, não
agora) é: trocar os `import { products } from "./data/products"` etc. por
chamadas `fetch("https://seu-backend.vercel.app/api/products")`, e o campo
`featuredLimit`/`bestsellersLimit` do `/api/settings` passa a controlar o
`.slice(...)` que hoje está fixo no `App.jsx`. Me avisa quando chegar nessa
etapa que eu faço essa integração.
