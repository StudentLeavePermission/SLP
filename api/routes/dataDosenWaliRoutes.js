const express = require('express');
const router = express.Router();
const dataDosenWaliController = require('../controllers/dataDosenWaliController');

// Get all adviser lecturers
router.get('/', dataDosenWaliController.getAllAdviserLecturers);

module.exports = router;
