const express = require('express');
const router = express.Router();
const dataMahasiswaController = require('../controllers/dataMahasiswaController');

// Get all students
router.get('/', dataMahasiswaController.getAllStudents);

module.exports = router;
