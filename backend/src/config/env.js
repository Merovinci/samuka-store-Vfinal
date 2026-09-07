// -----------------------------------------------------------------------------
// src/config/env.js
// Carrega e valida as variáveis de ambiente. Preferimos falhar imediatamente
// na inicialização (com uma mensagem clara) a rodar em produção com uma
// configuração incompleta e se comportar de forma imprevisível.
// -----------------------------------------------------------------------------

require("dotenv").config();

const REQUIRED = ["DB_SERVER", "DB_NAME", "DB_USER", "DB_PASSWORD", "JWT_SECRET"];

for (const key of REQUIRED) {
  if (!process.env[key]) {
    throw new Error(
      `Variável de ambiente obrigatória ausente: ${key}. Confira seu .env (veja .env.example).`
    );
  }
}

if (process.env.JWT_SECRET.length < 24) {
  throw new Error(
    "JWT_SECRET muito curto — use uma string aleatória de pelo menos 24 caracteres (ex: openssl rand -hex 32)."
  );
}

const env = {
  DB_SERVER: process.env.DB_SERVER,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : 1433,
  JWT_SECRET: process.env.JWT_SECRET,
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || "",
  NODE_ENV: process.env.NODE_ENV || "development",
};

if (env.NODE_ENV === "production" && !env.ALLOWED_ORIGIN) {
  throw new Error(
    "Defina ALLOWED_ORIGIN em produção — não deixe a API aceitando requisições de qualquer origem."
  );
}

module.exports = { env };
