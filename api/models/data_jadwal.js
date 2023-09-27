'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data_Jadwal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Data_Jadwal.init({
    Hari_Jadwal: DataTypes.STRING,
    ID_Matkul: DataTypes.INTEGER,
    ID_Kelas: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Data_Jadwal',
  });
  return Data_Jadwal;
};