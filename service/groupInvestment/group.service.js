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
                    from: "users",
                    localField: "members",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $addFields: {
                    members: {
                        $map: {
                            input: {
                                $filter: {
                                    input: "$userDetails",
                                    as: "user",
                                    cond: { $in: ["$$user._id", "$members"] }
                                }
                            },
                            as: "member",
                            in: {
                                _id: "$$member._id",
                                memberName: "$$member.userName"
                            }
                        }
                    }
                }
            },
            {
                $project: { userDetails: 0 }
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