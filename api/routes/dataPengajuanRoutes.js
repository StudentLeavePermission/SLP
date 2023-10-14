const express = require('express');
const router = express.Router();
const dataPengajuanController = require('../controllers/dataPengajuanController');

// Get all leave requests
router.get('/', dataPengajuanController.getAllLeaveRequests);

router.get('/:id', dataPengajuanController.getLeaveRequest);

router.patch('/update/:id', dataPengajuanController.editLeaveRequest);

// Create a new leave request
router.post('/', dataPengajuanController.createLeaveRequest);

module.exports = router;
