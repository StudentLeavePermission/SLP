// const Data_Dosen_Wali = require('../models/models/dataDosenWali');
const path = require('path');
const basename = path.basename(__filename);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {mainModel} = require('../common/models');
const Data_Dosen_Wali = new mainModel("Data_Dosen_Wali");
const Data_Dosen = new mainModel("Data_Dosen");

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

exports.loginAdviserLecturer = async (req, res) => {
  try {
    const {Email_Dosen, Password} = req.body;
    const dosenWali = await Data_Dosen.get({
      where: {
        Email_Dosen: Email_Dosen
      }
    });
    console.log('dosenWali: ', JSON.stringify(dosenWali.id));
    if (!dosenWali) {
      return res.status(401).json({message: 'Invalid username or password'});
    } else {
      const pwd = await Data_Dosen_Wali.get({
        where: {
          ID_Dosen: dosenWali.id
        }
      });
      const passwordMatch = await bcrypt.compare(Password, pwd.Password);
      if (!passwordMatch) {
        return res.status(401).json({message: 'Invalid username or password'});
      } else {
        const token = jwt.sign({userId: dosenWali.Email_Dosen}, 'secretKey', { expiresIn: '1h' });
        res.status(200).json({ token });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

exports.registerAdviserLecturer = async (req, res) => {
  try {
    const {Email_Dosen, Password} = req.body;
    const dosenWali = await Data_Dosen_Wali.get(Email_Dosen);
    const passwordMatch = await bcrypt.compare(Password, dosenWali.Password);
    if (!dosenWali || !passwordMatch) {
      return res.status(401).json({message: 'Invalid username or password'});
    }
    const token = jwt.sign({userId: dosenWali.Email_Dosen}, 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
  }
};


exports.getOneDataDosenWali = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL
    const dataDosenWali = await Data_Dosen_Wali.get({ where: { id } }); // Menggunakan metode 'get' dengan kriteria ID

    if (dataDosenWali) {
      res.send({
        message: "Data Dosen Wali found successfully",
        data: dataDosenWali,
      });
      console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
    } else {
      res.status(404).json({ message: "Data Dosen Wali not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createDataDosenWali = async (req, res) => { //sudah bisa menjadi fk di data_dosen_wali
  try {
    const { Password, ID_Dosen } = req.body;

    // Pastikan ID_Dosen yang diberikan ada di tabel Data_Dosen
    const dosen = await Data_Dosen.get({
      where: { id: ID_Dosen },
    });

    if (!dosen) {
      return res.status(404).json({ message: 'Data Dosen not found' });
    }

    // Lanjutkan dengan membuat Data Dosen Wali
    await Data_Dosen_Wali.post({
      Password,
      ID_Dosen, // Pastikan Anda sudah mengirimkan ID_Dosen dalam permintaan POST
    });

    res.status(201).json({ msg: 'Data Dosen Wali created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.editDataDosenWali = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const whereClause = { id };

    const updatedRowCount = await Data_Dosen_Wali.patch(newData, whereClause);

    if (updatedRowCount === 0) {
      return res.status(404).json({ msg: 'Data Dosen Wali not found' });
    }

    res.status(200).json({ msg: 'Data Dosen Wali updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Delete
exports.deleteDataDosenWali = async (req, res) => {
  try {
    const whereClause = { id: req.params.id }; // Contoh: menghapus data berdasarkan ID
    const deletedRowCount = await Data_Dosen_Wali.delete(whereClause);

    if (deletedRowCount === 0) {
      return res.status(404).json({ msg: 'Data Dosen Wali not found' });
    }

    res.status(200).json({ msg: 'Data Dosen Wali deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

