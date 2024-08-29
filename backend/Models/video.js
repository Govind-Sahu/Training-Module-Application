const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: String,
    url: String,
    order: Number,
});

module.exports = mongoose.model('Video', videoSchema);
