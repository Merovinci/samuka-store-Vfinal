// -----------------------------------------------------------------------------
// src/middleware/errorHandler.js
// Handler de erro central. Loga o erro completo só no servidor (console —
// em produção normalmente isso vai pro log da Vercel) e devolve pro
// cliente apenas uma mensagem genérica, nunca stack trace, nome de
// biblioteca, query SQL ou qualquer detalhe interno.
// -----------------------------------------------------------------------------

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.status || 500;
  const message =
    status === 500
      ? "Erro interno. Tente novamente mais tarde."
      : err.message || "Requisição inválida.";

  res.status(status).json({ error: message });
}

module.exports = { errorHandler };
