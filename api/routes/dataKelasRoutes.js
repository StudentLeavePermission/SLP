const express = require('express');
const router = express.Router();
const dataKelasController = require('../controllers/dataKelasController');

// Get all classes
router.get('/', dataKelasController.getAllClasses);

router.get('/get/:id', dataKelasController.getOneDataKelas);

router.post('/create', dataKelasController.createDataKelas);

router.patch('/patch/:id', dataKelasController.editDataKelas);

module.exports = router;
