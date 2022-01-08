const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({
    username: String,
    password: String,
    token: String,
    isdelete: Boolean,
    status: Boolean,
    role: Number
})

module.exports = mongoose.model("accounts", dataSchema)