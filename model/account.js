const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({
    username: String,
    password: String,
    token: String,
})

module.exports = mongoose.model("accounts", dataSchema)