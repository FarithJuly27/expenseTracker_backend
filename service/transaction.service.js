const transactionModel = require('../models/transaction.model')
const categoryModel = require('../models/category.model')


module.exports.create = async (req, inputData) => {
    try {
        const expense = new transactionModel({
            ...inputData,
            createdBy: req.userId,
            createdAt: new Date()
        })
        await expense.save()
        return expense

    } catch (error) {
        console.error('Signup Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}

module.exports.findExist = async (name) => {
    const exist = await transactionModel.exists({ name })
    return exist
}

module.exports.getCategoryBasedSearch = async (transactionIds, searchFilter) => {
    try {
        const result = await categoryModel.distinct('_id', {
            ...(transactionIds?.length ? { _id: { $in: transactionIds } } : {}),
            categoryId: { $in: searchFilter }
        })
    } catch (error) {
        console.error('Error in getCategoryIdBySearch:', error);
        return [];
    }
}


module.exports.getCategoryIdsBySearch = async (searchFilter) => {
    try {
        const matchedCategories = await categoryModel.find(
            { name: { $regex: searchFilter, $options: "i" } },
            { _id: 1 }
        );
        return matchedCategories.map(cat => cat._id);
    } catch (error) {
        console.error('Error in getCategoryIdsBySearch:', error);
        return [];
    }
};

module.exports.getAllData = async (mainFilter) => {
    try {
        const aggregateQuery = [
            { $match: mainFilter },
            { $sort: { createdAt: - 1 } },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categories"
                }
            },
            {
                $addFields: {
                    categoryName: { $first: '$categories.name' },
                    categoryIcon: { $first: '$categories.icon' },
                    categoryColor: { $first: '$categories.color' }


                }
            },
            { $project: { categories: 0 } }
        ]
        const queryResult = await transactionModel.aggregate(aggregateQuery)
        return queryResult
    } catch (error) {
        console.error('Signup Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}

module.exports.balanceWithOutDateFilter = async (userId) => {
    const transaction = transactionModel.find({ createdBy: userId })
    return transaction
}

module.exports.history = async (mainFilter) => {
    try {
        const aggregateQuery = [
            { $match: mainFilter },
            {
                $group: {
                    _id: null,
                    myEarnings: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0]
                        }
                    },
                    myExpenses: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0]
                        }
                    }
                }
            },
            {
                $addFields: {
                    balance: { $subtract: ["$myEarnings", "$myExpenses"] }
                }
            },
            { $project: { _id: 0 } }
        ]
        const queryResult = await transactionModel.aggregate(aggregateQuery)
        return queryResult
    } catch (error) {
        console.error('Signup Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}

module.exports.update = async (req, _id, updateData) => {
    try {
        const afterUpdate = await transactionModel.findByIdAndUpdate(_id, {
            ...updateData,
            updatedAt: new Date()
        })
        return afterUpdate
    } catch (error) {
        console.error('Signup Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}

module.exports.financialHealth = async (mainFilter) => {
    try {
        const aggregateQuery = [
            { $match: mainFilter },
            {
                $group: {
                    _id: null,
                    totalIncome: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "Income"] }, "$amount", 0]
                        }
                    },
                    totalExpense: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0]
                        }
                    }
                }
            },
            {
                $addFields: {
                    savingsRate: {
                        $cond: [
                            { $eq: ["$totalIncome", 0] },
                            0,
                            {
                                $multiply: [
                                    {
                                        $divide: [
                                            { $subtract: ["$totalIncome", "$totalExpense"] },
                                            "$totalIncome"
                                        ]
                                    },
                                    100
                                ]
                            }
                        ]
                    }
                }
            },
            { $project: { _id: 0 } }
        ]
        const queryResult = transactionModel.aggregate(aggregateQuery)
        return queryResult
    } catch (error) {
        console.error('Signup Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}

module.exports.categoriesWithDateFilter = async (mainFilter) => {
    try {
        const aggregateQuery = [
            { $match: mainFilter },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categories"
                }
            },
            {
                $addFields: {
                    categoryName: { $first: '$categories.name' }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    amount: 1,
                    type: 1,
                    categoryId: 1,
                    categoryName: 1,
                    createdAt: 1
                }
            }
        ]
        const queryResult = transactionModel.aggregate(aggregateQuery)
        return queryResult
    } catch (error) {
        console.error('Signup Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}

module.exports.topCategories = async (mainFilter) => {
    try {
        console.log(mainFilter)
        const aggregateQuery = [
            { $match: mainFilter },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categories"
                }
            },
            {
                $group: {
                    _id: "$categoryId",
                    categoryDetails: { $first: "$categories" },
                    amount: {
                        $sum: "$amount"
                    }
                }
            },
            {
                $setWindowFields: {
                    output: {
                        overAllAmount: {
                            $sum: "$amount",
                            window: {
                                documents: ["unbounded", "unbounded"]
                            }
                        }
                    }
                }
            },
            {
                $addFields: {
                    spendings: {
                        $cond: [
                            { $eq: ["$amount", 0] },
                            0,
                            {
                                $multiply: [
                                    {
                                        $divide: ["$amount", "$overAllAmount"]
                                    },
                                    100
                                ]
                            }
                        ]
                    }
                }
            },
            {
                $addFields: {
                    categoryName: { $first: '$categoryDetails.name' },
                    categoryIcon: { $first: "$categoryDetails.icon" },
                    categoryColor: { $first: "$categoryDetails.color" }
                }
            },
            { $sort: { amount: -1 } },
            { $project: { overAllAmount: 0, categoryDetails: 0 } }
        ]
        const queryResult = transactionModel.aggregate(aggregateQuery)
        return queryResult
    } catch (error) {
        console.error('Signup Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}

module.exports.reset = async (userId) => {
    try {
        const transaction = await transactionModel.deleteMany({ createdBy: userId })
        return transaction
    } catch (error) {
        console.error('Signup Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}

module.exports.delete = async (_id) => {
    try {
        const transaction = await transactionModel.findByIdAndDelete(_id)
        return transaction
    } catch (error) {
        console.error('Signup Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}