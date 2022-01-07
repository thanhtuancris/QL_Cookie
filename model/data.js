const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({
    // name: String,
    // image: String,
    // token: String,
    // tokenBusiness: String,
    // nation: String,
    // phone: String,
	// operation: String,
    // userAgent: String,
    cookie: String,
    dateTime: Date,
    isalive: Boolean,
    isdelete: Boolean,
    note: String,
    infor_bmlimit: String,
    updateTime: Date,
    ip: String,
    nation: String,
    useragent: String,
    c_user: String
})

module.exports = mongoose.model("cookies", dataSchema)