const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const adminSchema = new Schema(
    {
        adminName: {type: String, require: true},
        adminEmail: {type: String, require: true},
        adminPassword: {type:String, require: true},
        createdOn: {type: Date, default: new Date().getTime()},
    }
)

module.exports = mongoose.model("Admin", adminSchema)