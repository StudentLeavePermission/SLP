'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data_Mata_Kuliah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Data_Mata_Kuliah.init({
    Nama_Mata_Kuliah: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Data_Mata_Kuliah',
  });
  return Data_Mata_Kuliah;
};