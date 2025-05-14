const response = require('../../helper/response')
const groupMemberService = require('../../service/groupInvestment/groupMember.service')
const mongoose = require('mongoose')
const { Types } = mongoose
const { ObjectId } = Types

module.exports.inviteMembers = async (req, res) => {
    try {
        const inputData = req.body;
        const adminCheck = await groupMemberService.adminCheck(req, inputData.groupId)
        if (!adminCheck) {
            return response.errorResponse(res, 'Only Admins can invite members.')
        }
        const result = await groupMemberService.inviteMembers(req, inputData);
        console.log(result)
        if (result.success) {
            response.successResponse(res, 'Group members invited successfully', {
                addedCount: result.addedCount
            });
        } else {
            response.errorResponse(res, 'Group member invitation failed');
        }
    } catch (error) {
        console.error('Controller Invite Error:', error);
        response.catchError(res, 'Catch Error In Invite', error.message);
    }
};

module.exports.respondToGroupInvite = async (req, res) => {
    try {
        const { groupId, inviteResponse } = req.body;
        const userId = req.userId;

        const member = await groupMemberService.MatchInviteMember(groupId, userId);

        if (!member) {
            return response.errorResponse(res, 'Invitation not found');
        }

        if (member.inviteStatus !== 'Pending') {
            return response.successResponse(res, `You have already responded: ${member.inviteStatus}`);
        }

        const result = await groupMemberService.respondToGroupInvite(groupId, userId, inviteResponse);

        if (result.modifiedCount > 0) {
            return response.successResponse(res, `You have successfully ${inviteResponse} the invite`);
        } else {
            return response.errorResponse(res, 'Failed to update invite response');
        }

    } catch (error) {
        console.error('Controller Invite Error:', error);
        response.catchError(res, 'Catch Error In Invite', error.message);
    }
};




module.exports.getAllData = async (req, res) => {
    try {
        const { status } = req.query
        const mainFilter = {
            ...({ status: status ? status : { $ne: 'Deleted' } }),
        }
        const data = await groupMemberService.getAllData(mainFilter)
        response.successResponse(res, 'Group Member Data List Fetch SuccesFully', data)
    } catch (error) {
        console.error('Controller GetAllData Error:', error);
        response.catchError(res, 'Catch Error In getAllData', error.message)
    }
}

module.exports.getNotification = async (req, res) => {
    try {
        const { status } = req.query
        const userId = req.userId
        const mainFilter = {
            ...({ status: status ? status : { $ne: 'Deleted' } }),
            ...(userId ? { userId: new ObjectId(userId) } : {}),

        }
        const data = await groupMemberService.getNotifications(mainFilter)
        response.successResponse(res, 'Group Member Data List Fetch SuccesFully', data)
    } catch (error) {
        console.error('Controller GetAllData Error:', error);
        response.catchError(res, 'Catch Error In getAllData', error.message)
    }
}

module.exports.update = async (req, res) => {
    try {
        const { _id, ...updateData } = req.body
        const result = await groupMemberService.update(req, _id, updateData)
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
        const result = await groupMemberService.delete(req, _id, status)
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