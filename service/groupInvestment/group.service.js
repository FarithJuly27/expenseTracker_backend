const groupModel = require('../../models/groupInvestment/group.model')
const { userDetails } = require('../user.service')


module.exports.create = async (req, inputData) => {
    try {
        const result = new groupModel({
            ...inputData,
            createdBy: req.userId,
            createdAt: new Date()
        })
        await result.save()
        return result

    } catch (error) {
        console.error('Service File Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}

module.exports.findExist = async (groupName) => {
    const exist = await groupModel.exists({ groupName })
    return exist
}

module.exports.getAllData = async (mainFilter) => {
    try {
        const aggregateQuery = [
            { $match: mainFilter },
            { $sort: { createdAt: - 1 } },
            {
                $lookup: {
                    from: "group_members",
                    localField: "_id",
                    foreignField: "groupId",
                    as: "groupMemberDetails"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "groupMemberDetails.userId",
                    foreignField: "_id",
                    as: "groupUserDetails"
                }
            },
            {
                $addFields: {
                    monthlyTarget: { $first: "$groupMemberDetails.monthlyTarget" }
                }
            },
            {
                $addFields: {
                    groupDetails: {
                        $map: {
                            input: "$groupMemberDetails",
                            as: "member",
                            in: {
                                memberName: {
                                    $let: {
                                        vars: {
                                            matchedUser: {
                                                $first: {
                                                    $filter: {
                                                        input: "$groupUserDetails",
                                                        as: "user",
                                                        cond: { $eq: ["$$user._id", "$$member.userId"] }
                                                    }
                                                }
                                            }
                                        },
                                        in: "$$matchedUser.userName"
                                    }
                                },
                                role: "$$member.role",
                                monthlyTarget:
                                    "$$member.monthlyTarget",
                                createdAt: "$$member.createdAt",
                                createdBy: "$$member.createdBy"
                            }
                        }
                    }
                }
            },
            {
                $project: { groupMemberDetails: 0, groupUserDetails: 0 }
            }
        ]
        const queryResult = await groupModel.aggregate(aggregateQuery)
        return queryResult
    } catch (error) {
        console.error('Service File Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}

module.exports.update = async (req, _id, updateData) => {
    try {
        const afterUpdate = await groupModel.findByIdAndUpdate(_id, {
            ...updateData,
            updatedAt: new Date()
        })
        console.log(afterUpdate)
        return afterUpdate


    } catch (error) {
        console.error('Service File Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}

module.exports.delete = async (req, _id, status) => {
    try {
        const afterUpdate = await groupModel.findByIdAndUpdate(_id, {
            status,
            updatedAt: new Date()
        })
        console.log(afterUpdate)
        return afterUpdate


    } catch (error) {
        console.error('Service File Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}



module.exports.findExist = async (name) => {
    const exist = await transactionModel.exists({ name })
    return exist
}