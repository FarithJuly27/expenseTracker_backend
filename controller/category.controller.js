const response = require('../helper/response')
const categoryService = require('../service/category.service')

module.exports.create = async (req, res) => {
    try {
        const { ...inputData } = req.body
        const exist = await categoryService.findExist(inputData.name)
        if (!exist) {
            const result = await categoryService.create(req, inputData)
            if (result._id) {
                response.successResponse(res, 'Category Created SuccessFully', result)
            } else return response.errorResponse(res, 'Category Creation Failed')
        } else
            return response.alreadyExist(res, 'Already Exist Category')
    } catch (error) {
        console.error('Controller Signup Error:', error);
        response.catchError(res, 'Catch Error In SignUp', error.message)
    }
}

module.exports.getAllData = async (req, res) => {
    try {
        const { status } = req.query
        // const mainFilter = {
        //     ...({ status: status ? status : { $ne: 'Deleted' } })
        // }
        const data = await categoryService.getAllData(req)
        response.successResponse(res, 'Category Data List Fetch SuccesFully', data)
    } catch (error) {
        console.error('Controller GetAllData Error:', error);
        response.catchError(res, 'Catch Error In getAllData', error.message)
    }
}

module.exports.update = async (req, res) => {
    try {
        const { _id, ...updateData } = req.body
        const result = await categoryService.update(req, _id, updateData)
        console.log(result)
        if (result) {
            response.successResponse(res, 'Category Updated SuccesFully', result)
        } else return response.errorResponse(res, 'Category Update Failed')
    } catch (error) {
        console.error('Controller update Error:', error);
        response.catchError(res, 'Catch Error In update', error.message)
    }
}

module.exports.delete = async (req, res) => {
    try {
        const { _id, status } = req.body
        const result = await categoryService.delete(req, _id, status)
        if (result)
            console.log(result)
        if (result) {
            response.successResponse(res, 'Category Updated SuccesFully', result)
        } else return response.errorResponse(res, 'Category Update Failed')
    } catch (error) {
        console.error('Controller update Error:', error);
        response.catchError(res, 'Catch Error In update', error.message)
    }
}