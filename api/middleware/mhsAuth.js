//importing modules
const express = require("express");
const db = require("../models/models");
//Assigning db.users to User variable
const Mhs = db.Data_Mahasiswa;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
const saveUser = async (req, res, next) => {
    //search the database to see if user exist
    try {
        const username = await Mhs.findOne({
            where: {
                NIM: req.body.NIM,
            },
        });
        //if username exist in the database respond with a status of 409
        if (username) {
            return res.json(409).send("NIM already exists");
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

//exporting module
module.exports = {
    saveUser,
};