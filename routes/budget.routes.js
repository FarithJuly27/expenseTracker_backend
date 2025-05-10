const express = require('express')
const router = express.Router()
const controller = require('../controller/budgetGoals.controller');
const validate = require('../validations/budgetGoals.valid')
const auth = require('../middleware/auth')

router.post('/set-budget-amount', auth.checkAuth, validate.addBudget, controller.setBudgetAmount)
router.get('/get-budget', auth.checkAuth, controller.getBudget)


module.exports = router