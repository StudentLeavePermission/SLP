const express = require('express');
const router = express.Router();
const axios = require('axios');
const jadwalKelasController = require('../controllers/jadwalKelasController');

// Get all class schedules
router.get('/', jadwalKelasController.getAllClassSchedules);

// Create a new class schedule
router.post('/create', jadwalKelasController.createClassSchedule);

module.exports = router;
