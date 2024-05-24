const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String ,required: true },
    image: { type: String, required: true }
});

module.exports = mongoose.model('Post', todoSchema);;