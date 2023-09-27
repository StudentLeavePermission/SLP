'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data_Kelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Data_Kelas.hasMany(models.Data_Mahasiswa, {
        foreignKey: 'ID_Kelas'
      });
    }
  }
  Data_Kelas.init({
    Nama_Kelas: DataTypes.STRING,
    ID_Dosen_Wali: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Data_Kelas',
  });
  return Data_Kelas;
};