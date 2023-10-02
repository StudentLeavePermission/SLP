// const Data_Dosen = require('../models/models/dataDosen');
const path = require('path');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Data_Dosen = new mainModel("Data_Dosen");

// Get all lecturers
exports.getAllLecturers = async (req, res) => {
  try {
    const lecturers = await Data_Dosen.getAll();
    // res.json(lecturers);
    res.send({
      message: "Lecturers sent successfully",
      data: lecturers
    });
    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
