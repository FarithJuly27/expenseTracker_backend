const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const DB_URL = process.env.MONGO_DB_URL

const dbConnect = async () => {
    await mongoose.connect(DB_URL)
}

module.exports = dbConnect

