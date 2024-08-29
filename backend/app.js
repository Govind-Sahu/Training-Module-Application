const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const videoRoutes = require('./routes/videos');
const progressRoutes = require('./routes/progress');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use('/api/videos', videoRoutes);
app.use('/api/progress', progressRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
