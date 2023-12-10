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
    await queryInterface.bulkInsert('Data_Dosen', [{
      Nama_Dosen: 'Ade Chandra Nugraha, S.Si., M.T.',
      NIP: '197312271999031003',
      Kode_Dosen: 'KO001N',
      InitialID: 'AD',
      Email_Dosen: 'chandra@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Ani Rahmani, S.Si., M.T.',
      NIP: '196810141993032002',
      Kode_Dosen: 'KO002N',
      InitialID: 'AN',
      Email_Dosen: 'anirahma@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Bambang Wisnuadhi, S.Si., M.T.',
      NIP: '197201061999031002',
      Kode_Dosen: 'KO003N',
      InitialID: 'BW',
      Email_Dosen: 'bwisnu@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Santi Sundari, S.Si., M.T.',
      NIP: '197109031999032001',
      Kode_Dosen: 'KO009N',
      InitialID: 'SN',
      Email_Dosen: 'santi@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Yudi Widhiyasana, S.Si., M.T.',
      NIP: '197407182001121002',
      Kode_Dosen: 'KO013N',
      InitialID: 'YD',
      Email_Dosen: 'goezthel@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Eddy B. Soewono, Drs., M.Kom.',
      NIP: '196101141992021001',
      Kode_Dosen: 'KO016N',
      InitialID: 'EB',
      Email_Dosen: 'ebang@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Jonner Hutahaean, BSET., M.InfoSys',
      NIP: '196210211993031002',
      Kode_Dosen: 'KO018N',
      InitialID: 'JN',
      Email_Dosen: 'jonnerh@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Setiadi Rachmat, M.Eng',
      NIP: '196904041998031001',
      Kode_Dosen: 'KO021N',
      InitialID: 'ST',
      Email_Dosen: 'setiadi@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Dr. Iwan Awaludin, ST, M.T.',
      NIP: '197604182001121004',
      Kode_Dosen: 'KO023N',
      InitialID: 'IA',
      Email_Dosen: 'awaludin@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Irwan Setiawan, S.Si., M.T.',
      NIP: '198004192005011002',
      Kode_Dosen: 'KO045N',
      InitialID: 'IS',
      Email_Dosen: 'irwan@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Yadhi Adhitia Permana, S.T., M.Kom',
      NIP: '197912242008121001',
      Kode_Dosen: 'KO052N',
      InitialID: 'YD',
      Email_Dosen: 'yadhi@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Ida Suhartini, S.Kom., MMSI',
      NIP: '198012122008122001',
      Kode_Dosen: 'KO056N',
      InitialID: 'ID',
      Email_Dosen: 'ida@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Fitri Diani, S.Si., ST., M.T.',
      NIP: '198009162009122001',
      Kode_Dosen: 'KO057N',
      InitialID: 'FI',
      Email_Dosen: 'fitri@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Ghifari Munawar, S.Kom., M.T. ',
      NIP: '198604122014041001',
      Kode_Dosen: 'KO059N',
      InitialID: 'GI',
      Email_Dosen: 'ghifari.munawar@polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Ade Hodijah, S.Kom., M.T.',
      NIP: '198502102015042001',
      Kode_Dosen: 'KO060N',
      InitialID: 'HA',
      Email_Dosen: 'adehodijah@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Zulkifli Arsyad, S.Kom., M.T.',
      NIP: '198801292015041003',
      Kode_Dosen: 'KO061N',
      InitialID: 'A',
      Email_Dosen: 'zulkifli.arsyad@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Rahil Jumiyani, S.T., M.Sc.',
      NIP: '199003022019032019',
      Kode_Dosen: 'KO062N',
      InitialID: 'RJ',
      Email_Dosen: 'rahil@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Akhmad Bakhrun, S.Kom, M.T.',
      NIP: '198705172019031004',
      Kode_Dosen: 'KO064N',
      InitialID: 'AB',
      Email_Dosen: 'abakhrun@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Aprianti Nanda Sari, S.T., M.Kom.',
      NIP: '199304262019032028',
      Kode_Dosen: 'KO065N',
      InitialID: 'AP',
      Email_Dosen: 'aprianti.nanda@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Ardhian Ekawijana, S.T., M.T.',
      NIP: '198405122019031008',
      Kode_Dosen: 'KO066N',
      InitialID: 'AE',
      Email_Dosen: 'ardhian.ekawijana@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Asri Maspupah, S.S.T., M.T.',
      NIP: '198906102019032019',
      Kode_Dosen: 'KO067N',
      InitialID: 'AM',
      Email_Dosen: 'asri.maspupah@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Hashri Hayati, S.T., M.T.',
      NIP: '199210222019032018',
      Kode_Dosen: 'KO071N',
      InitialID: 'HH',
      Email_Dosen: 'hashri.hayati@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Lukmannul Hakim Firdaus, S.Kom., M.T.',
      NIP: '199301062019031017',
      Kode_Dosen: 'KO072N',
      InitialID: 'LH',
      Email_Dosen: 'lukmanul@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Muhammad Riza Alifi, S.T., M.T.',
      NIP: '199209092019031015',
      Kode_Dosen: 'KO073N',
      InitialID: 'MA',
      Email_Dosen: 'muhammad.riza@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Muhammad Rizqi Sholahuddin, S.Si., M.T.',
      NIP: '199105302019031019',
      Kode_Dosen: 'KO074N',
      InitialID: 'MR',
      Email_Dosen: 'muhammad.rizqi@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Siti Dwi Setiarini, S.Si., M.T.',
      NIP: '199112182019032014',
      Kode_Dosen: 'KO075N',
      InitialID: 'SD',
      Email_Dosen: 'siti.dwi@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Sri Ratna Wulan, S.Pd., M.T.',
      NIP: '198903252019032023',
      Kode_Dosen: 'KO076N',
      InitialID: 'SW',
      Email_Dosen: 'sri.ratna@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Sofy Fitriani, S.S.T., M.Kom',
      NIP: '199106142019032022',
      Kode_Dosen: 'KO077N',
      InitialID: 'SF',
      Email_Dosen: 'sofy.fitriani@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Trisna Gelar Abdillah, S.T., M.Kom.',
      NIP: '198608202019031014',
      Kode_Dosen: 'KO078N',
      InitialID: 'TG',
      Email_Dosen: 'trisna.gelar@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      Nama_Dosen: 'Wendi Wirasta, S.T., M.T.',
      NIP: '198706302019031011',
      Kode_Dosen: 'KO079N',
      InitialID: 'WW',
      Email_Dosen: 'wendi.wirasta@jtk.polban.ac.id',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Data_Dosen', null, {})
  }
};