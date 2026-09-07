const express = require("express");
const { login } = require("../controllers/auth.controller");
const { loginLimiter } = require("../middleware/rateLimiter");

const router = express.Router();
router.post("/login", loginLimiter, login);

module.exports = router;
