const express = require('express');
const { getUsage } = require('../controllers/getUsage');
const { addUsage } = require('../controllers/addUsage');

const router = express.Router();

router.get('/getusage', getUsage);
router.post('/addusage', addUsage);

module.exports = router;
