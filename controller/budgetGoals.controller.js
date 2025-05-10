const response = require('../helper/response')
const budgetGoalService = require('../service/budgetGoals.service')

module.exports.setBudgetAmount = async (req, res) => {
    try {
        const { ...inputData } = req.body
        const userId = req.userId
        const budgetAmount = await budgetGoalService.setBudgetAmount(inputData, userId)
        if (budgetAmount?._id) response.successResponse(res, 'Budget Amount added')
        else return response.errorResponse(res, 'Budget Goals creations Failed')
    } catch (error) {
        console.error('Controller Signup Error:', error);
        response.catchError(res, 'Catch Error In SignUp', error.message)
    }
}

module.exports.getBudget = async (req, res) => {
    try {
        const userId = req.userId
        const mainFilter = {
            ...(userId ? { userId } : {})
        }
        const getData = await budgetGoalService.getBudget(mainFilter)
        if (getData) response.successResponse(res, 'Data Fetch SuccessFully', getData)
        else return response.errorResponse(res, 'Fetch Failed')
    } catch (error) {
        console.error('Controller Signup Error:', error);
        response.catchError(res, 'Catch Error In SignUp', error.message)
    }
}