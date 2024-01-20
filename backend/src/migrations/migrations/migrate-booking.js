'use strict';
module.exports = {
  // parkingid: DataTypes.INTEGER,
  //   userid: DataTypes.INTEGER,
  //   name: DataTypes.STRING,
  //   phone: DataTypes.STRING,
  //   email: DataTypes.STRING,
  //   bsx: DataTypes.STRING,
  //   stt: DataTypes.INTEGER,
  //   thoigian: DataTypes.INTEGER,
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Booking', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parkingid: {
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      bsx: {
        type: Sequelize.STRING
      },
      stt: {
        type: Sequelize.INTEGER
      },
      thoigian: {
        type: Sequelize.INTEGER
      },
      bookingcode: {
        type: Sequelize.STRING
      },
      giagui: {
        type: Sequelize.INTEGER
      },
      tongtien: {
        type: Sequelize.INTEGER
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Booking');
  }
};