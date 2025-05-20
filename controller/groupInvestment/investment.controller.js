const response = require('../../helper/response')
const investmentService = require('../../service/groupInvestment/investment.service')

module.exports.createMany = async (req, res) => {
    try {
        const inputData = req.body
        const result = await investmentService.createMany(req, inputData)
        if (Array.isArray(result) && result.length > 0) {
            response.successResponse(res, 'Group Transaction Created SuccessFully', result)
        } else return response.errorResponse(res, 'Group Member Creation Failed')
    } catch (error) {
        console.error('Controller Signup Error:', error);
        response.catchError(res, 'Catch Error In SignUp', error.message)
    }
}


module.exports.getAllData = async (req, res) => {
    try {
        const { status } = req.query
        const mainFilter = {
            ...({ status: status ? status : { $ne: 'Deleted' } })
        }
        const data = await investmentService.getAllData(mainFilter)
        response.successResponse(res, 'Group Member Data List Fetch SuccesFully', data)
    } catch (error) {
        console.error('Controller GetAllData Error:', error);
        response.catchError(res, 'Catch Error In getAllData', error.message)
    }
}

module.exports.update = async (req, res) => {
    try {
        const { _id, ...updateData } = req.body
        const result = await investmentService.update(req, _id, updateData)
        console.log(result)
        if (result) {
            response.successResponse(res, 'Group Member Updated SuccesFully', result)
        } else return response.errorResponse(res, 'Group Member Update Failed')
    } catch (error) {
        console.error('Controller update Error:', error);
        response.catchError(res, 'Catch Error In update', error.message)
    }
}

module.exports.delete = async (req, res) => {
    try {
        const { _id, status } = req.body
        const result = await investmentService.delete(req, _id, status)
        if (result)
            console.log(result)
        if (result) {
            response.successResponse(res, 'Group Member Updated SuccesFully', result)
        } else return response.errorResponse(res, 'Group Member Update Failed')
    } catch (error) {
        console.error('Controller update Error:', error);
        response.catchError(res, 'Catch Error In update', error.message)
    }
}