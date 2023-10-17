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
      message: "Classes sent successfully",
      data: classes
    });
    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getOneDataKelas = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL
    const dataKelas = await Data_Kelas.get({ // Menggunakan metode 'get' dengan kriteria ID
      where: { id: id },
    });

    if (dataKelas) {
      res.send({
        message: "Data Kelas found successfully",
        data: dataKelas,
      });
      console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
    } else {
      res.status(404).json({ message: "Data Kelas not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Insert
// Create Data Kelas
exports.createDataKelas = async (req, res) => {
  try {
    const { Nama_Kelas, ID_Dosen_Wali } = req.body;

    if (!Nama_Kelas || !ID_Dosen_Wali) {
      return res.status(400).json({ error: 'Nama Kelas and ID Dosen Wali are required' });
    }

    const newKelas = await Data_Kelas.post({
      Nama_Kelas,
      ID_Dosen_Wali,
    });

    res.status(201).json({
      message: 'Data Kelas created successfully',
      data: newKelas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
