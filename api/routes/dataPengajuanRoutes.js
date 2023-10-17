const express = require('express');
const router = express.Router();
const dataPengajuanController = require('../controllers/dataPengajuanController');
const multer = require('multer');
const cors = require('cors');

//middleware untuk file
const uploadFile = require('../middleware/multerFile');

// Get all leave requests
router.get('/', dataPengajuanController.getAllLeaveRequests);

router.get('/:id', dataPengajuanController.getLeaveRequest);

router.patch('/update/:id', dataPengajuanController.editLeaveRequest);

// Create a new leave request
router.post('/', uploadFile.single('File_Pengajuan'), dataPengajuanController.createLeaveRequest);

module.exports = router;
