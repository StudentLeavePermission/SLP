const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
const dataMahasiswaController = require('../controllers/dataMahasiswaController');
const mhsAuth = require('../middleware/mhsAuth')
const path = require('path');
const multer = require('multer');
const cors = require('cors');

//middleware untuk file
const uploadFile = require('../middleware/multerFile');
//middleware untuk image
const uploadImg = require('../middleware/multerImg');

router.use(cookieParser());

// Get all students
router.get('/students', dataMahasiswaController.getAllStudents);

router.get('/students/:id', dataMahasiswaController.getStudent);

router.get('/students/getId/:NIM', dataMahasiswaController.getStudentId);

router.post('/students/edit/:id', uploadImg.single('photo'), dataMahasiswaController.editStudent);

router.post('/register', mhsAuth.saveUser, dataMahasiswaController.registerStudent);

router.post('/login', dataMahasiswaController.loginStudent);

router.get('/logout', mhsAuth.authorizedUser, dataMahasiswaController.logoutStudent);

router.get('/protected', mhsAuth.authorizedUser, dataMahasiswaController.protectedContent);


module.exports = router;
