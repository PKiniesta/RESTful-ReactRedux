const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema({
        name: { type: String },
});

module.exports = mongoose.model('Author', userModel);
