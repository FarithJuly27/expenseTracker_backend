const mongoose = require('mongoose')
const { Types } = mongoose
const { ObjectId } = Types

const budgetGoalsSchema = new mongoose.Schema({
    budgetAmount: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    monthOfNumber: {
        type: Number,
        required: true
    },
    createdBy: {
        type: ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date
    }
},
    {
        timestamps: false,
        versionKey: false
    }
)
    .index({ userName: 1 })
    .index({ emailId: 1 })


module.exports = mongoose.model('budget_goals', budgetGoalsSchema)