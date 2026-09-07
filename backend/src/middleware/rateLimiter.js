// -----------------------------------------------------------------------------
// src/middleware/rateLimiter.js
// Limita quantas requisições um mesmo IP pode fazer em uma janela de tempo.
//
// IMPORTANTE (sendo direto sobre o que isso cobre e o que não cobre):
// isso ajuda contra abuso de API, scraping agressivo e força-bruta de senha
// — mas NÃO é proteção contra DDoS volumétrico de verdade (milhares de IPs
// diferentes ao mesmo tempo). Isso é resolvido na camada de
// infraestrutura/rede, não na aplicação. A Vercel já tem alguma mitigação
// de DDoS na borda por padrão; se quiser uma camada extra, colocar o
// domínio atrás da Cloudflare (modo proxy) é a forma padrão do mercado.
// -----------------------------------------------------------------------------

const rateLimit = require("express-rate-limit");

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Muitas requisições. Tente novamente em instantes." },
});

// Bem mais rígido no login — dificulta tentativa de adivinhar a senha.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Muitas tentativas de login. Tente novamente em instantes." },
});

module.exports = { generalLimiter, loginLimiter };
