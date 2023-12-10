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
    await queryInterface.bulkInsert('Data_Mahasiswa', [
      {
      NIM: 221511001,
      Nama: 'Agam Andika',
      Password: await bcrypt.hash('Agam', 10),
      Nomor_Telp: '0895344350956',
      Email: 'agam.andika.tif22@polban.ac.id',
      ID_Kelas: 1,
      Nama_Ortu: 'Asep',
      Nomor_Telp_Ortu: '0895344350956',
      // Nomor_Telp_Ortu: '085551121127',
      Foto_Profil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      NIM: 221511004,
      Nama: 'Aulia Aziizah Fauziyyah',
      Password: await bcrypt.hash('Aulia', 10),
      Nomor_Telp: '081222875167',
      Email: 'aulia.aziizah.tif22@polban.ac.id',
      ID_Kelas: 1,
      Nama_Ortu: 'Rodiah',
      Nomor_Telp_Ortu: '081394433922',
      Foto_Profil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      NIM: 221511010,
      Nama: 'Fauza Naylassana',
      Password: await bcrypt.hash('Fauza', 10),
      Nomor_Telp: '085939272379',
      Email: 'fauza.naylassana.tif22@polban.ac.id',
      ID_Kelas: 1,
      Nama_Ortu: 'Indah',
      Nomor_Telp_Ortu: '081298060900',
      Foto_Profil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      NIM: 221511020,
      Nama: 'Muhammad Difa Algifary',
      Password: await bcrypt.hash('Difa', 10),
      Nomor_Telp: '087746503986',
      Email: 'muhammad.difa.tif22@polban.ac.id',
      ID_Kelas: 1,
      Nama_Ortu: 'Rahmat Agung',
      Nomor_Telp_Ortu: '081321274123',
      Foto_Profil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      NIM: 221511021,
      Nama: 'Muhammad Jalaludin Qurtubi',
      Password: await bcrypt.hash('Jalal', 10),
      Nomor_Telp: '088219868510',
      Email: 'muhammad.jalaludin.tif22@polban.ac.id',
      ID_Kelas: 1,
      Nama_Ortu: 'Titin',
      Nomor_Telp_Ortu: '088219868510',
      Foto_Profil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      NIM: 221511025,
      Nama: 'Nisrina Wafa Zakiya Hamdani',
      Password: await bcrypt.hash('Nisrina', 10),
      Nomor_Telp: '0881023849115',
      Email: 'nisrina.wafa.tif22@polban.ac.id',
      ID_Kelas: 1,
      Nama_Ortu: 'Denih Hamdani',
      Nomor_Telp_Ortu: '081325297729',
      Foto_Profil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      NIM: 211524063,
      Nama: 'Syifa Khairina',
      Password: await bcrypt.hash('Syifa', 10),
      Nomor_Telp: '087878876632',
      Email: 'syifa.kahirina.tif21@polban.ac.id',
      ID_Kelas: 3,
      Nama_Ortu: 'Indah',
      Nomor_Telp_Ortu: '081298060900',
      Foto_Profil: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Data_Mahasiswa', null, {});
  }
};