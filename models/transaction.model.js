const { required } = require('joi')
const mongoose = require('mongoose')
const { Types } = mongoose
const { ObjectId } = Types

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    categoryId: {
        type: ObjectId
    },
    type: {
        type: String,
        enum: ['Expense', 'Income'],
        required: true
    },
    transactionDate: {
        type: Date
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
        versionKey: false,
        timestamps: false
    }
)
    .index({ name: 1 })

module.exports = mongoose.model('transactions', expenseSchema)