// -----------------------------------------------------------------------------
// src/middleware/auth.js
// Protege rotas administrativas (criar/editar/apagar). Exige um token JWT
// válido no header Authorization: Bearer <token>, emitido em /api/auth/login.
// -----------------------------------------------------------------------------

const jwt = require("jsonwebtoken");
const { env } = require("../config/env");

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Não autenticado." });
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.admin = { id: payload.sub, username: payload.username };
    return next();
  } catch {
    // Mesma mensagem genérica pra token expirado, adulterado ou assinado
    // com outra chave — não dar pista de qual é o caso.
    return res.status(401).json({ error: "Sessão inválida ou expirada." });
  }
}

module.exports = { requireAdmin };
