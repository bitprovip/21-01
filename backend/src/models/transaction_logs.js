'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction_logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // transaction_logs.hasMany(models.User);
      // transaction_logs.hasMany(models.Booking);
    }
  };
  Transaction_logs.init({
    orderId: DataTypes.STRING,
    requestId: DataTypes.STRING,
    responseTime: DataTypes.BIGINT,
    amount: DataTypes.BIGINT,


    transId: DataTypes.STRING,
    message: DataTypes.STRING,
    resultCode: DataTypes.INTEGER,
    lastUpdated: DataTypes.STRING,
    


    // transId: responseData.transId,
    //    message: responseData.message,
    //   resultCode:responseData.resultCode,
    //   lastUpdated: responseData.lastUpdated,
  }, {
    sequelize,
    modelName: 'Transaction_logs',
  });
  return Transaction_logs;
};