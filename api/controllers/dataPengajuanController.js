const Data_Pengajuan = require('../models/dataPengajuan');

// Get all leave requests
exports.getAllLeaveRequests = async (req, res) => {
  try {
    const requests = await Data_Pengajuan.findAll();
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
    const newRequest = await Data_Pengajuan.create({
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
