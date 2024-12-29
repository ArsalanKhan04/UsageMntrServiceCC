const express = require('express');
const cors = require('cors');
const usageRoutes = require('./routes/usageRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', usageRoutes);

module.exports = app;

