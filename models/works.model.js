const mongoose = require('mongoose');
const { create } = require('./admin.model');
const Schema = mongoose.Schema;

const worksSchema = new Schema({
    workType : {
        type: String,
        required: true
    },
    workTitle : {
        type: String,
        required: true
    },
    workDescription : {
        type: String,
        required: true
    },
    workImage : {
        type: String,
        required: true
    },
    workVisitUrl : {
        type: String,
        required: true
    },
    workGithubUrl : {
        type: String,
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
})

const Works = mongoose.model('Works', worksSchema);

module.exports = Works;