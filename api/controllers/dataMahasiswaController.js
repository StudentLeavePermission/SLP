// const Data_Mahasiswa = require('../models/models/dataMahasiswa');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Data_Mahasiswa = new mainModel("Data_Mahasiswa");
const Data_Kelas = new mainModel("Data_Kelas");
const Data_Dosen_Wali = new mainModel("Data_Dosen_Wali");
const Data_Dosen = new mainModel("Data_Dosen");
const Data_Pengajuan = new mainModel("Data_Pengajuan");
const Jadwal_Kelas = new mainModel("Jadwal_Kelas");
const sq = require('sequelize');
const excel = require("exceljs");
// Get all students

function generatePassword() {
  // Bagian awal password
  const prefix = "*Polbanjtk";

  // Mendapatkan angka acak antara 1000 hingga 9999
  const randomDigits = Math.floor(1000 + Math.random() * 9000);

  // Bagian akhir password
  const suffix = "#";

  // Menggabungkan semua bagian untuk membuat password
  const password = `${prefix}${randomDigits}${suffix}`;

  return password;
}

const getAllStudents = async (req, res) => {
  try {
    const students = await Data_Mahasiswa.getAll();
    
    // Membuat objek untuk memetakan ID_Kelas ke Nama_Kelas
    const kelasMap = {};
    
    // Mengambil data kelas
    const kelas = await Data_Kelas.getAll();
    const AllKelas = await Data_Kelas.getAll();
    // Mengisi objek kelasMap dengan ID_Kelas dan Nama_Kelas
    kelas.forEach((kelasItem) => {
      kelasMap[kelasItem.ID_Kelas] = kelasItem.Nama_Kelas;
    });

    // Mengganti ID_Kelas dengan Nama_Kelas dalam setiap baris mahasiswa
    const studentsWithKelas = await Promise.all(students.map(async (student) => {
      const kelas = await Data_Kelas.get({
        where: { id: student.ID_Kelas }
      });

      
    
      return {
        id : student.id,
        NIM: student.NIM,
        Nama: student.Nama,
        ID_Kelas: student.ID_Kelas,
        Kelas: kelas,

      };
    }));



    res.send({
      message: "Students sent successfully",
      data: studentsWithKelas, AllKelas
    });

    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
    console.log("Students with Kelas:", studentsWithKelas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





const getStudent = async (req, res) => {
  try {
    const { id } = req.params; // Assuming NIM is passed as a route parameter
    const student = await Data_Mahasiswa.get({
      where: { id: id },
    });
    const kelas = await Data_Kelas.get({
      where:{id: student.ID_Kelas}
    })

    const Wali = await Data_Dosen_Wali.get({
      where:{id: kelas.ID_Dosen_Wali}
    });

    const WaliDosen = await Data_Dosen.get({
      where:{id: Wali.ID_Dosen}
    });

    if (student) {
      // Mendapatkan firstPart dan secondPart dari Nama_Kelas
      const NKelas = (kelas.Nama_Kelas).slice(0, -2); // Mengambil semua karakter kecuali yang terakhir
      const prodi = (kelas.Nama_Kelas).slice(-2); // Mengambil karakter terakhir

      res.send({
        message: "Student found successfully",
        data: student,
        kelas: {
          kelas,
          Nama_kelas: NKelas,
          prodi: prodi
        },
        WaliDosen :WaliDosen,

      });
      console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getStudentId = async (req, res) => {
  try {
    const { NIM } = req.params; // Assuming NIM is passed as a route parameter
    const student = await Data_Mahasiswa.get({
      where: { NIM : NIM },
    });

    if (student) {
      res.send({
        message: "Student found successfully",
        data: student,
      });
      console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (one) " + "\x1b[0m" + "done");
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const loginStudent = async (req, res) => {
  
  try {
    const {NIM, Password} = req.body;
    const mhs = await Data_Mahasiswa.get({
      where: {
        NIM: NIM
      }
    });
    
    if (mhs) {
      const isSame = await bcrypt.compare(Password, mhs.Password);
      console.log(Password + ", " + mhs.Password + ", isSame = " + isSame);

      if (isSame) {
        let token = jwt.sign({ id: mhs.id }, 'secretKey', { expiresIn: '1h' });
        console.log("Mahasiswa: ", JSON.stringify(mhs, null, 2));
        console.log(token);
        return res.cookie("access_token", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true }).status(201).json("Login success");
      } else {
        return res.status(401).send('Authentication Failed');
      }
    } else {
      return res.status(401).send('Authentication Failed');
    }
  } catch (error) {
    console.error(error);
  }
};

const registerStudent = async (req, res) => {
  try {
 
    
    Password = generatePassword();
    const {NIM, Nama, Nomor_Telp, Email, ID_Kelas, Nama_Ortu, Nomor_Telp_Ortu, Foto_Profil} = req.body;
    
    const data = {
      NIM,
      Nama : Nama,
      Password: await bcrypt.hash(Password, 10),
      Nomor_Telp,
      Email,
      ID_Kelas,
      Nama_Ortu,
      Nomor_Telp_Ortu,
      Foto_Profil
    };
    const mhs = await Data_Mahasiswa.post(data);
    await data.save();
  } catch (error) {
    console.error(error);
  }
};

const protectedContent = async (req, res) => {
  return res.json({ user: { NIM: req.NIM, Nama: req.Nama } });
}

const logoutStudent = async (req, res) => {
  return res.clearCookie('access_token').status(200).json({ message: 'Logged out' });
}

const editStudent = async (req, res) => {
  try {
    const { id } = req.params; // Assuming NIM is passed as a route parameter
    const student = await Data_Mahasiswa.get({
      where: { id: id },
    });

    if (!student) {
      return res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
    }




    // Menangani data lainnya
    const { Nomor_Telp, Nomor_Telp_Ortu } = req.body;
    const filename = req.body.filename;
    student.Foto_Profil = filename;
    student.Nomor_Telp = Nomor_Telp;
    student.Nomor_Telp_Ortu = Nomor_Telp_Ortu;

    await student.save();


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const exportExcel = (req, res) => {
  Data_Mahasiswa.getAll().then((dataMahasiswas) => {
    let mahasiswas = [];

    dataMahasiswas.forEach((mahasiswa) => {
      mahasiswas.push({
        NIM: mahasiswa.NIM,
        Nama: mahasiswa.Nama,
        Nomor_Telp: mahasiswa.Nomor_Telp,
        Email: mahasiswa.Email,
        ID_Kelas: mahasiswa.ID_Kelas,
        Nama_Ortu: mahasiswa.Nama_Ortu,
        Nomor_Telp_Ortu: mahasiswa.Nomor_Telp_Ortu,
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Data_Mahasiswa");

    worksheet.columns = [
      { header: "NIM", key: "NIM", width: 10 },
      { header: "Nama", key: "Nama", width: 25 },
      { header: "Nomor_Telp", key: "Nomor_Telp", width: 15 },
      { header: "Email", key: "Email", width: 20 },
      { header: "ID_Kelas", key: "ID_Kelas", width: 10 },
      { header: "Nama_Ortu", key: "Nama_Ortu", width: 25 },
      { header: "Nomor_Telp_Ortu", key: "Nomor_Telp_Ortu", width: 15 },
    ];

    // Add Array Rows
    worksheet.addRows(mahasiswas);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "data_mahasiswa.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
};

const importStudentsFromExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const buffer = req.file.buffer; // Mengambil buffer dari file yang diunggah
    const workbook = new excel.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1);

    worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row

      const studentData = {
        NIM: row.getCell(1).value,
        Nama: 'ahaha',
        Password: row.getCell(3).value, // Anda mungkin ingin mengenkripsi ini
        Nomor_Telp: row.getCell(4).value,
        Email: row.getCell(5).value,
        ID_Kelas: row.getCell(6).value,
        Nama_Ortu: row.getCell(7).value,
        Nomor_Telp_Ortu: row.getCell(8).value,
        Foto_Profil: row.getCell(9).value,
      };

      try {
        await Data_Mahasiswa.post(studentData);
        console.log(`Student data imported: ${JSON.stringify(studentData)}`);
      } catch (error) {
        console.error(`Error importing student data: ${JSON.stringify(studentData)}`);
      }
    });

    res.status(200).json({ message: 'Data imported from uploaded Excel file successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const RekapIzin = async (req, res) => {
  try {
    // Ambil data dari tabel "Data_Mahasiswa"
    const students = await Data_Mahasiswa.getAll();
    const jadwal = await Jadwal_Kelas.getAll();

    // Ambil hasil rekap izin
    const results = await Data_Pengajuan.getJustGroup({
      attributes: [
        'ID_Mahasiswa',
        'ID_Jadwal_Kelas', // Tambahkan ID_Jadwal_Kelas
        [sq.fn('SUM', sq.literal('CASE WHEN "Jenis_Izin" = \'Sakit\' THEN 1 ELSE 0 END')), 'count_sakit'],
        [sq.fn('SUM', sq.literal('CASE WHEN "Jenis_Izin" = \'Izin\' THEN 1 ELSE 0 END')), 'count_izin'],
      ],
      group: ['ID_Mahasiswa', 'ID_Jadwal_Kelas'], // Cocokkan dengan ID_Mahasiswa dan ID_Jadwal_Kelas
    });

    // Cocokkan data dengan ID_Mahasiswa
    const mergedResults = results.map((result) => {
      const matchingStudent = students.find((student) => student.id === result.ID_Mahasiswa);
      const matchingJadwal = jadwal.find((jadwal) => jadwal.id === result.ID_Jadwal_Kelas);

      return {
        ...result.dataValues,
        Mahasiswa: matchingStudent || null,
        Jadwal_Kelas: matchingJadwal || null, // Menambahkan data jadwal kelas jika ditemukan, jika tidak, gunakan null
      };
    });

    

    console.log(mergedResults);
    res.send({
      message: "Rekap Izin sent successfully",
      data: mergedResults,
      
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


const RekapIzinDetail = async (req, res) => {
  try {
    const { id } = req.params; 
    // Ambil data dari tabel "Data_Mahasiswa"
    const students = await Data_Mahasiswa.getAll();

    // Ambil hasil rekap izin
    const results = await Data_Pengajuan.getAllWhere({
      where:{ ID_Mahasiswa: id }
    });

    // Cocokkan data dengan ID_Mahasiswa
    const mergedResults = results.map((result) => {
      const matchingStudent = students.find((student) => student.id === result.ID_Mahasiswa);
      return {
        ...result.dataValues,
        Mahasiswa: matchingStudent || null, // Menambahkan data mahasiswa jika ditemukan, jika tidak, gunakan null
      };
    });

    console.log(mergedResults);
    res.send({
      message: "Rekap Izin sent successfully",
      data: mergedResults,
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  getAllStudents,
  getStudent,
  loginStudent,
  registerStudent,
  protectedContent,
  logoutStudent,
  editStudent,
  getStudentId,
  exportExcel,
  importStudentsFromExcel,
  RekapIzin,
  RekapIzinDetail
}