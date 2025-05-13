const groupModel = require('../../models/groupInvestment/group.model');
const groupMemberModel = require('../../models/groupInvestment/groupMember.model');

module.exports.create = async (req, inputData) => {
    try {
        const userId = req.userId;

        const newGroup = new groupModel({
            ...inputData,
            createdBy: userId,
            createdAt: new Date()
        });
        await newGroup.save();

        const adminEntry = new groupMemberModel({
            groupId: newGroup._id,
            userId: userId,
            role: 'Admin',
            monthlyTarget: inputData.monthlyTarget || 0,
            inviteStatus: 'Accepted',
            status: 'Active',
            createdBy: userId,
            createdAt: new Date()
        });
        await adminEntry.save();

        return newGroup;
    } catch (error) {
        console.error('Service File Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
};


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
                    acceptMembers: {
                        $filter: {
                            input: "$groupMemberDetails",
                            as: "member",
                            cond: { $eq: ["$$member.inviteStatus", "Accepted"] }
                        }
                    }
                }
            },
            {
                $addFields: {
                    groupBalance: { $sum: "$acceptMembers.monthlyTarget" }
                }
            },
            {
                $addFields: {
                    totalMembers: { $size: "$acceptMembers" }
                }
            },
            {
                $addFields: {
                    groupDetails: {
                        $map: {
                            input: "$acceptMembers",
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
                                                        cond: { $ne: ["$$user._id", "$$member.userId"] }
                                                    }
                                                }
                                            }
                                        },
                                        in: "$$matchedUser.userName"
                                    }
                                },
                                role: "$$member.role",
                                inviteStatus: "$$member.inviteStatus",
                                monthlyTarget: "$$member.monthlyTarget",
                                createdAt: "$$member.createdAt",
                                createdBy: "$$member.createdBy"
                            }
                        }
                    }
                }
            },
            {
                $project: { groupMemberDetails: 0, groupUserDetails: 0, acceptMembers: 0 }
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