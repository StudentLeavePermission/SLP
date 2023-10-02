// const Data_Dosen_Wali = require('../models/models/dataDosenWali');
const path = require('path');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Data_Dosen_Wali = new mainModel("Data_Dosen_Wali");

// Get all adviser lecturers
exports.getAllAdviserLecturers = async (req, res) => {
  try {
    const adviserLecturers = await Data_Dosen_Wali.getAll();
    // res.json(adviserLecturers);
    res.send({
      message: "Adviser Lecturers sent successfully",
      data: adviserLecturers
    });
    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
