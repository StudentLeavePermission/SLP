// const Data_Kelas = require('../models/models/dataKelas');
const path = require('path');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Data_Kelas = new mainModel("Data_Kelas");

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Data_Kelas.getAll();
    // res.json(classes);
    res.send({
      message: "Lecturers sent successfully",
      data: classes
    });
    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
