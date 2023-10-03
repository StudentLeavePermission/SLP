// const Data_Jam_Pelajaran = require('../models/models/dataJamPelajaran');
const path = require('path');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Data_Jam_Pelajaran = new mainModel("Data_Jam_Pelajaran");

// Get all class hours
exports.getAllClassHours = async (req, res) => {
  try {
    const classHours = await Data_Jam_Pelajaran.getAll();
    // res.json(classHours);
    res.send({
      message: "Class Hours sent successfully",
      data: classHours
    });
    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
