// const Data_Dosen_Wali = require('../models/models/dataDosenWali');
const path = require('path');
const basename = path.basename(__filename);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {mainModel} = require('../common/models');
const Data_Dosen_Wali = new mainModel("Data_Dosen_Wali");

// Get all adviser lecturers
exports.getAllAdviserLecturers = async (req, res) => {
  try {
    const adviserLecturers = await Data_Dosen_Wali.getAll();
    // res.json(adviserLecturers);
    res.send({
      message: "Adviser Lecturers sent successfully",
      data: adviserLecturers
    });
    console.log("\x1b[1m" + "[" + basename + "]" + "\x1b[0m" + " Query " + "\x1b[34m" + "GET (all) " + "\x1b[0m" + "done");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.loginAdviserLecturer = async (req, res) => {
  try {
    const {Email_Dosen, Password} = req.body;
    const dosenWali = await Data_Dosen_Wali.get(Email_Dosen);
    const passwordMatch = await bcrypt.compare(Password, dosenWali.Password);
    if (!dosenWali || !passwordMatch) {
      return res.status(401).json({message: 'Invalid username or password'});
    }
    const token = jwt.sign({userId: dosenWali.Email_Dosen}, 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
  }
};

exports.registerAdviserLecturer = async (req, res) => {
  try {
    const {Email_Dosen, Password} = req.body;
    const dosenWali = await Data_Dosen_Wali.get(Email_Dosen);
    const passwordMatch = await bcrypt.compare(Password, dosenWali.Password);
    if (!dosenWali || !passwordMatch) {
      return res.status(401).json({message: 'Invalid username or password'});
    }
    const token = jwt.sign({userId: dosenWali.Email_Dosen}, 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
  }
};
