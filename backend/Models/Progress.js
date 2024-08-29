const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    userId: String,
    videoId: mongoose.Schema.Types.ObjectId,
    lastWatchedTime: Number,
    completed: Boolean,
});

module.exports = mongoose.model('Progress', progressSchema);
