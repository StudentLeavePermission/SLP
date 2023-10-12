const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
const dataMahasiswaController = require('../controllers/dataMahasiswaController');
const mhsAuth = require('../middleware/mhsAuth')

router.use(cookieParser());

// Get all students
router.get('/students', dataMahasiswaController.getAllStudents);

router.get('/students/:id', dataMahasiswaController.getStudent);

router.post('/register', mhsAuth.saveUser, dataMahasiswaController.registerStudent);

router.post('/login', dataMahasiswaController.loginStudent);

router.get('/logout', mhsAuth.authorizedUser, dataMahasiswaController.logoutStudent);

router.get('/protected', mhsAuth.authorizedUser, dataMahasiswaController.protectedContent);


module.exports = router;
