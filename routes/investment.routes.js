const express = require('express')
const router = express.Router()
const controller = require('../controller/groupInvestment/investment.controller');
const validate = require('../validations/groupInvestment/investment.validation')
const auth = require('../middleware/auth')

router.post('/create-many', auth.checkAuth, validate.createMany, controller.createMany)
router.get('/get-all-data', auth.checkAuth, validate.getAllData, controller.getAllData)
router.put('/update', auth.checkAuth, validate.update, controller.update)

module.exports = router