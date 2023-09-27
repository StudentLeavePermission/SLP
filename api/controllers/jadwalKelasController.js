const Jadwal_Kelas = require('../models/jadwalKelas');

// Get all class schedules
exports.getAllClassSchedules = async (req, res) => {
  try {
    const schedules = await Jadwal_Kelas.findAll();
    res.json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new class schedule
exports.createClassSchedule = async (req, res) => {
  try {
    const { Hari, ID_Jam_Pelajaran, ID_Mata_Kuliah, ID_Dosen, ID_Kelas } = req.body;
    const newSchedule = await Jadwal_Kelas.create({
      Hari,
      ID_Jam_Pelajaran,
      ID_Mata_Kuliah,
      ID_Dosen,
      ID_Kelas
    });
    res.status(201).json(newSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
