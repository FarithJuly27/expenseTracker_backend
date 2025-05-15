const response = require('../../helper/response')
const groupService = require('../../service/groupInvestment/group.service')

module.exports.create = async (req, res) => {
    try {
        const { ...inputData } = req.body
        const result = await groupService.create(req, inputData)
        if (result._id) {
            response.successResponse(res, 'Group Created SuccessFully', result)
        } else return response.errorResponse(res, 'Group Creation Failed')
    } catch (error) {
        console.error('Controller Signup Error:', error);
        response.catchError(res, 'Catch Error In SignUp', error.message)
    }
}


module.exports.getAllData = async (req, res) => {
    try {
        const { status } = req.query
        const userId = req.userId
        const acceptedGroupIds = await groupService.getGroupMember(userId);

        const mainFilter = {
            ...({ status: status ? status : { $ne: 'Deleted' } }),
            _id: { $in: acceptedGroupIds },

        }
        const data = await groupService.getAllData(mainFilter)
        response.successResponse(res, 'Group Data List Fetch SuccesFully', data)
    } catch (error) {
        console.error('Controller GetAllData Error:', error);
        response.catchError(res, 'Catch Error In getAllData', error.message)
    }
}

module.exports.update = async (req, res) => {
    try {
        const { _id, ...updateData } = req.body
        const result = await groupService.update(req, _id, updateData)
        console.log(result)
        if (result) {
            response.successResponse(res, 'Group Updated SuccesFully', result)
        } else return response.errorResponse(res, 'Group Update Failed')
    } catch (error) {
        console.error('Controller update Error:', error);
        response.catchError(res, 'Catch Error In update', error.message)
    }
}

module.exports.delete = async (req, res) => {
    try {
        const { _id, status } = req.body
        const result = await groupService.delete(req, _id, status)
        if (result)
            console.log(result)
        if (result) {
            response.successResponse(res, 'Group Updated SuccesFully', result)
        } else return response.errorResponse(res, 'Group Update Failed')
    } catch (error) {
        console.error('Controller update Error:', error);
        response.catchError(res, 'Catch Error In update', error.message)
    }
}