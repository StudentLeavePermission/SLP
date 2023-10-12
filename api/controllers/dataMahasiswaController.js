// const Data_Mahasiswa = require('../models/models/dataMahasiswa');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Data_Mahasiswa = new mainModel("Data_Mahasiswa");

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Data_Mahasiswa.getAll();
    // res.json(students);
    res.send({
      message: "Students sent successfully",
      data: students
    });
    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
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
      // console.log(Password + ", " + mhs.Password + ", isSame = " + isSame);

      if (isSame) {
        let token = jwt.sign({ id: mhs.id }, 'secretKey', { expiresIn: '1h' });

        // res.cookie("access_token", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
        // console.log("Mahasiswa: ", JSON.stringify(mhs, null, 2));
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
    const {NIM, Nama, Password, Nomor_Telp, Email, ID_Kelas} = req.body;
    const data = {
      NIM,
      Nama,
      Password: await bcrypt.hash(Password, 10),
      Nomor_Telp,
      Email,
      ID_Kelas
    };
    const mhs = await Data_Mahasiswa.post(data);
    if (mhs) {
      let token = jwt.sign({ id: mhs.id }, 'secretKey', { expiresIn: '1h' });

      // res.cookie('access_token', token, { maxAge: 2*60*60*1000, httpOnly: true });
      // console.log("Mahasiswa: ", JSON.stringify(mhs, null, 2));
      console.log(token);
      return res.cookie('access_token', token, { maxAge: 2*60*60*1000, httpOnly: true }).status(201).json("Register success"); 
    } else {
      return res.status(409).send('Incorrect details');
    }
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

module.exports = {
  getAllStudents,
  getStudent,
  loginStudent,
  registerStudent,
  protectedContent,
  logoutStudent
}