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
    await queryInterface.bulkInsert('Data_Dosen_Wali', [{
      Password: await bcrypt.hash('12345678', 10),
      ID_Dosen: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Password: await bcrypt.hash('12345678', 10),
      ID_Dosen: 17,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Password: await bcrypt.hash('12345678', 10),
      ID_Dosen: 18,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Password: await bcrypt.hash('12345678', 10),
      ID_Dosen: 21,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Password: await bcrypt.hash('12345678', 10),
      ID_Dosen: 27,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Password: await bcrypt.hash('12345678', 10),
      ID_Dosen: 28,
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
    await queryInterface.bulkDelete('Data_Dosen_Wali', null, {})
  }
};
