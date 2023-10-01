const express = require('express');
const router = express.Router();
const axios = require('axios');
const dataDosenController = require('../controllers/dataDosenController');

// Get all lecturers
router.get('/', dataDosenController.getAllLecturers);

module.exports = router;
