'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data_Dosen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Data_Dosen.init({
    Nama_Dosen: DataTypes.STRING,
    Email_Dosen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Data_Dosen',
  });
  return Data_Dosen;
};