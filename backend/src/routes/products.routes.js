const express = require("express");
const ctrl = require("../controllers/products.controller");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

// Leitura é pública (é o catálogo da loja)
router.get("/", ctrl.list);
router.get("/:id", ctrl.getOne);

// Escrita exige login de admin
router.post("/", requireAdmin, ctrl.create);
router.put("/:id", requireAdmin, ctrl.update);
router.delete("/:id", requireAdmin, ctrl.remove);

module.exports = router;
