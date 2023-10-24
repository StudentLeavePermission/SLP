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
    const {NIM, Nama, Password, Nomor_Telp, Email, ID_Kelas, Nama_Ortu, Nomor_Telp_Ortu, Foto_Profil} = req.body;
    const data = {
      NIM,
      Nama,
      Password: await bcrypt.hash(Password, 10),
      Nomor_Telp,
      Email,
      ID_Kelas,
      Nama_Ortu,
      Nomor_Telp_Ortu,
      Foto_Profil
    };
    const mhs = await Data_Mahasiswa.post(data);

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



module.exports = {
  getAllStudents,
  getStudent,
  loginStudent,
  registerStudent,
  protectedContent,
  logoutStudent,
  editStudent,
  getStudentId
}