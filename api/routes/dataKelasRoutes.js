const express = require('express');
const router = express.Router();
const dataKelasController = require('../controllers/dataKelasController');

// Get all classes
router.get('/', dataKelasController.getAllClasses);

module.exports = router;
