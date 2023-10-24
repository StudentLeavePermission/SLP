const express = require('express');
const router = express.Router();
const dataPengajuanController = require('../controllers/dataPengajuanController');
const multer = require('multer');
const cors = require('cors');

//middleware untuk file
const uploadFile = require('../middleware/multerFile');

router.get('/', dataPengajuanController.getAllLeaveRequests);

router.get('/formatted', dataPengajuanController.getAllFormattedLeaveRequests);

router.get('/:id', dataPengajuanController.getLeaveRequest);

router.patch('/update/:id', dataPengajuanController.editLeaveRequest);

router.get('/download/:filename', dataPengajuanController.downloadFile);

router.post('/', uploadFile.single('File_Pengajuan'), dataPengajuanController.createLeaveRequest);

module.exports = router;
