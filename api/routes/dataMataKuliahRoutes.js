const express = require('express');
const router = express.Router();
const dataMataKuliahController = require('../controllers/dataMataKuliahController');

// Get all subjects
router.get('/', dataMataKuliahController.getAllSubjects);

module.exports = router;
