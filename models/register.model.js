const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerSchema = new Schema({
    activeStatus: {
        type: Boolean,
        default: true
    }
})

const Register = mongoose.model('Register', registerSchema);
module.exports = Register;