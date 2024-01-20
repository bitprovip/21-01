'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    
    static associate(models) {
      Group.belongsToMany(models.Role, {through:'Group_Role'});
    }
  };
  Group.init({
    url: DataTypes.STRING,
    mota: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};