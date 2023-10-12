'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Data_Mahasiswa', [{
      NIM: 221511001,
      Nama: 'Agam Andika',
      Password: bcrypt.hash('Agam Gemblong', 10),
      Nomor_Telp: '088888888888',
      Nomor_Telp_Ortu: '088888888888',
      Email: 'agamganteng@polban.ac.id',
      ID_Kelas: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      NIM: 221511002,
      Nama: 'Aryagara Kristandy Rukaman Putra',
      Password: bcrypt.hash('Arya Gemblong', 10),
      Nomor_Telp: '088888888888',
      Nomor_Telp_Ortu: '088888888888',
      Email: 'aryajelek@polban.ac.id',
      ID_Kelas: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      NIM: 221511003,
      Nama: 'Athalie Aurora Puspanegara',
      Password: bcrypt.hash('Auouououo', 10),
      Nomor_Telp: '088888888888',
      Nomor_Telp_Ortu: '088888888888',
      Email: 'athalieauououo@polban.ac.id',
      ID_Kelas: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      NIM: 221511034,
      Nama: 'Adinda',
      Password: bcrypt.hash('Adinda Wakwaw', 10),
      Nomor_Telp: '088888888888',
      Nomor_Telp_Ortu: '088888888888',
      Email: 'adindakelasbe@polban.ac.id',
      ID_Kelas: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      NIM: 221511035,
      Nama: 'Adhiya',
      Password: bcrypt.hash('Adhiya Icikiwir', 10),
      Nomor_Telp: '088888888888',
      Nomor_Telp_Ortu: '088888888888',
      Email: 'adhiyakelasbejuga@polban.ac.id',
      ID_Kelas: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      NIM: 221511036,
      Nama: 'Afyar',
      Password: bcrypt.hash('Afyar Blubukblubuk', 10),
      Nomor_Telp: '088888888888',
      Nomor_Telp_Ortu: '088888888888',
      Email: 'afyarkelasbelagi@polban.ac.id',
      ID_Kelas: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */await queryInterface.bulkDelete('Data_Mahasiswa', null, {});
  }
};
