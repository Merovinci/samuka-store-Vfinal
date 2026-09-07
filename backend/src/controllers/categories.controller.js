// -----------------------------------------------------------------------------
// src/controllers/categories.controller.js
// -----------------------------------------------------------------------------

const { getPool, sql } = require("../config/db");
const { asyncHandler } = require("../utils/asyncHandler");

const serialize = (row) => ({
  id: row.id,
  label: row.label,
  image: row.image,
});

const list = asyncHandler(async (req, res) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .query("SELECT * FROM categories ORDER BY sort_order, label");
  res.json(result.recordset.map(serialize));
});

const create = asyncHandler(async (req, res) => {
  const { id, label, image, sortOrder } = req.body || {};
  if (!id || !label) {
    const err = new Error("Campos obrigatórios: id, label.");
    err.status = 400;
    throw err;
  }

  const pool = await getPool();
  const result = await pool
    .request()
    .input("id", sql.NVarChar, id)
    .input("label", sql.NVarChar, label)
    .input("image", sql.NVarChar, image || null)
    .input("sort_order", sql.Int, sortOrder || 0)
    .query(`
      INSERT INTO categories (id, label, image, sort_order)
      OUTPUT INSERTED.*
      VALUES (@id, @label, @image, @sort_order)
    `);

  res.status(201).json(serialize(result.recordset[0]));
});

const update = asyncHandler(async (req, res) => {
  const { label, image, sortOrder } = req.body || {};
  if (!label) {
    const err = new Error("Campo obrigatório: label.");
    err.status = 400;
    throw err;
  }

  const pool = await getPool();
  const result = await pool
    .request()
    .input("id", sql.NVarChar, req.params.id)
    .input("label", sql.NVarChar, label)
    .input("image", sql.NVarChar, image || null)
    .input("sort_order", sql.Int, sortOrder || 0)
    .query(`
      UPDATE categories SET label=@label, image=@image, sort_order=@sort_order
      OUTPUT INSERTED.*
      WHERE id=@id
    `);

  const row = result.recordset[0];
  if (!row) {
    const err = new Error("Categoria não encontrada.");
    err.status = 404;
    throw err;
  }
  res.json(serialize(row));
});

const remove = asyncHandler(async (req, res) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("id", sql.NVarChar, req.params.id)
    .query("DELETE FROM categories OUTPUT DELETED.id WHERE id=@id");

  if (result.recordset.length === 0) {
    const err = new Error("Categoria não encontrada.");
    err.status = 404;
    throw err;
  }
  res.status(204).send();
});

module.exports = { list, create, update, remove };
