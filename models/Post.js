const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: String,
    body: String
})

module.exports = mongoose.model('Post', PostSchema);