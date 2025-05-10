const { getMonthNumber } = require('../helper/commonFunctions')
const budgetGoalModel = require('../models/budgetGoals.model')
const userModel = require('../models/user.model')

module.exports.setBudgetAmount = async (inputData, userId) => {
    try {
        const user = await userModel.findOne({ _id: userId }).select('emailId')
        const monthOfNumber = getMonthNumber(inputData.month)
        const setBudget = await budgetGoalModel({
            ...inputData,
            monthOfNumber,
            userId,
            emailId: user?.emailId,
            createdBy: userId,
            createdAt: new Date()
        })
        await setBudget.save()
        return setBudget
    } catch (error) {
        console.error('Signup Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}

module.exports.getBudget = async (mainFilter) => {
    try {
        const aggregateQuery = [
            { $sort: { createdAt: -1 } },
            {
                $project: {
                    emailId: 1,
                    month: 1,
                    monthOfNumber: 1,
                    year: 1,
                    budgetAmount: 1
                }
            },
            {
                $addFields: {
                    totalDaysInMonth: {
                        $switch: {
                            branches: [
                                { case: { $in: ["$month", ["January", "March", "May", "July", "August", "October", "December"]] }, then: 31 },
                                {
                                    case: { $eq: ["$month", "February"] },
                                    then: {
                                        $cond: [
                                            {
                                                $or: [
                                                    { $eq: [{ $mod: ["$year", 400] }, 0] },
                                                    {
                                                        $and: [
                                                            { $eq: [{ $mod: ["$year", 4] }, 0] },
                                                            { $ne: [{ $mod: ["$year", 100] }, 0] }
                                                        ]
                                                    }
                                                ]
                                            },
                                            29,
                                            28
                                        ]
                                    }
                                }
                            ],
                            default: 30
                        }
                    }
                }
            },
            {
                $addFields: {
                    budgetPerDay: {
                        $round: [
                            {
                                $divide: [
                                    "$budgetAmount",
                                    "$totalDaysInMonth"
                                ]
                            },
                            0
                        ]
                    }
                }
            }
        ]
        const queryResult = await budgetGoalModel.aggregate(aggregateQuery)
        return queryResult
    } catch (error) {
        console.error('Signup Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}