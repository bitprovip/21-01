'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User)
      Booking.belongsTo(models.Parking)
    }
  };
  Booking.init({
    parkingid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    bsx: DataTypes.STRING,
    stt: DataTypes.INTEGER,
    thoigian: DataTypes.INTEGER,
    bookingcode: DataTypes.STRING,
    giagui: DataTypes.INTEGER,
    tongtien: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};