const Data_Mata_Kuliah = require('../models/dataMataKuliah');

// Get all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Data_Mata_Kuliah.findAll();
    res.json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
