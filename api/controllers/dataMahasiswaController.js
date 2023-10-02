// const Data_Mahasiswa = require('../models/models/dataMahasiswa');
const path = require('path');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Data_Mahasiswa = new mainModel("Data_Mahasiswa");

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Data_Mahasiswa.findAll();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
