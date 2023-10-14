'use strict';

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
    await queryInterface.bulkInsert('Data_Pengajuan', [{
      ID_Mahasiswa: 1,
      Keterangan: 'Sakit',
      Jenis_Izin: 'Sakit',
      ID_Jadwal_Kelas: 1,
      Tanggal_Pengajuan: new Date(),
      Tanggal_Izin: new Date(),
      File_Pengajuan: 'file.pdf',
      Status_Pengajuan: 'Accepted',
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
     */
    await queryInterface.bulkDelete('Data_Pengajuan', null, {})
  }
};
