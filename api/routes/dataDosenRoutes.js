const express = require('express');
const router = express.Router();
const dataDosenController = require('../controllers/dataDosenController');

// Get all lecturers
router.get('/', dataDosenController.getAllDataDosen);

// Get all lecturers in a formatted way
router.get('/getDosenFormatted', dataDosenController.getAllDataDosenFormatted);

// Export all lecturers to Excel
router.get('/getAllExport', dataDosenController.getAllDosenExport);

router.post('/create', dataDosenController.createDataDosen);

router.post('/createformatted', dataDosenController.createDataDosenFormatted);

router.delete('/delete/:id', dataDosenController.deleteDataDosen);

router.patch('/patch/:id', dataDosenController.editDataDosen);

router.get('/get/:id', dataDosenController.getOneDataDosen);

router.get('/getformatted/:id', dataDosenController.getoneDosenFormatted);

module.exports = router;
