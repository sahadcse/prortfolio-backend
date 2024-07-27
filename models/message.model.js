const mongoose = require("mongoose")
const { create } = require("./admin.model")
const Schema = mongoose.Schema

const messageSchema = new Schema({
    fullName: { type: String, required: true},
    email: { type: String, required: true},
    subject: { type: String, required: true},
    message: { type: String, required: true},
    createdAt: { type: Date, default: Date.now}
})

const Message = mongoose.model("Message", messageSchema)

module.exports = Message;