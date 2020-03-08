const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    userId: String,
    title: String,
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model("Todo", TodoSchema);