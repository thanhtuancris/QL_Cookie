const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({
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
    quantity_adaccount: Number,
    quantity_bm: Number,
    quantity_page: Number,
})

module.exports = mongoose.model("cookies", dataSchema)