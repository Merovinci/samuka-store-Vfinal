// -----------------------------------------------------------------------------
// src/controllers/settings.controller.js
// Configurações simples de "chave/valor" editáveis pelo admin — hoje usadas
// para controlar quantos produtos aparecem em "Destaques da Semana" e em
// "Mais Vendidos" (o que hoje está fixo no App.jsx do front).
// -----------------------------------------------------------------------------

const { getPool, sql } = require("../config/db");
const { asyncHandler } = require("../utils/asyncHandler");

// Lista branca de chaves editáveis — impede que o body da requisição
// injete uma chave arbitrária na tabela de configurações.
const ALLOWED_KEYS = ["featuredLimit", "bestsellersLimit"];

async function fetchSettings(pool) {
  const result = await pool
    .request()
    .query("SELECT setting_key, setting_value FROM site_settings");

  const map = {};
  for (const row of result.recordset) {
    map[row.setting_key] = row.setting_value;
  }
  return {
    featuredLimit: Number(map.featuredLimit ?? 4),
    bestsellersLimit: Number(map.bestsellersLimit ?? 4),
  };
}

const getSettings = asyncHandler(async (req, res) => {
  const pool = await getPool();
  res.json(await fetchSettings(pool));
});

const updateSettings = asyncHandler(async (req, res) => {
  const body = req.body || {};
  const pool = await getPool();

  for (const key of ALLOWED_KEYS) {
    if (body[key] === undefined) continue;

    const value = Number(body[key]);
    if (!Number.isInteger(value) || value < 1 || value > 20) {
      const err = new Error(
        `Valor inválido para ${key} — use um número inteiro entre 1 e 20.`
      );
      err.status = 400;
      throw err;
    }

    await pool
      .request()
      .input("key", sql.NVarChar, key)
      .input("value", sql.NVarChar, String(value))
      .query(`
        MERGE site_settings AS target
        USING (SELECT @key AS setting_key) AS src
        ON target.setting_key = src.setting_key
        WHEN MATCHED THEN UPDATE SET setting_value = @value
        WHEN NOT MATCHED THEN INSERT (setting_key, setting_value) VALUES (@key, @value);
      `);
  }

  res.json(await fetchSettings(pool));
});

module.exports = { getSettings, updateSettings };
