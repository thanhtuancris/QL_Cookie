const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
	name: String,
    date_import: Date
})

module.exports = mongoose.model("notes", noteSchema)