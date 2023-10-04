const path = require('path');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Jadwal_Kelas = new mainModel("Jadwal_Kelas");
// console.log(Jadwal_Kelas);
// const Jadwal_Kelas = require('../models/models/jadwalKelas');

// Get all class schedules
exports.getAllClassSchedules = async (req, res) => {
  try {
    const schedules = await Jadwal_Kelas.getAll(); // WHERE THE ERROR IS
    // res.json(schedules);
    res.send({
      message: "Schedule sent successfully",
      data: schedules
    });
    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new class schedule
exports.createClassSchedule = async (req, res) => {
  try {
    await Jadwal_Kelas.post(req.body);
    res.status(201).json({ msg: 'New Schedule created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
