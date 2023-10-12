const express = require('express');
const router = express.Router();
const axios = require('axios');
const dataDosenController = require('../controllers/dataDosenController');

// Get all lecturers
router.get('/', dataDosenController.getAllDataDosen);

router.post('/create', dataDosenController.createDataDosen);

router.delete('/delete/:id', dataDosenController.deleteDataDosen);

router.patch('/patch/:id', dataDosenController.editDataDosen);

router.get('/get/:id', dataDosenController.getOneDataDosen);

module.exports = router;
