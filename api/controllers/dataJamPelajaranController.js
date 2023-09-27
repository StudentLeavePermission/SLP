const Data_Jam_Pelajaran = require('../models/dataJamPelajaran');

// Get all class hours
exports.getAllClassHours = async (req, res) => {
  try {
    const classHours = await Data_Jam_Pelajaran.findAll();
    res.json(classHours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
