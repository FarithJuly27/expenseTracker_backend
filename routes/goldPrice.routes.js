const express = require('express');
const router = express.Router();
const { getTodayGoldPriceINR } = require('../controller/goldPrice.controller');

router.get('/today-inr', getTodayGoldPriceINR);

module.exports = router;
