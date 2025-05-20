const { required } = require('joi')
const mongoose = require('mongoose')
const { Types } = mongoose
const { ObjectId } = Types

const investmentSchema = new mongoose.Schema({
    groupId: {
        type: ObjectId,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    // expectedDate: {
    //     type: Date,
    //     required: true
    // },
    investmentDate: {
        type: Date,
        required: true
    },
    notes: {
        type: String
    },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Unpaid'],
        default: 'Unpaid'
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Delete'],
        default: 'Active'
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


module.exports = mongoose.model('group_transactions', investmentSchema)