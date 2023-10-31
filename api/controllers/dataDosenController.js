// const Data_Dosen = require('../models/models/dataDosen');
const path = require('path');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Data_Dosen = new mainModel("Data_Dosen");
const Data_Kelas = new mainModel("Data_Kelas");
const Data_Dosen_Wali = new mainModel("Data_Dosen_Wali");

// Mengambil semua data dosen
exports.getAllDataDosen = async (req, res) => {
  try {
    const dataDosen = await Data_Dosen.getAll(); // Menggunakan metode 'getAll'

    res.send({
      message: "Data Dosen sent successfully",
      data: dataDosen
    });

    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// post(data){
//   return this.models.create(data,{
//       fields:Object.keys(data)
//   })
// }

//Insert
exports.createDataDosen = async (req, res) => {
  try {
    await Data_Dosen.post(req.body);
    res.status(201).json({ msg: 'Data Dosen created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// delete(where){
//   return this.models.destroy({
//       where:where
//   })
// }

//Delete
exports.deleteDataDosen = async (req, res) => {
  try {
    const whereClause = { id: req.params.id }; // Contoh: menghapus data berdasarkan ID
    const deletedRowCount = await Data_Dosen.delete(whereClause);

    if (deletedRowCount === 0) {
      return res.status(404).json({ msg: 'Data Dosen not found' });
    }

    res.status(200).json({ msg: 'Data Dosen deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Edit
exports.editDataDosen = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL
    const newData = req.body; // Data yang akan digunakan untuk mengganti data yang ada
    const whereClause = { id }; // Kriteria untuk menentukan data yang akan diedit

    const [updatedRowCount] = await Data_Dosen.patch(newData, whereClause);

    if (updatedRowCount === 0) {
      return res.status(404).json({ msg: 'Data Dosen not found' });
    }

    res.status(200).json({ msg: 'Data Dosen updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Mendapatkan satu data dosen berdasarkan ID
exports.getOneDataDosen = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL
    const dataDosen = await Data_Dosen.get({ // Menggunakan metode 'get' dengan kriteria ID
      where: { id: id },
    });

    if (dataDosen) {
      res.send({
        message: "Data Dosen found successfully",
        data: dataDosen,
      });
      console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
    } else {
      res.status(404).json({ message: "Data Dosen not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getoneDosenFormatted = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL
    const dataDosen = await Data_Dosen.get({ // Menggunakan metode 'get' dengan kriteria ID
      where: { id: id },
    });

    const dataKelas = await Data_Kelas.getAll();

    if (dataDosen) {
      res.send({
        message: "Data Dosen found successfully",
        data: dataDosen,
        dataKelas: dataKelas,
      });
      console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
    } else {
      res.status(404).json({ message: "Data Dosen not found" });
    }    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createDataDosenFormatted = async (req, res) => {
  try {
    // Data Dosen
    const {
      Nama_Dosen,
      NIP,
      Kode_Dosen,
      InitialID,
      Email_Dosen,
    } = req.body;

    if (!Nama_Dosen || !NIP || !Kode_Dosen || !InitialID || !Email_Dosen) {
      return res.status(400).json({ error: 'Nama Dosen, NIP, Kode Dosen, InitialID, and Email_Dosen are required' });
    }

    // Data Kelas
    const { Nama_Kelas } = req.body;

    if (!Nama_Kelas) {
      return res.status(400).json({ error: 'Nama Kelas is required' });
    }

    // Data Dosen Wali
    const { Password } = req.body;

    if (!Password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Simpan Data Dosen
    const dataDosen = await Data_Dosen.post({
      Nama_Dosen,
      NIP,
      Kode_Dosen,
      InitialID,
      Email_Dosen,
    });

    // Cari ID_Dosen
    const ID_Dosen = dataDosen.id;

    // Simpan Data Dosen Wali
    const dataDosenWali = await Data_Dosen_Wali.post({
      Password,
      ID_Dosen: ID_Dosen, // Menggunakan ID_Dosen yang ditemukan
    });

    // Simpan Data Kelas
    const dataKelas = await Data_Kelas.post({
      Nama_Kelas,
      ID_Dosen_Wali: ID_Dosen, // Menggunakan ID_Dosen yang ditemukan
    });

    if (dataDosen && dataKelas && dataDosenWali) {
      res.status(201).json({
        message: 'Data Dosen Formatted created',
        data: dataDosen,
        dataDosenWali: dataDosenWali,
        dataKelas: dataKelas,
      });
    } else {
      res.status(404).json({ message: 'Data Dosen, Data Kelas, or Data Dosen Wali not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

