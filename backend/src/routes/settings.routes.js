const express = require("express");
const ctrl = require("../controllers/settings.controller");
const { requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", ctrl.getSettings);
router.put("/", requireAdmin, ctrl.updateSettings);

module.exports = router;
