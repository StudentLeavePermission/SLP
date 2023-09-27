const express = require('express');
const router = express.Router();
const dataPengajuanController = require('../controllers/dataPengajuanController');

// Get all leave requests
router.get('/', dataPengajuanController.getAllLeaveRequests);

// Create a new leave request
router.post('/', dataPengajuanController.createLeaveRequest);

module.exports = router;
