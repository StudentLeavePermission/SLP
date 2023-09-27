'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Data_Pengajuan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Keterangan: {
        type: Sequelize.TEXT
      },
      Tanggal_Pengajuan: {
        type: Sequelize.DATE
      },
      Tanggal_Izin: {
        type: Sequelize.DATE
      },
      Class_Schedule_ID: {
        type: Sequelize.INTEGER
      },
      Jenis_Izin: {
        type: Sequelize.ENUM('Sakit', 'Izin'),
      },
      Status_Pengajuan: {
        type: Sequelize.ENUM('Drafted', 'Delivered', 'On Progress', 'Accepted', 'Rejected'),
      },
      ID_Mahasiswa: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Data_Pengajuan');
  }
};