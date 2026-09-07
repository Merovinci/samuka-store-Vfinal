// -----------------------------------------------------------------------------
// db/seed-admin.js
// Cria (ou atualiza a senha d)o usuário administrador.
//
// Rode com: npm run seed:admin
//
// Se ADMIN_PASSWORD não estiver definida no .env, uma senha aleatória forte
// é gerada NA HORA, no seu próprio computador, e mostrada UMA ÚNICA VEZ no
// terminal. Ela nunca fica em texto puro em lugar nenhum (nem neste script,
// nem no banco — só o hash bcrypt é salvo). Se perder, é só rodar de novo.
// -----------------------------------------------------------------------------

require("dotenv").config();
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { getPool, sql } = require("../src/config/db");

function generateStrongPassword(length = 20) {
  // Alfabeto sem caracteres ambíguos (0/O, 1/l/I), pra facilitar digitação
  // manual se precisar copiar de um lugar sem copiar/colar.
  const alphabet =
    "ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%^&*";
  const bytes = crypto.randomBytes(length);
  let password = "";
  for (let i = 0; i < length; i++) {
    password += alphabet[bytes[i] % alphabet.length];
  }
  return password;
}

async function main() {
  const username = process.env.ADMIN_USERNAME;
  if (!username) {
    throw new Error("Defina ADMIN_USERNAME no .env antes de rodar este script.");
  }

  const generatedNow = !process.env.ADMIN_PASSWORD;
  const plainPassword = process.env.ADMIN_PASSWORD || generateStrongPassword();
  const passwordHash = await bcrypt.hash(plainPassword, 12);

  const pool = await getPool();

  await pool
    .request()
    .input("username", sql.NVarChar, username)
    .input("password_hash", sql.NVarChar, passwordHash)
    .query(`
      MERGE admin_users AS target
      USING (SELECT @username AS username) AS src
      ON target.username = src.username
      WHEN MATCHED THEN UPDATE SET password_hash = @password_hash
      WHEN NOT MATCHED THEN INSERT (username, password_hash) VALUES (@username, @password_hash);
    `);

  console.log("\n=================================================");
  console.log(" Usuário admin criado/atualizado com sucesso.");
  console.log(" Usuário: " + username);
  if (generatedNow) {
    console.log(" Senha (gerada agora — só aparece esta vez):");
    console.log(" " + plainPassword);
  } else {
    console.log(" Senha: a que você definiu em ADMIN_PASSWORD no .env");
  }
  console.log("=================================================\n");
  console.log("Guarde essa senha em um cofre de senhas (Bitwarden, 1Password etc).");
  console.log("Nunca deixe ADMIN_PASSWORD commitada no .env do Git.");

  process.exit(0);
}

main().catch((err) => {
  console.error("Erro ao criar admin:", err.message);
  process.exit(1);
});
