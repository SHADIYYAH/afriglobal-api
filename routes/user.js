const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/user");

// Register user
router.post("/register", register);

// Login user
router.post("/login", login);

module.exports = router;
