const categoryModel = require('../models/category.model')


module.exports.create = async (req, inputData) => {
    try {
        const category = new categoryModel({
            ...inputData,
            createdBy: req.userId,
            createdAt: new Date()
        })
        await category.save()
        return category

    } catch (error) {
        console.error('Signup Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}

module.exports.findExist = async (name) => {
    const exist = await categoryModel.exists({ name })
    return exist
}

module.exports.getAllData = async () => {
    try {
        const aggregateQuery = [
            { $sort: { createdAt: - 1 } }
        ]
        const queryResult = await categoryModel.aggregate(aggregateQuery)
        return queryResult
    } catch (error) {
        console.error('Signup Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}

module.exports.update = async (req, _id, updateData) => {
    try {
        const afterUpdate = await categoryModel.findByIdAndUpdate(_id, {
            ...updateData,
            updatedAt: new Date()
        })
        console.log(afterUpdate)
        return afterUpdate


    } catch (error) {
        console.error('Signup Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}

module.exports.delete = async (req, _id, status) => {
    try {
        const afterUpdate = await categoryModel.findByIdAndUpdate(_id, {
            status,
            updatedAt: new Date()
        })
        console.log(afterUpdate)
        return afterUpdate


    } catch (error) {
        console.error('Signup Error:', error);
        return { success: false, message: 'Internal server error', error };
    }
}