const express = require("express");
const router = express.Router();


const {resolveAccount} =require ("../controllers/bank")

router.get('/getAccount-name', resolveAccount)

module.exports=router