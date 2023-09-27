'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data_Mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Data_Mahasiswa.belongsTo(models.Data_Kelas, {
        foreignKey: 'ID_Kelas',
        onDelete: 'CASCADE'
      });
    }
  }
  Data_Mahasiswa.init({
    NIM: DataTypes.INTEGER,
    Nama: DataTypes.STRING,
    Password: DataTypes.STRING,
    Nomor_Telp: DataTypes.STRING,
    Email: DataTypes.STRING,
    ID_Kelas: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Data_Mahasiswa',
  });
  return Data_Mahasiswa;
};