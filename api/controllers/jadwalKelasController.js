const path = require('path');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Jadwal_Kelas = new mainModel("Jadwal_Kelas");
const Data_Mata_Kuliah = new mainModel("Data_Mata_Kuliah");

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

//Delete
exports.deleteClassSchedule = async (req, res) => {
  try {
    const whereClause = { id: req.params.id }; // Contoh: menghapus data berdasarkan ID
    const deletedRowCount = await Jadwal_Kelas.delete(whereClause);

    if (deletedRowCount === 0) {
      return res.status(404).json({ msg: 'New Schedule not found' });
    }

    res.status(200).json({ msg: 'New Schedule deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Edit
exports.editClassSchedule = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL
    const newData = req.body; // Data yang akan digunakan untuk mengganti data yang ada
    const whereClause = { id }; // Kriteria untuk menentukan data yang akan diedit

    const [updatedRowCount] = await Jadwal_Kelas.patch(newData, whereClause);

    if (updatedRowCount === 0) {
      return res.status(404).json({ msg: 'New Schedule not found' });
    }

    res.status(200).json({ msg: 'New Schedule updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getClassSchedule = async (req, res) => {
  try {
    const { id } = req.params; // Assuming NIM is passed as a route parameter
    const jadwal = await Jadwal_Kelas.get({
      where: { id: id },
    });

    if (jadwal) {
      res.send({
        message: "Class Schedule found successfully",
        data: jadwal,
      });
      console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
    } else {
      res.status(404).json({ message: "Class Schedule not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getClassScheduleWithTwoParams = async (req, res) => {
  try {
    const idKelas = req.params.idKelas
    const hari = req.params.hari
    const schedule = await Jadwal_Kelas.getAllWhere({
      where: {
        Hari_Jadwal: hari,
        ID_Kelas: idKelas
      },
    });

    const schedule2 = await Jadwal_Kelas.getAllInclude({
      where: {
        Hari_Jadwal: hari,
        ID_Kelas: idKelas
      },
      include: ['Data_Mata_Kuliah']
    });

    if (schedule) {
      res.send({
        message: "schedule found successfully",
        data: schedule,
        mata_kuliah : schedule2
      });
      
      console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
    } else {
      res.status(404).json({ message: "schedule not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};