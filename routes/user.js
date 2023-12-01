const express = require("express");
const router = express.Router();
const { register, login, verifyUserAccount } = require("../controllers/user");

// Register user
router.post("/register", register);

router.patch('/verify/:otp/:email', verifyUserAccount)
// Login user
router.post("/login", login);

module.exports = router;
