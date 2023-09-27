'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data_Dosen_Wali extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Data_Dosen_Wali.init({
    Nama_Dosen: DataTypes.STRING,
    Email_Dosen: DataTypes.STRING,
    Password: DataTypes.STRING,
    Adviser_For_Dosen_ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Data_Dosen_Wali',
  });
  return Data_Dosen_Wali;
};