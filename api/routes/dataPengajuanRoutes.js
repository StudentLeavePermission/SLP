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

router.get('/mahasiswa/:idMahasiswa', dataPengajuanController.getLeaveRequestMahasiswa);

router.patch('/update/:id', dataPengajuanController.editLeaveRequest);

router.get('/download/:filename', dataPengajuanController.downloadFile);

router.get('/pengajuan/:id', dataPengajuanController.getPengajuanFormatted);

router.get('/pengajuantabel/:id', dataPengajuanController.getAllDataTabelPengajuan);

router.get('/pengajuantrend/:id', dataPengajuanController.getAllDataPengajuan);

router.get('/pengajuanTrendNew/:id', dataPengajuanController.getAllDataPengajuanTrend);

router.get('/leave/request/:jenis/:IDProdi', dataPengajuanController.getCountOfLeaveRequests);

router.get('/leave/request/:IDProdi', dataPengajuanController.getCountOfLeaveRequestsTable);

router.post('/', uploadFile.single('File_Pengajuan'), dataPengajuanController.createLeaveRequest);

router.delete('/delete/:id', dataPengajuanController.deleteLeaveRequest);

module.exports = router;
