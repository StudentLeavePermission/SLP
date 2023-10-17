// const Data_Dosen = require('../models/models/dataDosen');
const path = require('path');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Data_Dosen = new mainModel("Data_Dosen");

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
