const investmentModel = require('../../models/groupInvestment/investments.model')


module.exports.create = async (req, inputData) => {
    try {
        const result = new investmentModel({
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

module.exports.getAllData = async (mainFilter) => {
    try {
        const aggregateQuery = [
            { $match: mainFilter },
            { $sort: { createdAt: - 1 } },
            {
                $lookup: {
                    from: "groups",
                    localField: "groupId",
                    foreignField: "_id",
                    as: "groupDetails"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $project: {
                    _id: 1,
                    groupId: 1,
                    groupName: { $first: "$groupDetails.groupName" },
                    userId: 1,
                    userName: { $first: "$userDetails.userName" },
                    investmentType: 1,
                    investmentDate: 1,
                    amount: 1,
                    createdBy: 1,
                    createdAt: 1
                }
            }
        ]
        const queryResult = await investmentModel.aggregate(aggregateQuery)
        return queryResult
    } catch (error) {
        console.error('Service File Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}

module.exports.update = async (req, _id, updateData) => {
    try {
        const afterUpdate = await investmentModel.findByIdAndUpdate(_id, {
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
        const afterUpdate = await investmentModel.findByIdAndUpdate(_id, {
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