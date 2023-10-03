// const Data_Pengajuan = require('../models/models/dataPengajuan');
const path = require('path');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Data_Pengajuan = new mainModel("Data_Pengajuan");

// Get all leave requests
exports.getAllLeaveRequests = async (req, res) => {
  try {
    const requests = await Data_Pengajuan.getAll();
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new leave request
exports.createLeaveRequest = async (req, res) => {
  try {
    const { Keterangan, Tanggal_Pengajuan, Tanggal_Izin, ID_Jadwal_Kelas, Jenis_Izin, ID_Mahasiswa, Status_Pengajuan } = req.body;
    const newRequest = await Data_Pengajuan.post({
      Keterangan,
      Tanggal_Pengajuan,
      Tanggal_Izin,
      ID_Jadwal_Kelas,
      Jenis_Izin,
      ID_Mahasiswa,
      Status_Pengajuan,
    });
    res.status(201).json(newRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
