const express = require("express");
const ctrl = require("../controllers/banners.controller");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", ctrl.list);
router.post("/", requireAdmin, ctrl.create);
router.put("/:id", requireAdmin, ctrl.update);
router.delete("/:id", requireAdmin, ctrl.remove);

module.exports = router;
