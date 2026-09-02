// -----------------------------------------------------------------------------
// src/config/db.js
// Pool de conexão com o SQL Server usando a biblioteca oficial `mssql`.
//
// Por que `mssql` e não montar a query na mão:
// toda consulta neste projeto usa `.input(...)` (parâmetros vinculados),
// nunca concatenação de string. Isso é o que de fato impede SQL Injection —
// o valor do usuário nunca é interpretado como parte do comando SQL, só
// como dado. Ver qualquer controller em src/controllers/ pra exemplos.
// -----------------------------------------------------------------------------

const sql = require("mssql");
const { env } = require("./env");

const config = {
  server: env.DB_SERVER,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
  options: {
    encrypt: true, // obrigatório para Azure SQL / qualquer conexão exposta na internet
    trustServerCertificate: false,
  },
  pool: {
    max: 5,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let poolPromise = null;

// Reaproveita a mesma conexão entre chamadas (importante em serverless —
// evita abrir uma conexão nova a cada requisição). Se a conexão cair, a
// próxima chamada tenta reconectar em vez de ficar presa num erro antigo.
function getPool() {
  if (!poolPromise) {
    poolPromise = sql.connect(config).catch((err) => {
      poolPromise = null;
      throw err;
    });
  }
  return poolPromise;
}

module.exports = { sql, getPool };
