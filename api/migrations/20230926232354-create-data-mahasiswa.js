'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Data_Mahasiswa', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      NIM: {
        type: Sequelize.INTEGER
      },
      Nama: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      Nomor_Telp: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      ID_Kelas: {
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
    await queryInterface.dropTable('Data_Mahasiswa');
  }
};