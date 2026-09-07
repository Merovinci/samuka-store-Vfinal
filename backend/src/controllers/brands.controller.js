// -----------------------------------------------------------------------------
// src/controllers/brands.controller.js
// -----------------------------------------------------------------------------

const { getPool, sql } = require("../config/db");
const { asyncHandler } = require("../utils/asyncHandler");

const serialize = (row) => ({ id: row.id, name: row.name, slug: row.slug });

const list = asyncHandler(async (req, res) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .query("SELECT * FROM brands ORDER BY sort_order, name");
  res.json(result.recordset.map(serialize));
});

const create = asyncHandler(async (req, res) => {
  const { name, slug, sortOrder } = req.body || {};
  if (!name || !slug) {
    const err = new Error("Campos obrigatórios: name, slug.");
    err.status = 400;
    throw err;
  }

  const pool = await getPool();
  const result = await pool
    .request()
    .input("name", sql.NVarChar, name)
    .input("slug", sql.NVarChar, slug)
    .input("sort_order", sql.Int, sortOrder || 0)
    .query(`
      INSERT INTO brands (name, slug, sort_order)
      OUTPUT INSERTED.*
      VALUES (@name, @slug, @sort_order)
    `);

  res.status(201).json(serialize(result.recordset[0]));
});

const update = asyncHandler(async (req, res) => {
  const { name, slug, sortOrder } = req.body || {};
  if (!name || !slug) {
    const err = new Error("Campos obrigatórios: name, slug.");
    err.status = 400;
    throw err;
  }

  const pool = await getPool();
  const result = await pool
    .request()
    .input("id", sql.Int, Number(req.params.id))
    .input("name", sql.NVarChar, name)
    .input("slug", sql.NVarChar, slug)
    .input("sort_order", sql.Int, sortOrder || 0)
    .query(`
      UPDATE brands SET name=@name, slug=@slug, sort_order=@sort_order
      OUTPUT INSERTED.*
      WHERE id=@id
    `);

  const row = result.recordset[0];
  if (!row) {
    const err = new Error("Marca não encontrada.");
    err.status = 404;
    throw err;
  }
  res.json(serialize(row));
});

const remove = asyncHandler(async (req, res) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("id", sql.Int, Number(req.params.id))
    .query("DELETE FROM brands OUTPUT DELETED.id WHERE id=@id");

  if (result.recordset.length === 0) {
    const err = new Error("Marca não encontrada.");
    err.status = 404;
    throw err;
  }
  res.status(204).send();
});

module.exports = { list, create, update, remove };
