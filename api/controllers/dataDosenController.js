const Data_Dosen = require('../models/dataDosen');

// Get all lecturers
exports.getAllLecturers = async (req, res) => {
  try {
    const lecturers = await Data_Dosen.findAll();
    res.json(lecturers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
