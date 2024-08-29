const express = require('express');
const Video = require('../Models/video');
const router = express.Router();

// Get all videos
router.get('/', async (req, res) => {
    const videos = await Video.find().sort({ order: 1 });
    res.json(videos);
});

// Add a new video (for admin purposes)
router.post('/', async (req, res) => {
    const video = new Video(req.body);
    await video.save();
    res.status(201).send(video);
});

module.exports = router;
