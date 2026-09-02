// -----------------------------------------------------------------------------
// src/server.js
// App Express principal. Não escuta porta aqui — quem faz isso é
// src/local.js (desenvolvimento) ou api/index.js (Vercel serverless).
// -----------------------------------------------------------------------------

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { env } = require("./config/env");
const { generalLimiter } = require("./middleware/rateLimiter");
const { errorHandler } = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const categoriesRoutes = require("./routes/categories.routes");
const bannersRoutes = require("./routes/banners.routes");
const brandsRoutes = require("./routes/brands.routes");
const settingsRoutes = require("./routes/settings.routes");

const app = express();

// Não anuncia qual framework roda por trás (não é "segurança de verdade",
// mas tira uma informação de graça de quem estiver sondando o servidor).
app.disable("x-powered-by");

app.use(helmet());
app.use(
  cors({
    origin: env.ALLOWED_ORIGIN ? env.ALLOWED_ORIGIN.split(",") : false,
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(generalLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/banners", bannersRoutes);
app.use("/api/brands", brandsRoutes);
app.use("/api/settings", settingsRoutes);

// Rota desconhecida: resposta genérica, sem listar quais rotas existem.
app.use((req, res) => {
  res.status(404).json({ error: "Não encontrado." });
});

app.use(errorHandler);

module.exports = app;
