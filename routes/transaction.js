const express = require("express");
const router = express.Router();
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

const {
  dailyTransaction,
  startTransaction,
  completeTransaction,
  weeklyTransaction,
  monthlyTransaction,
} = require("../controllers/transaction");

router.get("/daily", dailyTransaction);
router.get("/weekly", weeklyTransaction);
router.get("/monthly", monthlyTransaction);

router.post("/start", startTransaction);
router.post("/complete", authentication, authorization, completeTransaction);

module.exports = router;
