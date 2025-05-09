const mongoose = require('mongoose')
const { Types } = mongoose
const { ObjectId } = Types

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
    },
    color: {
        type: String
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

module.exports = mongoose.model('category', categorySchema)