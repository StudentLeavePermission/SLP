// const Data_Mahasiswa = require('../models/models/dataMahasiswa');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const basename = path.basename(__filename);
const {mainModel} = require('../common/models');
const Data_Mahasiswa = new mainModel("Data_Mahasiswa");

// Get all students
exports.getAllStudents = async (req, res) => {
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

exports.loginStudent = async (req, res) => {
  try {
    // const {NIM, Password} = req.body;
    const mhs = await Data_Mahasiswa.get({
      where: {
        NIM: req.body.NIM
      }
    });
    
    if (mhs) {
      const isSame = await bcrypt.compare(req.body.Password, mhs.Password);

      if (isSame) {
        let token = jwt.sign({ id: mhs.id }, 'secretKey', { expiresIn: '1h' });

        res.cookie("jwt", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
        console.log("Mahasiswa: ", JSON.stringify(mhs, null, 2));
        console.log(token);
        return res.status(201).send(mhs);
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

exports.registerStudent = async (req, res) => {
  try {
    const {NIM, Password} = req.body;
    const data = {
      NIM,
      Password: await bcrypt.hash(Password, 10)
    };
    const mhs = await Data_Mahasiswa.post(data);
    if (mhs) {
      let token = jwt.sign({ id: mhs.id }, 'secretKey', { expiresIn: '1h' });

      res.cookie('jwt', token, { maxAge: 2*60*60*1000, httpOnly: true });
      console.log("Mahasiswa: ", JSON.stringify(mhs, null, 2));
      console.log(token);
      return res.status(201).send(mhs); 
    } else {
      return res.status(409).send('Incorrect details');
    }
  } catch (error) {
    console.error(error);
  }
};
