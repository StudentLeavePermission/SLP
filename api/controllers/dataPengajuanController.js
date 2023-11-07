// const Data_Pengajuan = require('../models/models/dataPengajuan');
const path = require('path');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Data_Pengajuan = new mainModel("Data_Pengajuan");
const Jadwal_Kelas = new mainModel("Jadwal_Kelas");
const Data_Kelas = new mainModel("Data_Kelas");
const Data_Mahasiswa = new mainModel("Data_Mahasiswa");
const { Op } = require('sequelize');

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

exports.getLeaveRequestMahasiswa = async (req, res) => {
  try {
    const request = await Data_Pengajuan.getAll({
      where: {
        ID_Mahasiswa: req.params.idMahasiswa,
      },
    });
    const jadwal = await Jadwal_Kelas.getAll();

    if (request) {
      res.send({
        message: "Request found successfully",
        data : request,
        jadwal : jadwal,
      });
      console.log(request)
      console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getLeaveRequest = async (req, res) => {
  try {
    const request = await Data_Pengajuan.get({
      where: {
        id: req.params.id,
      }
    });

    if (request) {
      res.send({
        message: "Request found successfully",
        data: request,
      });
      console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getAllFormattedLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await Data_Pengajuan.getAll();
    if (leaveRequests) {
      res.send({
        message: "Leave Requests found successfully",
        data: leaveRequests
      })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


exports.createLeaveRequest = async (req, res) => {
  try {
    const { ID_Mahasiswa, Keterangan, Jenis_Izin, Tanggal_Pengajuan, Tanggal_Izin,ID_Jadwal_Kelas,Status_Pengajuan   } = req.body;
    const filename = req.body.filename;
    await Data_Pengajuan.post(
      {
        ID_Mahasiswa : ID_Mahasiswa,
        Keterangan : Keterangan,
        Jenis_Izin : Jenis_Izin,
        ID_Jadwal_Kelas : ID_Jadwal_Kelas,
        Tanggal_Pengajuan : Tanggal_Pengajuan,
        Tanggal_Izin : Tanggal_Izin,
        File_Pengajuan: filename,
        Status_Pengajuan :  Status_Pengajuan,
        Alasan_Penolakan : ''
      }
    );
    res.status(201).json({ msg: 'Leave Request created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.editLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL
    const newData = req.body; // Data yang akan digunakan untuk mengganti data yang ada
    const whereClause = { id }; // Kriteria untuk menentukan data yang akan diedit

    const [updatedRowCount] = await Data_Pengajuan.patch(newData, whereClause);

    if (updatedRowCount === 0) {
      return res.status(404).json({ msg: 'LeaveRequest not found' });
    }

    res.status(200).json({ msg: 'LeaveRequest updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.downloadFile = async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.resolve(__dirname, '../../react/src/assets/files', filename);

  console.log(filePath)

  res.download(filePath, (err) => {
      if (err) {
          console.error(`Error downloading file: ${err}`);
          res.status(500).send('Error downloading file');
      }
  });
};

exports.getPengajuanFormatted = async (req, res) => {
  try {
    const { id } = req.params;

    // Ambil data kelas
    const kelas = await Data_Kelas.get({
      where: { id: id },
    });

    if (!kelas) {
      return res.status(404).json({ message: "Data Kelas not found" });
    }

    // Ambil data mahasiswa berdasarkan ID_Kelas
    const mahasiswa = await Data_Mahasiswa.getAll({
      where: { ID_Kelas: kelas.id },
    });

    // Ambil data pengajuan berdasarkan ID_Mahasiswa
    const pengajuan = await Data_Pengajuan.getAll({
      where: { ID_Mahasiswa: mahasiswa.map((mhs) => mhs.id) },
    });

    // Menggabungkan data Mahasiswa dan Pengajuan dengan Tanggal_Izin yang diformat
    const dataMahasiswaPengajuan = [];
    mahasiswa.forEach((mhs) => {
      const matchingPengajuan = pengajuan.filter((p) => p.ID_Mahasiswa === mhs.id);
      const uniquePengajuan = {};

      matchingPengajuan.forEach((peng) => {
        const key = `${peng.Jenis_Izin}_${formatDate(peng.Tanggal_Pengajuan)}`;
        if (!uniquePengajuan[key]) {
          uniquePengajuan[key] = {
            id: peng.id, // Tambahkan id di sini
            Nama: mhs.Nama,
            NIM: mhs.NIM,
            Jenis_Izin: peng.Jenis_Izin,
            Tanggal_Pengajuan: formatDate(peng.Tanggal_Pengajuan),
          };
        }
      });

      dataMahasiswaPengajuan.push(...Object.values(uniquePengajuan));
    });

    // Formatting data kelas
    const currentYear = new Date().getFullYear();
    let angka_kelas;
    if (new Date().getMonth() >= 7) {
      angka_kelas = currentYear - kelas.Tahun_Ajaran + 1;
    } else {
      angka_kelas = currentYear - kelas.Tahun_Ajaran;
    }

    const formattedDataKelas = {
      id: kelas.id,
      Nama_Kelas: `${angka_kelas}${kelas.Nama_Kelas}`,
      Tahun_Ajaran: kelas.Tahun_Ajaran,
      ID_Dosen_Wali: kelas.ID_Dosen_Wali,
      createdAt: kelas.createdAt,
      updatedAt: kelas.updatedAt,
    };

    res.send({
      message: "Pengajuan found successfully",
      dataKelas: formattedDataKelas,
      dataMahasiswa: mahasiswa,
      dataPengajuan: pengajuan,
      dataDetail: dataMahasiswaPengajuan,
    });

    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
}






exports.getCountOfLeaveRequests = async (req, res) => {
  try {
    const { jenis, prodi } = req.params;
    
    const jmlPengajuan = Array.from({ length: 12 }, () => 0);

    // Mendapatkan tahun sekarang
    const currentYear = new Date().getFullYear(); 

    // Mengecek dari bulan januari
    let month = 0;

    //Cek bulan untuk memisahkan semester
    while (month < 12){
      const startDate = new Date(currentYear, month, 1); // Tanggal awal 
      const endDate = new Date(currentYear, month, 31); // Tanggal akhir 
      
      const dataPengajuan = await Data_Pengajuan.getAll({
        where: {
          Tanggal_Izin: {
            [Op.and]: [
              { [Op.gte]: startDate }, // Tanggal izin >= tanggal awal Januari
              { [Op.lte]: endDate } // Tanggal izin <= tanggal akhir Januari
            ]
          },
          Status_Pengajuan: 'Delivered',
          Jenis_Izin: jenis
        }
      });

      if (dataPengajuan) {
        jmlPengajuan[month]  = dataPengajuan.length;
      }

      month += 1;
    }

    if (jmlPengajuan) {
      res.send({
        message: "Leave Requests found successfully",
        data: jmlPengajuan
      })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};