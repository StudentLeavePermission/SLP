const express = require('express');
const router = express.Router();
const dataPengajuanController = require('../controllers/dataPengajuanController');

// Get all leave requests
router.get('/', dataPengajuanController.getAllLeaveRequests);

router.get('/:id', dataPengajuanController.getLeaveRequest);

// Create a new leave request
router.post('/', dataPengajuanController.createLeaveRequest);

module.exports = router;
