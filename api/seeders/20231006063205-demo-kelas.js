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
    await queryInterface.bulkInsert('Data_Kelas', [{
      Nama_Kelas: '1AD3',
      ID_Dosen_Wali: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Kelas: '1BD3',
      ID_Dosen_Wali: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Kelas: '1AD4',
      ID_Dosen_Wali: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Kelas: '1BD4',
      ID_Dosen_Wali: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('People', null, {});
  }
};
