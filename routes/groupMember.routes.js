const express = require('express')
const router = express.Router()
const controller = require('../controller/groupInvestment/groupMember.controller');
const validate = require('../validations/groupInvestment/groupMember.validation')
const auth = require('../middleware/auth')

router.post('/create', auth.checkAuth, validate.create, controller.create)
router.get('/get-all-data', auth.checkAuth, validate.getAllData, controller.getAllData)
router.put('/update', auth.checkAuth, validate.update, controller.update)

module.exports = router