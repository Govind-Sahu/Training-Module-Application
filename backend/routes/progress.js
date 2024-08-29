const express = require('express');
const Progress = require('../Models/Progress');
const router = express.Router();

// Get progress for a user
router.get('/:userId', async (req, res) => {
    const progress = await Progress.find({ userId: req.params.userId });
    res.json(progress);
});

// Update or create progress
router.post('/', async (req, res) => {
    const { userId, videoId, lastWatchedTime, completed } = req.body;
    const progress = await Progress.findOneAndUpdate(
        { userId, videoId },
        { lastWatchedTime, completed },
        { new: true, upsert: true }
    );
    res.json(progress);
});

module.exports = router;
