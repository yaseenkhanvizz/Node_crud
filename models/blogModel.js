const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: { type: String, required: true },
    subheading: { type: String ,required: true },
    image: { type: String, required: true },
    content : {type: String, required: true},
    blog_date: { type: Date }
});

module.exports = mongoose.model('Blog', todoSchema);;