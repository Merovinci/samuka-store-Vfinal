// -----------------------------------------------------------------------------
// src/controllers/auth.controller.js
// -----------------------------------------------------------------------------

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getPool, sql } = require("../config/db");
const { env } = require("../config/env");
const { asyncHandler } = require("../utils/asyncHandler");

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    const err = new Error("Credenciais incompletas.");
    err.status = 400;
    throw err;
  }

  const pool = await getPool();
  const result = await pool
    .request()
    .input("username", sql.NVarChar, username) // consulta parametrizada — nunca concatenar
    .query("SELECT id, username, password_hash FROM admin_users WHERE username = @username");

  const admin = result.recordset[0];

  const invalidCredentials = () => {
    const err = new Error("Credenciais inválidas.");
    err.status = 401;
    throw err;
  };

  // Mesma mensagem tanto pra usuário inexistente quanto senha errada —
  // não revelar qual dos dois está errado (evita enumerar usuários).
  if (!admin) return invalidCredentials();

  const passwordMatches = await bcrypt.compare(password, admin.password_hash);
  if (!passwordMatches) return invalidCredentials();

  const token = jwt.sign(
    { sub: admin.id, username: admin.username },
    env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({ token, expiresIn: "8h" });
});

module.exports = { login };
