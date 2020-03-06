const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    street: String,
    city: String,
    zipcode: String,
    isCompleted: {
        type: Boolean,
        default: true,
    }
})

module.exports = mongoose.model('User', UserSchema);