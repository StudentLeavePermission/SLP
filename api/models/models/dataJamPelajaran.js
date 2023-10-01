'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');
const {mainModel} = require('../../common/models');
const Jadwal_Kelas = new mainModel('jadwalKelas');
module.exports = (sequelize, DataTypes) => {
  class Data_Jam_Pelajaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Data_Jam_Pelajaran.init({
    Jam_Ke: DataTypes.INTEGER,
    Waktu_Mulai: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Data_Jam_Pelajaran',
  });
  Data_Jam_Pelajaran.hasMany(Jadwal_Kelas, {
    foreignKey: 'ID_Jam_Pelajaran'
  });
  return Data_Jam_Pelajaran;
};