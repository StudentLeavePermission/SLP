'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Create a map for a fixed schedule of each day
      const dayScheduleMap = {
        Senin: [1, 2, 3, 4, 5],
        Selasa: [1, 2, 3, 4, 5, 6],
        Rabu: [4, 5, 8, 9],
        Kamis: [1, 2, 3, 4, 8, 9],
        Jumat: [3, 4, 7, 8, 9],
      };

      // Fetch all available courses, professors, and classes
      const courses = await queryInterface.sequelize.query(
        'SELECT id FROM "Data_Mata_Kuliah"'
      );
      const professors = await queryInterface.sequelize.query(
        'SELECT id FROM "Data_Dosen"'
      );
      const classes = await queryInterface.sequelize.query(
        'SELECT id FROM "Data_Kelas"'
      );

      // Generate schedules for each day and each class
      const schedules = [];
      classes[0].forEach((classId) => {
        Object.keys(dayScheduleMap).forEach((day) => {
          dayScheduleMap[day].forEach(async (scheduleIndex) => {
            const randomCourseIndex = Math.floor(
              Math.random() * courses[0].length
            );
            const randomProfessorIndex = Math.floor(
              Math.random() * professors[0].length
            );

            const maxTimeSlot = 10; // Maximum available time slot
            const endSlot =
              scheduleIndex + 1 > maxTimeSlot
                ? maxTimeSlot
                : scheduleIndex + 1;

            const schedule = {
              Hari_Jadwal: day,
              ID_Jam_Pelajaran_Start: scheduleIndex,
              ID_Jam_Pelajaran_End: endSlot,
              ID_Matkul: courses[0][randomCourseIndex].id,
              ID_Dosen: professors[0][randomProfessorIndex].id,
              ID_Kelas: classId.id,
              createdAt: new Date(),
              updatedAt: new Date(),
            };

            // console.log(schedule);
            schedules.push(schedule);
          });
        });
      });

      // Insert generated schedules into the database
      await queryInterface.bulkInsert('Jadwal_Kelas', schedules);
    } catch (error) {
      console.error('Error seeding Jadwal_Kelas:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    // Remove all records from Jadwal_Kelas table
    await queryInterface.bulkDelete('Jadwal_Kelas', null, {});
  },
};
