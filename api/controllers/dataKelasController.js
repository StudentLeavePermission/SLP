const Data_Kelas = require('../models/dataKelas');

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Data_Kelas.findAll();
    res.json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
