// -----------------------------------------------------------------------------
// src/utils/asyncHandler.js
// Envolve funções assíncronas de controller pra que qualquer erro (inclusive
// rejeição de Promise) caia automaticamente no errorHandler central, sem
// precisar repetir try/catch em cada rota.
// -----------------------------------------------------------------------------

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { asyncHandler };
