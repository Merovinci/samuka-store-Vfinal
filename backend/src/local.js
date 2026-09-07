// -----------------------------------------------------------------------------
// src/local.js
// Usado só em desenvolvimento local: `npm run dev`.
// Na Vercel, quem serve o app é api/index.js (funções serverless não usam
// app.listen — cada requisição invoca a função sob demanda).
// -----------------------------------------------------------------------------

const app = require("./server");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
