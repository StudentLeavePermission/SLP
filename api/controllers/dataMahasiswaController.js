const Data_Mahasiswa = require('../models/dataMahasiswa')(sequelize, DataTypes);

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
