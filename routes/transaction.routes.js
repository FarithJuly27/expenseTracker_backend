const express = require('express')
const router = express.Router()
const controller = require('../controller/transaction.controller');
const validate = require('../validations/transaction.valid')
const auth = require('../middleware/auth')

router.post('/create', auth.checkAuth, validate.create, controller.create)
router.get('/get-all-data', auth.checkAuth, validate.getAllData, controller.getAllData)
router.put('/update', auth.checkAuth, validate.update, controller.update)
router.get('/transaction-history', validate.transactionHistory, auth.checkAuth, controller.transactionHistory)
router.get('/financial-health', auth.checkAuth, controller.financialHealth)
router.get('/category-with-filter', auth.checkAuth, controller.getCategoriesDateFilterWise)
router.get('/top-categories', auth.checkAuth, validate.topCategories, controller.topCategories)
router.delete('/reset', auth.checkAuth, controller.reset)
router.delete('/delete', auth.checkAuth, controller.delete)
router.get('/goals_graph', auth.checkAuth, controller.setBudgetOfExpenseGraph)

module.exports = router