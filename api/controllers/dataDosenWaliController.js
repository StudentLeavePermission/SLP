const Data_Dosen_Wali = require('../models/dataDosenWali');

// Get all adviser lecturers
exports.getAllAdviserLecturers = async (req, res) => {
  try {
    const adviserLecturers = await Data_Dosen_Wali.findAll();
    res.json(adviserLecturers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
