const mongoose = require("mongoose")
const Schema = mongoose.Schema

const profileSchema = new Schema({
    imageUrl: { type: String, required: true},
    fullName: { type: String, required: true},
    role: { type: String, required: true},
    shortDescription: { type: String, required: true},
    socalLinks: { type: Array, required: true},
    contacts: { type: Array, required: true},
    createdAt: { type: Date, default: Date.now}
})

const Profile = mongoose.model("Profile", profileSchema)

module.exports = Profile;