const express = require('express');
const router = express.Router();
const dataMahasiswaController = require('../controllers/dataMahasiswaController');
const mhsAuth = require('../middleware/mhsAuth')

// Get all students
router.get('/', dataMahasiswaController.getAllStudents);

router.post('/register', mhsAuth.saveUser, dataMahasiswaController.registerStudent);

router.post('/login', dataMahasiswaController.loginStudent);

module.exports = router;
