// -----------------------------------------------------------------------------
// api/index.js
// Ponto de entrada usado pela Vercel: cada arquivo dentro de /api vira uma
// função serverless. Aqui só encaminhamos para o app Express já configurado
// em src/server.js — toda a lógica de rotas/segurança vive lá.
// -----------------------------------------------------------------------------

const app = require("../src/server");

module.exports = app;
