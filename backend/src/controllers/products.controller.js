// -----------------------------------------------------------------------------
// src/controllers/products.controller.js
// -----------------------------------------------------------------------------

const { getPool, sql } = require("../config/db");
const { asyncHandler } = require("../utils/asyncHandler");

function serializeProduct(row) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category_id,
    subcategory: row.subcategory_id || undefined,
    price: Number(row.price),
    description: row.description,
    rating: Number(row.rating),
    reviews: row.reviews,
    badge: row.badge || undefined,
    featured: Boolean(row.featured),
    fallbackGradient: row.fallback_gradient,
    images: row.images ? JSON.parse(row.images) : {},
    colors: row.colors ? JSON.parse(row.colors) : [],
    sizes: row.sizes ? JSON.parse(row.sizes) : [],
  };
}

function validateProductInput(body) {
  const required = ["name", "slug", "category", "price"];
  for (const key of required) {
    if (body[key] === undefined || body[key] === null || body[key] === "") {
      const err = new Error(`Campo obrigatório ausente: ${key}`);
      err.status = 400;
      throw err;
    }
  }
  if (typeof body.price !== "number" || Number.isNaN(body.price) || body.price < 0) {
    const err = new Error("Preço inválido.");
    err.status = 400;
    throw err;
  }
}

// GET /api/products?category=camisetas&subcategory=bones&search=essential
const list = asyncHandler(async (req, res) => {
  const pool = await getPool();
  const request = pool.request();
  let query = "SELECT * FROM products WHERE 1=1";

  if (req.query.category) {
    query += " AND category_id = @category";
    request.input("category", sql.NVarChar, req.query.category);
  }
  if (req.query.subcategory) {
    query += " AND subcategory_id = @subcategory";
    request.input("subcategory", sql.NVarChar, req.query.subcategory);
  }
  if (req.query.search) {
    query += " AND LOWER(name) LIKE @search";
    request.input("search", sql.NVarChar, `%${String(req.query.search).toLowerCase()}%`);
  }
  if (req.query.featured === "true") {
    query += " AND featured = 1";
  }
  if (req.query.badge) {
    query += " AND badge = @badge";
    request.input("badge", sql.NVarChar, req.query.badge);
  }

  query += " ORDER BY id DESC";
  const result = await request.query(query);
  res.json(result.recordset.map(serializeProduct));
});

// GET /api/products/:id
const getOne = asyncHandler(async (req, res) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("id", sql.Int, Number(req.params.id))
    .query("SELECT * FROM products WHERE id = @id");

  const row = result.recordset[0];
  if (!row) {
    const err = new Error("Produto não encontrado.");
    err.status = 404;
    throw err;
  }
  res.json(serializeProduct(row));
});

// POST /api/products (admin)
const create = asyncHandler(async (req, res) => {
  const body = req.body || {};
  validateProductInput(body);

  const pool = await getPool();
  const result = await pool
    .request()
    .input("name", sql.NVarChar, body.name)
    .input("slug", sql.NVarChar, body.slug)
    .input("category_id", sql.NVarChar, body.category)
    .input("subcategory_id", sql.NVarChar, body.subcategory || null)
    .input("price", sql.Decimal(10, 2), body.price)
    .input("description", sql.NVarChar(sql.MAX), body.description || null)
    .input("rating", sql.Decimal(2, 1), body.rating || 0)
    .input("reviews", sql.Int, body.reviews || 0)
    .input("badge", sql.NVarChar, body.badge || null)
    .input("featured", sql.Bit, Boolean(body.featured))
    .input("fallback_gradient", sql.NVarChar, body.fallbackGradient || null)
    .input("images", sql.NVarChar(sql.MAX), JSON.stringify(body.images || {}))
    .input("colors", sql.NVarChar(sql.MAX), JSON.stringify(body.colors || []))
    .input("sizes", sql.NVarChar(sql.MAX), JSON.stringify(body.sizes || []))
    .query(`
      INSERT INTO products
        (name, slug, category_id, subcategory_id, price, description, rating, reviews, badge, featured, fallback_gradient, images, colors, sizes)
      OUTPUT INSERTED.*
      VALUES
        (@name, @slug, @category_id, @subcategory_id, @price, @description, @rating, @reviews, @badge, @featured, @fallback_gradient, @images, @colors, @sizes)
    `);

  res.status(201).json(serializeProduct(result.recordset[0]));
});

// PUT /api/products/:id (admin)
const update = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const body = req.body || {};
  validateProductInput({ ...body, price: body.price ?? 0 });

  const pool = await getPool();
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .input("name", sql.NVarChar, body.name)
    .input("slug", sql.NVarChar, body.slug)
    .input("category_id", sql.NVarChar, body.category)
    .input("subcategory_id", sql.NVarChar, body.subcategory || null)
    .input("price", sql.Decimal(10, 2), body.price)
    .input("description", sql.NVarChar(sql.MAX), body.description || null)
    .input("rating", sql.Decimal(2, 1), body.rating || 0)
    .input("reviews", sql.Int, body.reviews || 0)
    .input("badge", sql.NVarChar, body.badge || null)
    .input("featured", sql.Bit, Boolean(body.featured))
    .input("fallback_gradient", sql.NVarChar, body.fallbackGradient || null)
    .input("images", sql.NVarChar(sql.MAX), JSON.stringify(body.images || {}))
    .input("colors", sql.NVarChar(sql.MAX), JSON.stringify(body.colors || []))
    .input("sizes", sql.NVarChar(sql.MAX), JSON.stringify(body.sizes || []))
    .query(`
      UPDATE products SET
        name=@name, slug=@slug, category_id=@category_id, subcategory_id=@subcategory_id,
        price=@price, description=@description, rating=@rating, reviews=@reviews,
        badge=@badge, featured=@featured, fallback_gradient=@fallback_gradient,
        images=@images, colors=@colors, sizes=@sizes, updated_at=SYSUTCDATETIME()
      OUTPUT INSERTED.*
      WHERE id=@id
    `);

  const row = result.recordset[0];
  if (!row) {
    const err = new Error("Produto não encontrado.");
    err.status = 404;
    throw err;
  }
  res.json(serializeProduct(row));
});

// DELETE /api/products/:id (admin)
const remove = asyncHandler(async (req, res) => {
  const pool = await getPool();
  const result = await pool
    .request()
    .input("id", sql.Int, Number(req.params.id))
    .query("DELETE FROM products OUTPUT DELETED.id WHERE id=@id");

  if (result.recordset.length === 0) {
    const err = new Error("Produto não encontrado.");
    err.status = 404;
    throw err;
  }
  res.status(204).send();
});

module.exports = { list, getOne, create, update, remove };
