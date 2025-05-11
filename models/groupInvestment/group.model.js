const mongoose = require('mongoose')
const { Types } = mongoose
const { ObjectId } = Types

const groupInvestmentSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    members: {
        type: [ObjectId],
        required: true
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


module.exports = mongoose.model('group', groupInvestmentSchema)