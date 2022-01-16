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
    note: String,
    infor_bmlimit: String,
    ip: String,
    nation: String,
    city: String,
    useragent: String,
    c_user: String,
    dateTime: Date,
    updateTime: Date,
    isalive: Boolean,
    isdelete: Boolean,
    data_adaccount: Array,
    data_bminfor: Array,
    data_page: Array,
})

module.exports = mongoose.model("cookies", dataSchema)