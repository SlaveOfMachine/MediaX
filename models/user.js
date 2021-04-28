'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    admin: DataTypes.INTEGER,
    password: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    },
  });
  return User;
};