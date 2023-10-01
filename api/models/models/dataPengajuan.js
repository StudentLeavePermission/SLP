'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data_Pengajuan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Data_Pengajuan.belongsTo(models.Jadwal_Kelas, {
      //   foreignKey: 'ID_Jadwal_Kelas'
      // });
      // Data_Pengajuan.belongsTo(models.Mahasiswa, {
      //   foreignKey: 'ID_Mahasiswa'
      // });
    }
  }
  Data_Pengajuan.init({
    Keterangan: DataTypes.TEXT,
    Tanggal_Pengajuan: DataTypes.DATE,
    Tanggal_Izin: DataTypes.DATE,
    ID_Jadwal_Kelas: DataTypes.INTEGER,
    Jenis_Izin: DataTypes.ENUM('Sakit', 'Izin'),
    Status_Pengajuan: DataTypes.ENUM('Drafted', 'Delivered', 'On Progress', 'Accepted', 'Rejected'),
    ID_Mahasiswa: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Data_Pengajuan',
  });
  return Data_Pengajuan;
};