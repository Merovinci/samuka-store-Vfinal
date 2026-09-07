// -----------------------------------------------------------------------------
// src/controllers/banners.controller.js
// -----------------------------------------------------------------------------

const { getPool, sql } = require("../config/db");
const { asyncHandler } = require("../utils/asyncHandler");

const serialize = (row) => ({
  id: row.id,
  slug: row.slug,
  image: row.image,
  fallbackGradient: row.fallback_gradient,
  tag: row.tag,
  title: row.title,
  subtitle: row.subtitle,
  ctaLabel: row.cta_label,
  ctaCategory: row.cta_category,
});

const list = asyncHandler(async (req, res) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .query("SELECT * FROM banners ORDER BY sort_order, id");
  res.json(result.recordset.map(serialize));
});

function validateBannerInput(body) {
  if (!body.slug || !body.title) {
    const err = new Error("Campos obrigatórios: slug, title.");
    err.status = 400;
    throw err;
  }
}

const create = asyncHandler(async (req, res) => {
  const body = req.body || {};
  validateBannerInput(body);

  const pool = await getPool();
  const result = await pool
    .request()
    .input("slug", sql.NVarChar, body.slug)
    .input("image", sql.NVarChar, body.image || null)
    .input("fallback_gradient", sql.NVarChar, body.fallbackGradient || null)
    .input("tag", sql.NVarChar, body.tag || null)
    .input("title", sql.NVarChar, body.title)
    .input("subtitle", sql.NVarChar, body.subtitle || null)
    .input("cta_label", sql.NVarChar, body.ctaLabel || null)
    .input("cta_category", sql.NVarChar, body.ctaCategory || null)
    .input("sort_order", sql.Int, body.sortOrder || 0)
    .query(`
      INSERT INTO banners
        (slug, image, fallback_gradient, tag, title, subtitle, cta_label, cta_category, sort_order)
      OUTPUT INSERTED.*
      VALUES
        (@slug, @image, @fallback_gradient, @tag, @title, @subtitle, @cta_label, @cta_category, @sort_order)
    `);

  res.status(201).json(serialize(result.recordset[0]));
});

const update = asyncHandler(async (req, res) => {
  const body = req.body || {};
  validateBannerInput(body);

  const pool = await getPool();
  const result = await pool
    .request()
    .input("id", sql.Int, Number(req.params.id))
    .input("slug", sql.NVarChar, body.slug)
    .input("image", sql.NVarChar, body.image || null)
    .input("fallback_gradient", sql.NVarChar, body.fallbackGradient || null)
    .input("tag", sql.NVarChar, body.tag || null)
    .input("title", sql.NVarChar, body.title)
    .input("subtitle", sql.NVarChar, body.subtitle || null)
    .input("cta_label", sql.NVarChar, body.ctaLabel || null)
    .input("cta_category", sql.NVarChar, body.ctaCategory || null)
    .input("sort_order", sql.Int, body.sortOrder || 0)
    .query(`
      UPDATE banners SET
        slug=@slug, image=@image, fallback_gradient=@fallback_gradient, tag=@tag,
        title=@title, subtitle=@subtitle, cta_label=@cta_label,
        cta_category=@cta_category, sort_order=@sort_order
      OUTPUT INSERTED.*
      WHERE id=@id
    `);

  const row = result.recordset[0];
  if (!row) {
    const err = new Error("Banner não encontrado.");
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
    .query("DELETE FROM banners OUTPUT DELETED.id WHERE id=@id");

  if (result.recordset.length === 0) {
    const err = new Error("Banner não encontrado.");
    err.status = 404;
    throw err;
  }
  res.status(204).send();
});

module.exports = { list, create, update, remove };
