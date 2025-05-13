const { required } = require('joi')
const mongoose = require('mongoose')
const { Types } = mongoose
const { ObjectId } = Types

const groupNotificationSchema = new mongoose.Schema({
    groupId: {
        type: ObjectId,
        required: true,
        ref: 'group'
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },
    type: {
        type: String,
        enum: ['Invitation', 'Reminder', 'Updates'],
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    readStatus: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Delete'],
        default: 'Active'
    },
    createdBy: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
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


module.exports = mongoose.model('group_notifications', groupNotificationSchema)