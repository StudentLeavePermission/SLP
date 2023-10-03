// const Data_Mata_Kuliah = require('../models/models/dataMataKuliah');
const path = require('path');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Data_Mata_Kuliah = new mainModel("Data_Mata_Kuliah");

// Get all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Data_Mata_Kuliah.getAll();
    res.json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
