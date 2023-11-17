// const Data_Pengajuan = require('../models/models/dataPengajuan');
const path = require('path');
const nodemailer = require('nodemailer');
const basename = path.basename(__filename);
const { mainModel } = require('../common/models');
const Data_Pengajuan = new mainModel("Data_Pengajuan");
const Jadwal_Kelas = new mainModel("Jadwal_Kelas");
const Data_Kelas = new mainModel("Data_Kelas");
const Data_Mahasiswa = new mainModel("Data_Mahasiswa");
const Data_Dosen = new mainModel("Data_Dosen");
const { Op } = require('sequelize');
const hbs = require('nodemailer-express-handlebars')

// const React = require('react');
// const ReactDOMServer = require('react-dom/server');
// const EmailContent = require('../../react/src/componentSLP/EmailContent');

// import { render } from '@react-email/render';
// import { EmailContent } from '../../react/src/componentSLP/EmailContent';

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

    const mahasiswa = await Data_Pengajuan.getAllInclude({
      where: {
        ID_Mahasiswa: req.params.idMahasiswa,
      },
      include: ['Data_Mahasiswa']
    });
    const jadwal = await Jadwal_Kelas.getAll();

    if (request) {
      res.send({
        message: "Request found successfully",
        data: request,
        jadwal: jadwal,
        mahasiswa: mahasiswa
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

    const mahasiswa = await Data_Pengajuan.getAllInclude({
      where: {
        id: req.params.id,
      },
      include: ['Data_Mahasiswa']
    });

    const jadwal = await Jadwal_Kelas.getAll();

    if (request) {
      res.send({
        message: "Request found successfully",
        data: request,
        mahasiswa: mahasiswa,
        jadwal: jadwal,
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
    const { ID_Mahasiswa, Keterangan, Jenis_Izin, Tanggal_Pengajuan, Tanggal_Izin, ID_Jadwal_Kelas, Status_Pengajuan } = req.body;
    const filename = req.body.filename;
    await Data_Pengajuan.post(
      {
        ID_Mahasiswa: ID_Mahasiswa,
        Keterangan: Keterangan,
        Jenis_Izin: Jenis_Izin,
        ID_Jadwal_Kelas: ID_Jadwal_Kelas,
        Tanggal_Pengajuan: Tanggal_Pengajuan,
        Tanggal_Izin: Tanggal_Izin,
        File_Pengajuan: filename,
        Status_Pengajuan: Status_Pengajuan,
        Alasan_Penolakan: ''
      }
    );
    res.status(201).json({ msg: 'Leave Request created' });

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'intljax6@gmail.com', // Your Gmail email address
        pass: 'esxddggcmpvbfwwf', // Your Gmail email password or app password
      },
    });

    // Create an instance of your EmailContent component
    // const emailComponent = (
    //   <EmailContent
    //     ID_Mahasiswa={ID_Mahasiswa} 
    //     Jenis_Izin={Jenis_Izin} 
    //     Keterangan={Keterangan}
    //   />
    // );

    // Render the component to an HTML string
    // const emailHTML = ReactDOMServer.renderToStaticMarkup(emailComponent? emailComponent : 'Ada permohonan baru!');

    // Define your email message
    const mailOptions = {
      from: 'intljax6@gmail.com',
      to: 'jaxsix06@gmail.com',
      subject: 'New Request',
      // emailHTML,
      text: `<html>Ada pengajuan terbaru!</html>`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email: ' + error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.editLeaveRequest = async (req, res) => {

  try {
    const { id } = req.params;
    const newData = req.body;
    const whereClause = { id };

    const [updatedRowCount] = await Data_Pengajuan.patch(newData, whereClause);
    const data_pengajuan = await Data_Pengajuan.get({
      where: {
        id: id,
      }
    });

    const mahasiswa = await Data_Mahasiswa.get({
      where: { id: data_pengajuan.ID_Mahasiswa },
    });

    const kelas = await Data_Kelas.get({
      where: { id: mahasiswa.ID_Kelas },
    });

    const dosenWali = await Data_Dosen.get({
      where: {
        id: kelas.ID_Dosen_Wali,
      }
    });

    const jadwal = await Jadwal_Kelas.get({
      where: { id: data_pengajuan.ID_Jadwal_Kelas },
    });

    const dosenPengampu = await Data_Dosen.get({
      where: {
        id: jadwal.ID_Dosen,
      }
    });

    if (updatedRowCount === 0) {
      return res.status(404).json({ msg: 'LeaveRequest not found' });
    }

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'intljax6@gmail.com', // Your Gmail email address
        pass: 'esxddggcmpvbfwwf', // Your Gmail email password or app password
      },
    });

    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve('./views'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./views/'),
    };

    transporter.use('compile', hbs(handlebarOptions))

    const mailOptions = {
      from: 'intljax6@gmail.com', // sender address
      template: "emailVerify", // the name of the template file, i.e., email.handlebars
      to:mahasiswa.Email, //mahasiswa.Email,
      subject: `Update: Keputusan Terkait Pengajuan ${mahasiswa.Nama}`,
      context: {
        nama: mahasiswa.Nama,
        tanggal: data_pengajuan.Tanggal_Pengajuan,
        nim: mahasiswa.NIM,
        jenis: data_pengajuan.Jenis_Izin,
        status: data_pengajuan.Status_Pengajuan,
        dosen: dosenWali.Nama_Dosen
      },
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email: ' + error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    if(data_pengajuan.Status_Pengajuan == 'Accepted'){
        console.log('email', dosenPengampu.Email_Dosen)
        const mailOptions = {
          from: 'intljax6@gmail.com', // sender address
          template: "emailDosenPengampu", // the name of the template file, i.e., email.handlebars
          to:dosenPengampu.Email_Dosen, //mahasiswa.Email,
          context: {
            nama: mahasiswa.Nama,
            nim: mahasiswa.NIM,
            jenis: data_pengajuan.Jenis_Izin,
            keterangan: data_pengajuan.Keterangan,
          },
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error sending email: ' + error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
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

    const dosen = await Data_Dosen.get({
      where: { id: id },
    });

    if (!dosen) {
      return res.status(404).json({ message: "Data Dosen not found" });
    }

    // Ambil data kelas
    const kelas = await Data_Kelas.get({
      where: { ID_Dosen_Wali: dosen.id },
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
      dataDosen: dosen,
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

exports.getAllDataPengajuan = async (req, res) => {
  try {
    const { id } = req.params;

    const dosen = await Data_Dosen.get({
      where: { id: id },
    });

    if (!dosen) {
      return res.status(404).json({ message: "Data Dosen not found" });
    }

    // Ambil data kelas
    const kelas = await Data_Kelas.get({
      where: { ID_Dosen_Wali: dosen.id },
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

    // Ambil data Jadwal_Kelas
    const jadwal = await Jadwal_Kelas.getAll();

    // Inisialisasi struktur data untuk jumlah izin dan sakit per bulan
    const jumlahIzinPerBulan = Array(12).fill(0);
    const jumlahSakitPerBulan = Array(12).fill(0);

    // Fungsi untuk mendapatkan bulan dari tanggal
    function getMonthFromDate(date) {
      return new Date(date).getMonth();
    }

    // Fungsi untuk mendapatkan ID_Jam_Pelajaran_Start berdasarkan id_jadwal
    function getJamStart(dataJadwal, id_jadwal) {
      const jadwal = dataJadwal.find((item) => item.id === id_jadwal);
      if (jadwal) {
        return jadwal.ID_Jam_Pelajaran_Start;
      } else {
        return "NULL";
      }
    }

    // Fungsi untuk mendapatkan ID_Jam_Pelajaran_End berdasarkan id_jadwal
    function getJamEnd(dataJadwal, id_jadwal) {
      const jadwal = dataJadwal.find((item) => item.id === id_jadwal);
      if (jadwal) {
        return jadwal.ID_Jam_Pelajaran_End;
      } else {
        return "NULL";
      }
    }

    pengajuan.forEach((item) => {
      if (item.Jenis_Izin === 'Izin' && item.Status_Pengajuan === 'Accepted') {
        const bulan = getMonthFromDate(item.Tanggal_Pengajuan);
        const jamStart = getJamStart(jadwal, item.ID_Jadwal_Kelas);
        const jamEnd = getJamEnd(jadwal, item.ID_Jadwal_Kelas);
        if (jamStart !== "NULL" && jamEnd !== "NULL") {
          jumlahIzinPerBulan[bulan] += jamEnd - jamStart + 1;
        }
      }
      if (item.Jenis_Izin === 'Sakit' && item.Status_Pengajuan === 'Accepted') {
        const bulan = getMonthFromDate(item.Tanggal_Pengajuan);
        const jamStart = getJamStart(jadwal, item.ID_Jadwal_Kelas);
        const jamEnd = getJamEnd(jadwal, item.ID_Jadwal_Kelas);
        if (jamStart !== "NULL" && jamEnd !== "NULL") {
          jumlahSakitPerBulan[bulan] += jamEnd - jamStart + 1;
        }
      }
    });

    // Inisialisasi semester ganjil/genap
    const currentMonth = new Date().getMonth();
    const isOddSemester = currentMonth >= 7; // Agustus-Januari termasuk semester ganjil

    // Menambahkan nilai izin dan sakit pada semester ganjil saja
    if (isOddSemester) {
      for (let i = 0; i < jumlahIzinPerBulan.length; i++) {
        if (i % 6 >= 0 && i % 6 < 6) {
          jumlahIzinPerBulan[i] += jumlahIzinPerBulan[i % 6];
          jumlahSakitPerBulan[i] += jumlahSakitPerBulan[i % 6];
        }
      }
    }

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

    // Mengembalikan semester ganjil/genap dalam respons
    const semester = isOddSemester ? "Ganjil" : "Genap";

    res.send({
      message: "Request found successfully",
      dataDosen: dosen,
      dataKelas: formattedDataKelas,
      dataMahasiswa: mahasiswa,
      dataPengajuan: pengajuan,
      dataJadwal: jadwal,
      dataJumlahSakit: jumlahSakitPerBulan,
      dataJumlahIzin: jumlahIzinPerBulan,
      semester: semester,
    });
    console.log(req);
    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






exports.getAllDataPengajuan = async (req, res) => {
  try {
    const { id } = req.params;

    const dosen = await Data_Dosen.get({
      where: { id: id },
    });

    if (!dosen) {
      return res.status(404).json({ message: "Data Dosen not found" });
    }

    // Ambil data kelas
    const kelas = await Data_Kelas.get({
      where: { ID_Dosen_Wali: dosen.id },
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

    // Ambil data Jadwal_Kelas
    const jadwal = await Jadwal_Kelas.getAll();

    // Inisialisasi struktur data untuk jumlah izin dan sakit per bulan
    const jumlahIzinPerBulan = Array(12).fill(0);
    const jumlahSakitPerBulan = Array(12).fill(0);

    // Fungsi untuk mendapatkan bulan dari tanggal
    function getMonthFromDate(date) {
      return new Date(date).getMonth();
    }

    // Fungsi untuk mendapatkan ID_Jam_Pelajaran_Start berdasarkan id_jadwal
    function getJamStart(dataJadwal, id_jadwal) {
      const jadwal = dataJadwal.find((item) => item.id === id_jadwal);
      if (jadwal) {
        return jadwal.ID_Jam_Pelajaran_Start;
      } else {
        return "NULL";
      }
    }

    // Fungsi untuk mendapatkan ID_Jam_Pelajaran_End berdasarkan id_jadwal
    function getJamEnd(dataJadwal, id_jadwal) {
      const jadwal = dataJadwal.find((item) => item.id === id_jadwal);
      if (jadwal) {
        return jadwal.ID_Jam_Pelajaran_End;
      } else {
        return "NULL";
      }
    }

    pengajuan.forEach((item) => {
      if (item.Jenis_Izin === 'Izin' && item.Status_Pengajuan === 'Accepted') {
        const bulan = getMonthFromDate(item.Tanggal_Pengajuan);
        const jamStart = getJamStart(jadwal, item.ID_Jadwal_Kelas);
        const jamEnd = getJamEnd(jadwal, item.ID_Jadwal_Kelas);
        if (jamStart !== "NULL" && jamEnd !== "NULL") {
          jumlahIzinPerBulan[bulan] += jamEnd - jamStart + 1;
        }
      }
      if (item.Jenis_Izin === 'Sakit' && item.Status_Pengajuan === 'Accepted') {
        const bulan = getMonthFromDate(item.Tanggal_Pengajuan);
        const jamStart = getJamStart(jadwal, item.ID_Jadwal_Kelas);
        const jamEnd = getJamEnd(jadwal, item.ID_Jadwal_Kelas);
        if (jamStart !== "NULL" && jamEnd !== "NULL") {
          jumlahSakitPerBulan[bulan] += jamEnd - jamStart + 1;
        }
      }
    });

    // Inisialisasi semester ganjil/genap
    const currentMonth = new Date().getMonth();
    const isOddSemester = currentMonth >= 7; // Agustus-Januari termasuk semester ganjil

    // Menambahkan nilai izin dan sakit pada semester ganjil saja
    if (isOddSemester) {
      for (let i = 0; i < jumlahIzinPerBulan.length; i++) {
        if (i % 6 >= 0 && i % 6 < 6) {
          jumlahIzinPerBulan[i] += jumlahIzinPerBulan[i % 6];
          jumlahSakitPerBulan[i] += jumlahSakitPerBulan[i % 6];
        }
      }
    }

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

    // Mengembalikan semester ganjil/genap dalam respons
    const semester = isOddSemester ? "Ganjil" : "Genap";

    res.send({
      message: "Request found successfully",
      dataDosen: dosen,
      dataKelas: formattedDataKelas,
      dataMahasiswa: mahasiswa,
      dataPengajuan: pengajuan,
      dataJadwal: jadwal,
      dataJumlahSakit: jumlahSakitPerBulan,
      dataJumlahIzin: jumlahIzinPerBulan,
      semester: semester,
    });
    console.log(req);
    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllDataTabelPengajuan = async (req, res) => {
  try {
    const { id } = req.params;

    const dosen = await Data_Dosen.get({
      where: { id: id },
    });

    if (!dosen) {
      return res.status(404).json({ message: "Data Dosen not found" });
    }

    const kelas = await Data_Kelas.get({
      where: { ID_Dosen_Wali: dosen.id },
    });

    if (!kelas) {
      return res.status(404).json({ message: "Data Kelas not found" });
    }

    const mahasiswa = await Data_Mahasiswa.getAll({
      where: { ID_Kelas: kelas.id },
    });

    const pengajuan = await Data_Pengajuan.getAll({
      where: { ID_Mahasiswa: mahasiswa.map((mhs) => mhs.id) },
    });

    const jadwal = await Jadwal_Kelas.getAll();

    function getJamStart(dataJadwal, id_jadwal) {
      const jadwal = dataJadwal.find((item) => item.id === id_jadwal);
      if (jadwal) {
        return jadwal.ID_Jam_Pelajaran_Start;
      } else {
        return "NULL";
      }
    }

    function getJamEnd(dataJadwal, id_jadwal) {
      const jadwal = dataJadwal.find((item) => item.id === id_jadwal);
      if (jadwal) {
        return jadwal.ID_Jam_Pelajaran_End;
      } else {
        return "NULL";
      }
    }


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

    // Data Mahasiswa dan Jumlah Izin serta Jumlah Sakit
    const dataMahasiswaPengajuan = mahasiswa.map((mhs) => {
      const totalIzinMhs = pengajuan.filter((item) => item.ID_Mahasiswa === mhs.id && item.Jenis_Izin === 'Izin' && item.Status_Pengajuan === 'Accepted')
        .reduce((total, item) => {
          const jamStart = getJamStart(jadwal, item.ID_Jadwal_Kelas);
          const jamEnd = getJamEnd(jadwal, item.ID_Jadwal_Kelas);
          if (jamStart !== "NULL" && jamEnd !== "NULL") {
            total += jamEnd - jamStart + 1;
          }
          return total;
        }, 0);

      const totalSakitMhs = pengajuan.filter((item) => item.ID_Mahasiswa === mhs.id && item.Jenis_Izin === 'Sakit' && item.Status_Pengajuan === 'Accepted')
        .reduce((total, item) => {
          const jamStart = getJamStart(jadwal, item.ID_Jadwal_Kelas);
          const jamEnd = getJamEnd(jadwal, item.ID_Jadwal_Kelas);
          if (jamStart !== "NULL" && jamEnd !== "NULL") {
            total += jamEnd - jamStart + 1;
          }
          return total;
        }, 0);

      return {
        id: mhs.id, // Tambahkan ID mahasiswa
        Nama: mhs.Nama, // Ganti dengan nama field yang sesuai
        NIM: mhs.NIM, // Ganti dengan nama field yang sesuai
        JumlahIzin: totalIzinMhs,
        JumlahSakit: totalSakitMhs,
      };
    });

    res.send({
      message: "Request found successfully",
      dataDosen: dosen,
      dataKelas: formattedDataKelas,
      dataMahasiswa: mahasiswa,
      dataMahasiswaPengajuan: dataMahasiswaPengajuan, // Tambahkan dataMahasiswaPengajuan ke respons
    });

    console.log(req);
    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getAllDataPengajuanTrend = async (req, res) => {
  try {
    const { id } = req.params;

    const dosen = await Data_Dosen.get({
      where: { id: id },
    });

    if (!dosen) {
      return res.status(404).json({ message: "Data Dosen not found" });
    }

    // Ambil data kelas
    const kelas = await Data_Kelas.get({
      where: { ID_Dosen_Wali: dosen.id },
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

    // Ambil data Jadwal_Kelas
    const jadwal = await Jadwal_Kelas.getAll();

    // Inisialisasi struktur data untuk jumlah izin dan sakit per semester
    const jumlahIzinPerSemester = {
      Genap: {
        Izin: [0, 0, 0, 0, 0, 0],
        Sakit: [0, 0, 0, 0, 0, 0],
      },
      Ganjil: {
        Izin: [0, 0, 0, 0, 0, 0],
        Sakit: [0, 0, 0, 0, 0, 0],
      },
    };
    const BulanSemesterGenap = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'];
    const BulanSemeterGanjil = ['Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    // Fungsi untuk mendapatkan bulan dari tanggal
    function getMonthFromDate(date) {
      return new Date(date).getMonth();
    }

    // Fungsi untuk mendapatkan ID_Jam_Pelajaran_Start berdasarkan id_jadwal
    function getJamStart(dataJadwal, id_jadwal) {
      const jadwal = dataJadwal.find((item) => item.id === id_jadwal);
      if (jadwal) {
        return jadwal.ID_Jam_Pelajaran_Start;
      } else {
        return "NULL";
      }
    }

    // Fungsi untuk mendapatkan ID_Jam_Pelajaran_End berdasarkan id_jadwal
    function getJamEnd(dataJadwal, id_jadwal) {
      const jadwal = dataJadwal.find((item) => item.id === id_jadwal);
      if (jadwal) {
        return jadwal.ID_Jam_Pelajaran_End;
      } else {
        return "NULL";
      }
    }

    pengajuan.forEach((item) => {
      if (item.Status_Pengajuan === 'Accepted') {
        const bulan = getMonthFromDate(item.Tanggal_Pengajuan);
        const jamStart = getJamStart(jadwal, item.ID_Jadwal_Kelas);
        const jamEnd = getJamEnd(jadwal, item.ID_Jadwal_Kelas);

        if (jamStart !== "NULL" && jamEnd !== "NULL") {
          const isOddSemester = bulan >= 6;
          const semesterKey = isOddSemester ? "Ganjil" : "Genap";
          const monthIndex = isOddSemester ? bulan - 6 : bulan;

          if (item.Jenis_Izin === 'Izin') {
            jumlahIzinPerSemester[semesterKey]["Izin"][monthIndex] += jamEnd - jamStart + 1;
          } else if (item.Jenis_Izin === 'Sakit') {
            jumlahIzinPerSemester[semesterKey]["Sakit"][monthIndex] += jamEnd - jamStart + 1;
          }
        }
      }
    });

    // Mengembalikan semester ganjil/genap dalam respons
    const currentMonth = new Date().getMonth();
    const isOddSemester = currentMonth >= 6;
    const semester = isOddSemester ? "Ganjil" : "Genap";

    const dataJumlahIzinGenap = jumlahIzinPerSemester["Genap"]["Izin"];
    const dataJumlahIzinGanjil = jumlahIzinPerSemester["Ganjil"]["Izin"];
    const dataJumlahSakitGenap = jumlahIzinPerSemester["Genap"]["Sakit"];
    const dataJumlahSakitGanjil = jumlahIzinPerSemester["Ganjil"]["Sakit"];

    // Formatting data kelas
    const currentYear = new Date().getFullYear();
    let angka_kelas;
    if (new Date().getMonth() >= 6) {
      angka_kelas = currentYear - kelas.Tahun_Ajaran;
    } else {
      angka_kelas = currentYear - kelas.Tahun_Ajaran - 1;
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
      message: "Request found successfully",
      dataDosen: dosen,
      dataKelas: formattedDataKelas,
      dataMahasiswa: mahasiswa,
      dataPengajuan: pengajuan,
      dataJadwal: jadwal,
      // dataJumlahSakit: jumlahSakitPerSemester[isOddSemester ? 1 : 0],
      // dataJumlahIzin: jumlahIzinPerSemester[isOddSemester ? 1 : 0],
      semester: semester,
      dataBulanGenap: BulanSemesterGenap,
      dataBulanGanjil: BulanSemeterGanjil,
      dataJumlahIzinGenap,
      dataJumlahIzinGanjil,
      dataJumlahSakitGenap,
      dataJumlahSakitGanjil,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getCountOfLeaveRequests = async (req, res) => {
  try {
    const { jenis, IDProdi } = req.params;

    let prodi = '';

    if (IDProdi === '1') {
      prodi = 'D3';
    } else if (IDProdi === '2') {
      console.log('//////////////////////////////////////////////ini id', IDProdi);
      prodi = 'D4';
    }

    const jmlPengajuan = Array.from({ length: 6 }, () => 0);

    let namaBulan = [];

    const currentMonth = new Date().getMonth();

    // Mengecek dari bulan januari
    let month = 0;

    if (currentMonth > 6) {
      namaBulan = [
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
      ]

      month = 7;
    } else {
      namaBulan = [
        'Jan',
        'Feb',
        'March',
        'April',
        'May',
        'June'
      ];

      month = 1;
    }

    // Mendapatkan tahun sekarang
    const currentYear = new Date().getFullYear();

    const kelas = await Data_Kelas.getAllWhere({
      where: {
        Nama_Kelas: {
          [Op.like]: `%${prodi}`
        }
      }
    });

    // Fungsi untuk mendapatkan ID_Jam_Pelajaran_Start berdasarkan id_jadwal
    function getJamStart(dataJadwal, id_jadwal) {
      const jadwal = dataJadwal.find((item) => item.id === id_jadwal);
      if (jadwal) {
        return jadwal.ID_Jam_Pelajaran_Start;
      } else {
        return "NULL";
      }
    }

    // Fungsi untuk mendapatkan ID_Jam_Pelajaran_End berdasarkan id_jadwal
    function getJamEnd(dataJadwal, id_jadwal) {
      const jadwal = dataJadwal.find((item) => item.id === id_jadwal);
      if (jadwal) {
        return jadwal.ID_Jam_Pelajaran_End;
      } else {
        return "NULL";
      }
    }

    const mahasiswa = await Data_Mahasiswa.getAll({
      where: { ID_Kelas: kelas.map((kls) => kls.id) },
    });

    //Cek bulan untuk memisahkan semester
    while (month <= 12 && month >= 1) {
      // Tanggal awal bulan
      let startDate = new Date(currentYear, month, 1);

      // Tanggal akhir bulan
      let endDate = new Date(currentYear, month, 31);

      const dataPengajuan = await Data_Pengajuan.getAll({
        where: {
          ID_Mahasiswa: mahasiswa.map((mhs) => mhs.id),
          Tanggal_Izin: {
            [Op.and]: [
              { [Op.gte]: startDate }, // Tanggal izin >= tanggal awal Januari
              { [Op.lte]: endDate } // Tanggal izin <= tanggal akhir Januari
            ]
          },
          Status_Pengajuan: 'Accepted',
          Jenis_Izin: jenis
        }
      });

      // Ambil data pengajuan berdasarkan ID_Mahasiswa
      const jadwal = await Jadwal_Kelas.getAll({
        where: {
          id: dataPengajuan.map((pengajuan) => pengajuan.ID_Jadwal_Kelas)
        },
      });

      let jmlPengajuanPerJP = 0;

      if (dataPengajuan) {
        dataPengajuan.forEach((item) => {
          if (item.Status_Pengajuan === 'Accepted') {
            const jamStart = getJamStart(jadwal, item.ID_Jadwal_Kelas);
            const jamEnd = getJamEnd(jadwal, item.ID_Jadwal_Kelas);

            if (jamStart !== "NULL" && jamEnd !== "NULL") {
              jmlPengajuanPerJP += jamEnd - jamStart;
            }
          }
        });

        if (currentMonth > 6) {
          jmlPengajuan[month - 6] = jmlPengajuanPerJP;
        } else {
          jmlPengajuan[month] = jmlPengajuanPerJP;
        }
      }

      month += 1;
    }

    if (jmlPengajuan) {
      res.send({
        message: "Leave Requests found successfully",
        months: namaBulan,
        data: jmlPengajuan
      })
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteLeaveRequest = async (req, res) => {
  try {
    const whereClause = { id: req.params.id }; // Contoh: menghapus data berdasarkan ID
    const deletedRowCount = await Data_Pengajuan.delete(whereClause);

    if (deletedRowCount === 0) {
      return res.status(404).json({ msg: 'Leave Request not found' });
    } else {
      res.status(200).json({ msg: 'Leave Request deleted' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getCountOfLeaveRequestsTable = async (req, res) => {
  try {
    const { IDProdi } = req.params;

    const jmlPengajuan = Array.from({ length: 6 }, () => 0);

    let namaBulan = [];

    let prodi = '';

    if (IDProdi === '1') {
      prodi = 'D3';
    } else if (IDProdi === '2') {
      console.log('//////////////////////////////////////////////ini id', IDProdi);
      prodi = 'D4';
    }

    const currentMonth = new Date().getMonth();

    // Mengecek dari bulan januari

    let jmlPengajuanKelas = [];

    const jenisSurat = ['Sakit', 'Izin'];

    // Mendapatkan tahun sekarang
    const currentYear = new Date().getFullYear();

    const kelas = await Data_Kelas.getAllWhere({
      where: {
        Nama_Kelas: {
          [Op.like]: `%${prodi}`
        }
      }
    });

    // Fungsi untuk mendapatkan ID_Jam_Pelajaran_Start berdasarkan id_jadwal
    function getJamStart(dataJadwal, id_jadwal) {
      const jadwal = dataJadwal.find((item) => item.id === id_jadwal);
      if (jadwal) {
        return jadwal.ID_Jam_Pelajaran_Start;
      } else {
        return "NULL";
      }
    }

    // Fungsi untuk mendapatkan ID_Jam_Pelajaran_End berdasarkan id_jadwal
    function getJamEnd(dataJadwal, id_jadwal) {
      const jadwal = dataJadwal.find((item) => item.id === id_jadwal);
      if (jadwal) {
        return jadwal.ID_Jam_Pelajaran_End;
      } else {
        return "NULL";
      }
    }

    let mahasiswa = [];

    let i = 0;

    for (i = 0; i < kelas.length; i++) {
      mahasiswa[i] = await Data_Mahasiswa.getAllWhere({
        where: { ID_Kelas: kelas[i].id },
      });
    }

    for (let i = 0; i < kelas.length; i++) {
      let jmlPengajuanSakit = 0;
      let jmlPengajuanIzin = 0;
      jmlPengajuanKelas[i] = [];
      let angkaKelas = 0;

      if (currentMonth > 6) {
        angkaKelas = currentYear - kelas[i].Tahun_Ajaran + 1;
      } else {
        angkaKelas = currentYear - kelas[i].Tahun_Ajaran;
      }

      const tingkat = angkaKelas.toString();

      for (let j = 0; j < 2; j++) {
        let month = 0;

        if (currentMonth > 6) {
          month = 7;
        } else {
          namaBulan =
            month = 1;
        }
        //Cek bulan untuk memisahkan semester
        while (month <= 12 && month >= 1) {
          // Tanggal awal bulan
          let startDate = new Date(currentYear, month, 1);

          // Tanggal akhir bulan
          let endDate = new Date(currentYear, month, 31);

          const dataPengajuan = await Data_Pengajuan.getAll({
            where: {
              ID_Mahasiswa: mahasiswa[i].map((mhs) => mhs.id),
              Tanggal_Izin: {
                [Op.and]: [
                  { [Op.gte]: startDate }, // Tanggal izin >= tanggal awal Januari
                  { [Op.lte]: endDate } // Tanggal izin <= tanggal akhir Januari
                ]
              },
              Status_Pengajuan: 'Accepted',
              Jenis_Izin: jenisSurat[j]
            }
          });

          // Ambil data pengajuan berdasarkan ID_Mahasiswa
          const jadwal = await Jadwal_Kelas.getAll({
            where: {
              id: dataPengajuan.map((pengajuan) => pengajuan.ID_Jadwal_Kelas)
            },
          });

          let jmlPengajuanPerJP = 0;

          if (dataPengajuan) {
            dataPengajuan.forEach((item) => {
              if (item.Status_Pengajuan === 'Accepted') {
                const jamStart = getJamStart(jadwal, item.ID_Jadwal_Kelas);
                const jamEnd = getJamEnd(jadwal, item.ID_Jadwal_Kelas);

                if (jamStart !== "NULL" && jamEnd !== "NULL") {
                  jmlPengajuanPerJP += jamEnd - jamStart;
                  console.log('////////////////////////////////////////////////////////////////////', j)
                }
              }
            });

            if (j == 0) {
              jmlPengajuanSakit += jmlPengajuanPerJP;
            } else if (j == 1) {
              jmlPengajuanIzin += jmlPengajuanPerJP;
            }

            month += 1;
          }
        }
      }

      jmlPengajuanKelas[i].push({
        Nama_Kelas: tingkat + kelas[i].Nama_Kelas[0] + "-" + kelas[i].Nama_Kelas.slice(1),
        Sakit: jmlPengajuanSakit,
        Izin: jmlPengajuanIzin,
      });
    }

    // //Cek bulan untuk memisahkan semester
    // while (month <= 12 && month >=1){
    //   // Tanggal awal bulan
    //   let startDate = new Date(currentYear, month, 1); 

    //   // Tanggal akhir bulan
    //   let endDate = new Date(currentYear, month, 31); 

    //   const dataPengajuan = await Data_Pengajuan.getAll({
    //     where: {
    //       ID_Mahasiswa: mahasiswa.map((mhs) => mhs.id),
    //       Tanggal_Izin: {
    //         [Op.and]: [
    //           { [Op.gte]: startDate }, // Tanggal izin >= tanggal awal Januari
    //           { [Op.lte]: endDate } // Tanggal izin <= tanggal akhir Januari
    //         ]
    //       },
    //       Status_Pengajuan: 'Accepted',
    //       Jenis_Izin: jenis
    //     }
    //   });

    //   console.log ('data pengajuan per prodi: ', dataPengajuan);

    //   // Ambil data pengajuan berdasarkan ID_Mahasiswa
    //   const jadwal = await Jadwal_Kelas.getAll({
    //     where: { 
    //       id: dataPengajuan.map((pengajuan) => pengajuan.ID_Jadwal_Kelas) 
    //     },
    //   });

    //   console.log ('data jadwal per prodi: ', jadwal);

    //   let jmlPengajuanPerJP = 0;

    //   if (dataPengajuan) {
    //     dataPengajuan.forEach((item) => {
    //       if (item.Status_Pengajuan === 'Accepted') {
    //         const jamStart = getJamStart(jadwal, item.ID_Jadwal_Kelas);
    //         const jamEnd = getJamEnd(jadwal, item.ID_Jadwal_Kelas);

    //         console.log('/////////////////////////////////////////////////', jamStart, jamEnd);

    //         if (jamStart !== "NULL" && jamEnd !== "NULL") {
    //           jmlPengajuanPerJP += jamEnd - jamStart;
    //         }
    //       }
    //     });

    //     if (currentMonth > 6){
    //       jmlPengajuan[month-6]  = jmlPengajuanPerJP;
    //     } else {
    //       jmlPengajuan[month]  = jmlPengajuanPerJP;
    //     }
    //   }

    //   month += 1;
    // }

    console.log(jmlPengajuanKelas);

    if (jmlPengajuanKelas) {
      res.send({
        message: "Leave Requests found successfully",
        data: jmlPengajuanKelas
      })
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Internal Server Error' });
  }
};