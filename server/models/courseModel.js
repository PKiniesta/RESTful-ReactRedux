const mongoose = require('mongoose');

const { Schema } = mongoose;

const courseModel = new Schema({
        title: { type: String },
        authorId: { type: String },
        category: { type: String },
        slug: { type: String },
});

module.exports = mongoose.model('Course', courseModel);
